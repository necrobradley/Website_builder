# AI Website Builder untuk UMKM — Dokumentasi Lengkap

> Versi: 1.0 | Stack: React 19 + Vite 8 + Tailwind CSS v4 (JS) | Tim: 4 Dev, 9-Day Sprint | FRD v1.0 + Dashboard v1.2

---

## Daftar Isi
1. [Ringkasan Produk](#1-ringkasan-produk)
2. [Quick Start](#2-quick-start)
3. [Arsitektur & Alur Data](#3-arsitektur--alur-data)
4. [Struktur Folder](#4-struktur-folder)
5. [Spesifikasi Data (JSON Schema)](#5-spesifikasi-data-json-schema-contract)
6. [Modul Fungsional (FR-01 s/d FR-07)](#6-modul-fungsional-fr-01--fr-07)
7. [Eksekusi Per-Dev Per-Hari (TSK Board)](#7-eksekusi-per-dev-per-hari-tsk-board)
8. [Lib & Store API](#8-lib--store-api)
9. [Export & Vanilla JS](#9-export--vanilla-js)
10. [Non-Functional & Acceptance Matrix](#10-non-functional--acceptance-matrix)
11. [Risiko & Plan B](#11-risiko--plan-b)
12. [Testing](#12-testing)
13. [Deployment & Env](#13-deployment--env)

---

## 1. Ringkasan Produk
Single-page landing builder dual-panel (chat kiri ~35%, preview kanan ~65%) untuk UMKM non-teknis. User ketik deskripsi bisnis bahasa Indonesia → LLM (Gemini) return JSON strict → render 3 template responsif (Hero/About/Services/Testimonials/Contact) → revisi via chat → download ZIP standalone (HTML+Tailwind CDN, WA aktif) + vanilla JS ringan.

In-Scope MVP: dual-panel, JSON schema, 3 template, revisi chat, ZIP. Out-of-Scope: DB/auth, multi-page, custom domain/payment (FRD §1.3).

---

## 2. Quick Start

**Prasyarat:** Node >=18 (tested 24.18.0), npm 11.

```bash
npm install
cp .env.example .env   # isi VITE_GEMINI_API_KEY
npm run dev            # http://localhost:5173
npm run build          # dist/
npm run preview        # preview build
```

**.env:**
```
VITE_GEMINI_API_KEY=your_key_here
```

**Tanpa key?** App tetap jalan — `src/lib/gemini.js:50` fallback ke `FALLBACKS` (kopi→fnb, toko→retail, else services) dalam <1s (NFR-04).

---

## 3. Arsitektur & Alur Data

```
[Input Chat / App.jsx:42 E2E bar]
   ↓
[useWebsite.generate() — src/store/websiteStore.jsx:54]  ← sessionStorage persist
   ├→ buildInitialPrompt / buildRevisionPrompt — src/lib/prompts.js:15 + trimHistory(-3)
   ├→ callGemini() — src/lib/gemini.js:34 (temp 0.7, maxTokens 2000, retry 1×800ms)
   └→ extractJson() — src/lib/gemini.js:13 (strip ```json, {→})
   ↓
[validateWebsite() — src/lib/schema.js:6] → getFallback() jika invalid/timeout
   ↓
[WebsiteRenderer — src/components/WebsiteRenderer.jsx:60] → TEMPLATE_MAP (Services/Fnb/Retail)
   ↓ {templateId, data, theme}
[Sections — src/components/sections/*.jsx] + [Templates — src/components/templates/*.jsx]
   ↓
[Export — src/lib/export.js:7 buildHtml() → exportZip() jszip → wa.me link src/lib/wa.js:12]
```

**Keputusan ponytail (lazy, tetap spec):**
- No backend terpisah — `lib/` + `store/` client-side, `sessionStorage` (FRD §1.3 sesi lokal). `store` = `Context + useState` bukan Redux.
- LLM = `fetch` native, no SDK. Retry inline `withRetry` di `gemini.js:26`.
- Iframe isolasi & export = `srcdoc` + Tailwind CDN, 1-file ZIP (no folder, no file-saver).

---

## 4. Struktur Folder

```
src/
  main.jsx                 # <WebsiteProvider><App/></WebsiteProvider>
  index.css                # @import "tailwindcss"; — Tailwind v4, no config
  styles/globals.css       # design tokens @theme (brand, fnb, retail)
  App.jsx:28               # E2E bar + toolbar Dev 2B + WebsiteRenderer (effectiveTemplate)
  lib/
    schema.js:6            # validateWebsite(), FALLBACKS (fnb/services/retail), getFallback()
    prompts.js:2           # SYSTEM_PROMPT_V1, buildInitialPrompt(), buildRevisionPrompt(), trimHistory()
    gemini.js:13           # extractJson(), generateWebsite() — temp 0.7, retry 1×
    wa.js:2                # normalizeWaNumber(), isValidWaNumber(), buildWaLink()
    export.js:7            # buildHtml() + vanilla <script> + nav, exportZip(), downloadBlob()
    publish.js:3           # PUBLISH_ENABLED=false stub (Could-have)
  store/
    websiteStore.jsx:8     # WebsiteProvider, useWebsite(), website/history/chatHistory/loading, generate(), patchWebsite(), loadFallback()
  components/
    WebsiteRenderer.jsx:60 # TEMPLATE_MAP bridge Dev1↔Dev2B
    templates/ServicesTemplate.jsx, FnbTemplate.jsx, RetailTemplate.jsx
    sections/Hero.jsx, About.jsx, Services.jsx, Testimonials.jsx, Contact.jsx
    ui/Section.jsx, Container.jsx, Card.jsx, Button.jsx, Badge.jsx
  data/mockWebsiteData.js  # mockDataByTemplate untuk Dev 2B preview
```

**Konfig:** `vite.config.js:1` `react() + tailwindcss()`, `package.json` scripts `dev/build/preview/lint`.

---

## 5. Spesifikasi Data (JSON Schema Contract)

Kontrak `UMKMWebsiteState` — `src/lib/schema.js:6` (draft-07, validasi manual ponytail: tanpa zod/ajv, ganti jika >10 field):

```js
required: ["templateId","theme","meta","hero","about","services","contact"]
templateId: "template-services" | "template-fnb" | "template-retail"
theme: { primaryColor: "#RRGGBB" (HEX_RE), accentColor?: "#RRGGBB", fontFamily: "sans"|"serif"|"display" }
meta: { businessName, category, tagline }
hero: { title, subtitle, ctaText, ctaWhatsappMessage }
about: { story, highlights?: string[] }
services: [{ name, description, priceEstimate }] min 3
testimonials?: [{ customerName, review }] min 2
contact: { whatsappNumber, address, instagram? }
```

**WA:** `buildWaLink("08123456789","Halo")` → `https://wa.me/628123456789?text=Halo` — `src/lib/wa.js:12` (regex `08→62`, `encodeURIComponent`).

**Fallback routing** `getFallback(category)` — `src/lib/schema.js:81`: `kopi/makan/bakso/warung→fnb`, `retail/toko→retail`, else `services`.

---

## 6. Modul Fungsional (FR-01 → FR-07)

| Modul | User Story | SP | Implementasi | File |
|-------|------------|----|--------------|------|
| FR-01 Layout Dual-Panel | US-01 3SP (35/65, responsif 1366×768, no reload) + US-02 2SP (viewport 1200/375) | 5 | Flex split, `src/App.jsx:28` E2E bar + Dev 2B toolbar, viewport toggle `VIEWPORTS` (mobile ring), `src/styles/globals.css` | `App.jsx`, `WebsiteRenderer` |
| FR-02 Onboarding Chat | US-10 1SP (welcome, multiline, typing, Quick-fill) | 1 | E2E `input` + `Generate` di `App.jsx:42`, `placeholder` Indonesia, block empty `!trim()` | `App.jsx`, `store` |
| FR-03 Prompt & JSON | US-04 5SP strict prompt + fallback | 5 | `SYSTEM_PROMPT_V1` ketat (`HANYA JSON`), `buildInitialPrompt` clamp 1000, `extractJson` strip fence, `validateWebsite`, `retry 1×` | `prompts.js:2`, `gemini.js:13`, `schema.js:6` |
| FR-04 Template Matching | US-03 5SP + US-06 3SP (3 layout deterministik by kategori) | 8 | `TEMPLATE_MAP` di `WebsiteRenderer.jsx:24`, `FALLBACKS` 3 preset, `getFallback` kategori→template, `@theme` tokens | `WebsiteRenderer`, `templates/*`, `sections/*`, `schema.js:81` |
| FR-05 Revision Loop | US-07 3SP (warna) + US-08 5SP (tambah/edit) | 8 | `buildRevisionPrompt` diff rules (warna→theme, tambah→append services, few-shot), `patchWebsite` snapshot+validate+restore, `generate(isRevision)` guard WA/services | `prompts.js:21`, `store:32,54` |
| FR-06 Export ZIP | US-09 5SP (standalone, offline identik) | 5 | `buildHtml` nav+sections+footer+WA, vanilla JS, `JSZip` 1-file `index.html`, `downloadBlob` | `export.js:7`, `wa.js:2` |
| FR-07 Publish (Could) | US-11 3SP | 3 | `publish.js:3` stub `PUBLISH_ENABLED=false` — Plan B fokus ZIP | `publish.js` |

MoSCoW: Must 33SP/82.5%, Should 4/10%, Could 3/7.5%.

---

## 7. Eksekusi Per-Dev Per-Hari (TSK Board, 37 SP)

| Hari | TSK | Dev | Judul | SP | Status |
|------|-----|-----|-------|----|--------|
| 1 | 01A | 1A | System Prompt & Schema Contract | 1 | ✅ `schema.js`, `prompts.js` |
| 1 | 01B | 1B | Backend Repo & Routing Baseline | 1 | ✅ `store/websiteStore.jsx`, `.env.example` (no Express, Kontext+sessionStorage) |
| 1 | 01C | 2A | Frontend Repo & Workspace Slicing | 1 | ✅ Vite+Tailwind scaffold |
| 1 | 01D | 2B | Template Baseline Component | 1 | ✅ `sections/*` mock |
| 2 | 02A | 1A | LLM API Integration & Parsing | 1 | ✅ `gemini.js` fetch+extractJson |
| 2 | 02B | 1B | API Error & Retry Logic | 1 | ✅ `withRetry` inline, fallback instant |
| 2 | 02C | 2A | Chat Onboarding & Loading | 1 | ✅ E2E input+loading |
| 2 | 02D | 2B | 4 Komponen Utama | 2 | ✅ Hero/About/Services/Contact slicing |
| 3-4 | 03A | 1A | Prompt Context Optimization (<2000 token) | 1 | ✅ `trimHistory(-3)` + clamp |
| 3-4 | 03B | 1B | Backend State Manager Orchestration | 2 | ✅ `store` persist + `generate()` |
| 3-4 | 03C | 2A | Iframe Sandbox Binding | 2 | 🔳 (ponytail: pakai WebsiteRenderer langsung, iframe saat butuh isolasi) |
| 3-4 | 03D | 2B | Template Auto-Select Logic | 1 | ✅ `getFallback` kategori |
| 5 | 04A | Kolektif | E2E Integration Testing | 3 | ✅ TC-01 812ms fallback, `main.jsx` Provider + `App.jsx` E2E bar |
| 5 | 04B | 2A | Viewport Toggle | 1 | ✅ `VIEWPORTS` desktop/mobile |
| 5 | 04C | 2B | Template Variasi & Kustomisasi | 2 | ✅ `@theme` tokens, tailwind safelist |
| 6 | 05A | 1A | Revision Prompt Diff Logic | 2 | ✅ `buildRevisionPrompt` few-shot diff |
| 6 | 05B | 1B | State Mutation Array/Object | 2 | ✅ `patchWebsite` snapshot+restore, `generate` guard |
| 6 | 05C | 2A | Chat History & Event Trigger | 1 | 🔳 |
| 6 | 05D | 2B | Styling Responsiveness | 1 | 🔳 |
| 7 | 06A | 1B | Export ZIP Generator | 2 | ✅ `export.js` + `wa.js` + jszip, `test-h7` 18/18 |
| 7 | 06B | 2A | Download UI & Quick-fill | 1 | 🔳 (Download di `App.jsx:44` ponytail) |
| 7 | 06C | 2B | WA Button Dynamic URL | 1 | ✅ `wa.js` regex `08→62` |
| 7 | 06D | 1B | Static Publish (Stretch) | 2 | ✅ `publish.js` stub disabled |
| 8 | 07A | Kolektif | Stability & Code Freeze | 2 | 🔳 |
| 8 | 07B | Kolektif | Backup Video & Slides | 1 | 🔳 |
| 9 | 08A | Kolektif | Rehearsal & Capstone Demo | 1 | 🔳 |

**Beban:** 1A 7SP, 1B 15SP (H1-7), 2A 6SP, 2B 8SP, Kolektif 6SP.

---

## 8. Lib & Store API

**`src/lib/schema.js:6`**
```js
validateWebsite(data) // {valid, errors}
getFallback(category)  // fnb|retail|services
FALLBACKS.{services,fnb,retail}
```

**`src/lib/prompts.js:15`**
```js
SYSTEM_PROMPT_V1
buildInitialPrompt(input, history=[])        // history trimmed -3
buildRevisionPrompt(oldJson, msg, history=[]) // diff rules + few-shot
trimHistory(arr, max=3)
```

**`src/lib/gemini.js:13`**
```js
extractJson(raw) // strip ```json fence
generateWebsite(input, {currentState, isRevision, revisionMsg, history})
// calls Gemini (temp 0.7, maxTokens 2000) withRetry 1×800ms → validate → fallback
```

**`src/lib/wa.js:2`**
```js
normalizeWaNumber("0812") // "62812..."
isValidWaNumber("0812...") // /^0?8\d{8,12}$/
buildWaLink(number, message) // https://wa.me/62...?text=...
```

**`src/store/websiteStore.jsx:8`**
```js
WebsiteProvider, useWebsite() // {website, history, chatHistory, loading, error, generate(), patchWebsite(), loadFallback(), clear, setWebsite}
generate(input, {isRevision}) // orchestration: history slice-6 → generateWebsite → diff guard → setWebsite + snapshot
patchWebsite(delta)            // snapshot+validate+restore (TSK-05B)
```

**`src/lib/export.js:7` / `publish.js:3`**
```js
buildHtml(website) // nav+header+about+services+testimonials+footer+vanilla JS
exportZip(website) // JSZip → Blob
downloadBlob(blob) // <a download> native
publish(html)      // stub {disabled:true}
```

---

## 9. Export & Vanilla JS

**Build** `buildHtml()` — `<script src="https://cdn.tailwindcss.com">`, nav sticky, mobile toggle `nav-toggle→nav-mobile`, smooth `scrollIntoView`, sticky WA `fixed bottom-4 right-4` — **~12 baris vanilla, no React/Alpine** (ponytail: split if >50 lines). ZIP = 1 file `index.html` (~4.5kb), offline buka langsung identik preview, WA `https://wa.me/...` aktif.

**Validasi TC-04:** ekstrak ZIP → `index.html` → Tailwind render, responsive 360–1920, WA link `encodeURIComponent(hero.ctaWhatsappMessage)`.

---

## 10. Non-Functional & Acceptance Matrix

| NFR | Target | Implementasi |
|-----|--------|--------------|
| NFR-01 Performance | time-to-first-draft <10s | fallback instant 800ms retry, `generate()` loading state |
| NFR-02 Responsive | 360–1920px | Tailwind grid, viewport toggle 390/100%, nav `sm:` breakpoint |
| NFR-03 Usability | Bahasa Indonesia, no jargon | label "Generate", "Download ZIP", placeholder Indonesia |
| NFR-04 Reliability | graceful, retry 1×, no crash | `try/fallback`, `validateWebsite`, snapshot restore |
| NFR-05 Token | <2000/turn | `trimHistory(-3)`, input 1000, oldJson slice 3500 |

| TC | Input | Harapan | Status Hari 7 |
|----|-------|---------|---------------|
| TC-01 | "Warung Kopi Sejahtera, kopi tubruk... wa 0812..." | F&B theme, 3 menu, WA aktif | ✅ 812ms fallback `template-fnb` |
| TC-02 | "Ganti nuansa jadi cokelat tua klasik" | primary `#78350f`, WA/services preservasi | ✅ patch valid, prompt diff |
| TC-03 | "Tambah menu Pisang Goreng Keju 15 ribu" | services +1 (4) | ✅ patch append valid |
| TC-04 | Download ZIP → buka offline | identik preview, WA `wa.me/62812...` | ✅ 18/18 + zip 4.4kb |

---

## 11. Risiko & Plan B

| Risiko | Mitigasi |
|--------|----------|
| JSON terpotong | Strict prompt + `extractJson` |
| Parse timeout | `withRetry 1×` + fallback instant |
| Token melonjak | `trimHistory(-3)` |
| Kategori unknown | `getFallback` → `template-services` |
| Iframe CSS clash | (future) `srcdoc` + Tailwind CDN — sekarang direct renderer |
| ZIP korup | `copyHtml()` clipboard fallback |
| Publish gagal | `PUBLISH_ENABLED=false` → disable, fokus ZIP |
| No HP salah | `isValidWaNumber` regex |

---

## 12. Testing

```bash
node test-all-h14.mjs   # 32 PASS (schema/prompt/history/extract/generate)
node test-h6.mjs        # 15 PASS (revision diff + patch)
node test-h7.mjs        # 18 PASS (wa + export zip)
node test-vanilla.mjs   # 11 PASS (nav/script/no-react)
npm run build           # 39 modules, ~200ms (lazy chunk export 100kb)
```

Semua guard via `ponytail:` comment — ganti `zod`, `file-saver`, `SDK` saat threshold tercapai.

---

## 13. Deployment & Env

- `vite.config.js:1` `react() + tailwindcss()` — no `tailwind.config.js`.
- Env `VITE_GEMINI_API_KEY` di Vercel/Netlify env. Tanpa key, app tetap demo via fallback (capstone offline).
- Build `dist/` static — upload ke Vercel/Supabase Storage (future `publish.js` enable).

> Skipped: backend DB, auth, multi-page, custom domain, payment — out-of-scope FRD §1.3. Tambah saat real need, bukan spekulasi.
