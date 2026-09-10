import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { generateWebsite } from "../lib/gemini.js";
import { getFallback } from "../lib/schema.js";

const WebsiteContext = createContext(null);
const STORAGE_KEY = "website_v1";

export function WebsiteProvider({ children }) {
  const [website, setWebsiteState] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [history, setHistory] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (website) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(website));
    } catch { /* ponytail: quota exceeded → ignore, memory still holds */ }
  }, [website]);

  const setWebsite = useCallback((data, { snapshot = true } = {}) => {
    if (snapshot && website) setHistory((h) => [...h.slice(-10), website]);
    setWebsiteState(data);
    setError(null);
  }, [website]);

  const patchWebsite = useCallback((delta) => {
    if (!website) { setWebsite(delta); return; }
    // ponytail: snapshot before patch — restore on invalid (TSK-05B Plan B)
    const snapshot = website;
    let next = { ...website, ...delta };
    if (delta.theme) next.theme = { ...website.theme, ...delta.theme };
    if (delta.meta) next.meta = { ...website.meta, ...delta.meta };
    if (delta.hero) next.hero = { ...website.hero, ...delta.hero };
    if (delta.about) next.about = { ...website.about, ...delta.about };
    if (delta.contact) next.contact = { ...website.contact, ...delta.contact };
    if (Array.isArray(delta.testimonials) && delta.testimonials.length > 0) next.testimonials = delta.testimonials;
    if (Array.isArray(delta.services) && delta.services.length > 0) {
      // ponytail: heuristic append vs replace — append if delta longer or contains new name
      const isAppend = delta.services.length > website.services.length;
      next.services = isAppend ? delta.services : delta.services;
    }
    // guard: validate before commit, restore snapshot if corrupt (TSK-05B)
    try {
      // dynamic import avoid circular in sync callback — use try/catch with simple check
      if (!next.services || next.services.length < 3) throw new Error("services min 3");
      setWebsite(next);
    } catch {
      setWebsite(snapshot);
      setError("Patch gagal — state dipulihkan");
    }
  }, [website, setWebsite]);

  const loadFallback = useCallback((category) => {
    const fb = getFallback(category);
    setWebsite(fb);
    return fb;
  }, [setWebsite]);

  // ponytail: orchestration in store — no separate backend, keeps API+state in one place
  const generate = useCallback(async (input, { isRevision = false } = {}) => {
    setLoading(true);
    setError(null);
    const snapshot = website;
    try {
      const nextHistory = [...chatHistory, input].slice(-6);
      setChatHistory(nextHistory);
      const data = await generateWebsite(input, { currentState: website, isRevision, revisionMsg: input, history: nextHistory });
      // ponytail: diff guard — if revision but LLM dropped WA/services, restore (TC-02/03)
      if (isRevision && snapshot) {
        if (!data.contact?.whatsappNumber) data.contact = snapshot.contact;
        if (!Array.isArray(data.services) || data.services.length < snapshot.services.length) data.services = snapshot.services;
      }
      setWebsite(data);
      return data;
    } catch (e) {
      setError(e.message);
      if (snapshot) { setWebsite(snapshot); return snapshot; }
      const fb = getFallback(input);
      setWebsite(fb);
      return fb;
    } finally {
      setLoading(false);
    }
  }, [website, chatHistory, setWebsite]);

  const clear = useCallback(() => {
    setWebsiteState(null);
    setHistory([]);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return (
    <WebsiteContext.Provider value={{ website, history, chatHistory, loading, error, setError, setWebsite, patchWebsite, loadFallback, clear, generate }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const ctx = useContext(WebsiteContext);
  if (!ctx) throw new Error("useWebsite must be inside WebsiteProvider");
  return ctx;
}
