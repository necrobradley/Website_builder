import { createContext, useCallback, useContext, useEffect, useState } from "react";
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
    // ponytail: shallow merge + array append heuristic — replace with deep-merge lib if nesting grows
    const next = { ...website, ...delta };
    if (delta.theme) next.theme = { ...website.theme, ...delta.theme };
    if (delta.meta) next.meta = { ...website.meta, ...delta.meta };
    if (delta.hero) next.hero = { ...website.hero, ...delta.hero };
    if (delta.about) next.about = { ...website.about, ...delta.about };
    if (delta.contact) next.contact = { ...website.contact, ...delta.contact };
    if (Array.isArray(delta.services) && delta.services.length > 0) {
      next.services = delta.services.length > website.services.length ? delta.services : delta.services;
    }
    setWebsite(next);
  }, [website, setWebsite]);

  const loadFallback = useCallback((category) => {
    const fb = getFallback(category);
    setWebsite(fb);
    return fb;
  }, [setWebsite]);

  const clear = useCallback(() => {
    setWebsiteState(null);
    setHistory([]);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return (
    <WebsiteContext.Provider value={{ website, history, error, setError, setWebsite, patchWebsite, loadFallback, clear }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const ctx = useContext(WebsiteContext);
  if (!ctx) throw new Error("useWebsite must be inside WebsiteProvider");
  return ctx;
}
