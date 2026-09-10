# AI Website Builder untuk UMKM

React 19 + Vite 8 + Tailwind CSS v4 (JS) — 4 Dev, 9-Day Sprint (FRD v1.0 + Dashboard v1.2). Dual-panel chat→LLM→JSON→3 template→revisi→ZIP.

## Quick Start

```bash
npm install
cp .env.example .env   # VITE_GEMINI_API_KEY
npm run dev            # http://localhost:5173
```

- **Tanpa API key tetap jalan** — fallback `kopi→fnb, toko→retail` instant (<1s).
- `npm run build` → `dist/` static, `npm run preview`, `npm run lint` (oxlint).

## Dokumentasi

**Lengkap:** [`docs/DOCUMENTATION.md`](docs/DOCUMENTATION.md) — arsitektur, FR-01→FR-07, TSK board 37SP, JSON Schema, Lib/Store API, NFR/TC-01→TC-04, risiko & testing.

**Ringkas TSK:** [`docs/EXECUTION_PLAN.md`](docs/EXECUTION_PLAN.md)

## Stack & Ponytail

- Vite 8 + `@vitejs/plugin-react`, Tailwind v4 `@tailwindcss/vite` — no `tailwind.config.js` (`src/index.css:1`, `vite.config.js:1`)
- `fetch` native (no SDK), `Context+sessionStorage` (no Redux), `jszip` satu-satunya dep baru (ZIP)
- Export vanilla JS 12 baris (nav toggle + smooth + WA sticky), no React di ZIP — `src/lib/export.js:7`
