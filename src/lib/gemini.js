// ponytail: fetch native — no @google/generative-ai SDK, add SDK only if streaming/proxy needed
import { buildInitialPrompt, buildRevisionPrompt } from "./prompts.js";
import { getFallback, validateWebsite } from "./schema.js";

const MODEL = "gemini-1.5-flash";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

function getApiKey() {
  try { return import.meta.env.VITE_GEMINI_API_KEY || ""; } catch { return ""; }
}

// ponytail: extracted for unit test — handles ```json wrapper & leading/trailing noise
export function extractJson(raw) {
  if (!raw) return raw;
  let s = raw.trim();
  // strip ```json ... ``` or ``` ... ```
  const m = s.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (m) s = m[1].trim();
  // find first { to last }
  const a = s.indexOf("{");
  const b = s.lastIndexOf("}");
  if (a !== -1 && b !== -1 && b > a) s = s.slice(a, b + 1);
  return s;
}

async function withRetry(fn, retries = 1, delay = 800) {
  let last;
  for (let i = 0; i <= retries; i++) {
    try { return await fn(); } catch (e) { last = e; if (i < retries) await new Promise((r) => setTimeout(r, delay)); }
  }
  throw last;
}

async function callGemini(prompt) {
  const key = getApiKey();
  if (!key) throw new Error("NO_API_KEY");
  const url = `${API_BASE}/models/${MODEL}:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 2000 } }),
  });
  if (!res.ok) throw new Error(`GEMINI_${res.status}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("EMPTY_RESPONSE");
  return text;
}

export async function generateWebsite(userInput, opts = {}) {
  const { currentState = null, isRevision = false, revisionMsg = "" } = opts;
  const prompt = isRevision ? buildRevisionPrompt(currentState, revisionMsg || userInput) : buildInitialPrompt(userInput);
  const category = currentState?.meta?.category || userInput;

  try {
    const raw = await withRetry(() => callGemini(prompt), 1, 800);
    const jsonStr = extractJson(raw);
    const parsed = JSON.parse(jsonStr);
    const { valid } = validateWebsite(parsed);
    if (!valid) throw new Error("INVALID_SCHEMA");
    return parsed;
  } catch {
    // ponytail: graceful fallback — no crash (NFR-04), instant static data (TSK-02B Plan B)
    return getFallback(category);
  }
}
