---
name: umkm-website-builder
description: Comprehensive project guide, FRD, backlog, sprint board, and technical execution plan for the AI Website Builder for UMKM (4-Developer 9-Day Sprint). Use when planning, implementing, or tracking tasks across Dev 1A, Dev 1B, Dev 2A, and Dev 2B.
---

# AI Website Builder untuk UMKM — Project Skill & Execution Guide

Dokumen panduan komprehensif proyek **AI Website Builder untuk UMKM** berbasis **Agile Scrum 9-Day Sprint** dengan alokasi **4 Developers**.

---

## 1. Project Summary & Dashboard

* **Versi Dokumen:** 1.2 (Baseline Draft & Backlog-Task Reference Mapping)
* **Total Story Points:** 40 SP
* **Durasi Sprint:** 9 Hari Kerja (Sprint Capstone)
* **Framework:** Scrum / Agile 2-Week Sprint (2 Fase Milestone)

### 1.1 MoSCoW Priority Breakdown

| Priority | Count | Total SP | % of Total SP |
|---|---|---|---|
| **Must-Have** | 8 | 33 | 82.5% |
| **Should-Have** | 2 | 4 | 10.0% |
| **Could-Have** | 1 | 3 | 7.5% |
| **Won't-Have** | 0 | 0 | 0.0% |
| **Total** | **11** | **40** | **100.0%** |

### 1.2 Developer Workload Allocation

| Assignee | User Stories Count | Total SP Assigned | Fokus Kerja Utama & Peran Scrum |
|---|---|---|---|
| **Dev 1A** (AI & Scrum Master) | 4 | 18 | AI Engine, Prompt Design, LLM Integration, Scrum Master |
| **Dev 1B** (Backend & DevOps) | 5 | 21 | Backend Logic, State Mutation, ZIP Export, API Routing |
| **Dev 2A** (Frontend Core & PO Proxy) | 4 | 11 | Workspace Layout, Iframe Rendering, Chat UI, PO Proxy |
| **Dev 2B** (UI Component & Styling) | 3 | 13 | Slicing Template, Tailwind CSS, WA Button, Visual Themes |
| **Kolektif / Shared** | - | - | E2E Integration, Comprehensive Testing, Code Freeze |

---

## 2. Product Backlog (User Stories)

| Story ID | Epic / Module | User Story Title | User Story Description (Sebagai... Saya ingin... Agar...) | Priority | SP | Assignee | Acceptance Criteria (Kriteria Penerimaan) |
|---|---|---|---|---|---|---|---|
| **US-01** | Workspace | Workspace Dual-Panel Layout | Sebagai user, saya ingin antarmuka dual-panel (chat di kiri, preview di kanan) agar proses input dan hasil terlihat bersamaan. | Must-Have | 3 | Dev 2A | Dual-panel split view (kiri chat ~35%, kanan preview iframe ~65%). Transisi lancar tanpa refresh. |
| **US-02** | Workspace | Toggle Viewport Mode | Sebagai user, saya ingin mengganti mode viewport (desktop & mobile) agar bisa mengecek tampilan responsif website. | Must-Have | 2 | Dev 2A | Toggle untuk mode Desktop dan Mobile. Tampilan responsif pada resolusi layar minimal. |
| **US-03** | Template | Modular Responsive Templates | Sebagai user, saya ingin template modular (Hero, About, Services, Testimoni, Kontak) yang siap diisi data bisnis. | Must-Have | 5 | Dev 2B | Slicing komponen visual Tailwind CSS untuk section: Hero, Tentang Kami (About), Produk/Layanan (Services), Testimoni, Kontak. |
| **US-04** | AI Engine | Strict JSON Schema Prompting | Sebagai sistem, saya ingin prompt engine yang memaksa output LLM selalu berupa JSON valid sesuai skema yang ditentukan. | Must-Have | 5 | Dev 1A | Sistem prompt strict memaksa output JSON valid sesuai skema data (`theme`, `meta`, `hero`, `about`, `services`, `testimonials`, `contact`). |
| **US-05** | Core Flow | End-to-End First Draft Generation | Sebagai user, saya ingin mengetikkan deskripsi bisnis dan melihat draft pertama website ter-render otomatis di preview panel. | Must-Have | 5 | Dev 1A, Dev 1B, Dev 2A | Alur awal E2E dari input text deskripsi bisnis lokal sampai preview render website statis pertama < 10 detik. Dev 1A (LLM), Dev 1B (API Routing), Dev 2A (Iframe binding). |
| **US-06** | Template Var | Auto Template Selection by Category | Sebagai user, saya ingin sistem memilihkan 1 dari 3 tema layout secara otomatis sesuai kategori bisnis saya (Jasa, F&B, Retail). | Should-Have | 3 | Dev 2B | Memilih otomatis 1 dari 3 preset layout berdasarkan kategori bisnis: Template A (Services), B (F&B), C (Retail). |
| **US-07** | Revision | Chat-based Color & Theme Revision | Sebagai user, saya ingin meminta perubahan warna tema via chat tanpa menghapus isi teks website saya. | Must-Have | 3 | Dev 1A, Dev 1B | Revisi warna/tema via chat reaktif dan instan tanpa merusak konten atau nomor kontak WhatsApp. Dev 1A (Prompt context), Dev 1B (Backend state update). |
| **US-08** | Revision | Chat-based Content Addition & Edits | Sebagai user, saya ingin mengedit/menambah konten section via chat (contoh: tambah menu/layanan). | Must-Have | 5 | Dev 1A, Dev 1B | Mengedit teks headline, deskripsi, atau menambah menu produk baru secara dinamis melalui chat revisi. Dev 1A (Prompt update), Dev 1B (JSON Array manipulation). |
| **US-09** | Export | Download Standalone Zip (HTML/CSS) | Sebagai user, saya ingin mendownload website final dalam bentuk file .zip (HTML/CSS standalone) dengan tombol WA aktif. | Must-Have | 5 | Dev 1B, Dev 2B | Unduh bundle ZIP berisi HTML, CSS (Tailwind CDN/Inline), fungsionalitas link WA generator aktif, bersih dari kode editor. Dev 1B (ZIP Generator), Dev 2B (WA Button UI). |
| **US-10** | UX Polish | Quick-fill Example Prompts | Sebagai user/evaluator, saya ingin tombol contoh prompt siap klik (quick-fill) untuk mempercepat demo pengujian. | Should-Have | 1 | Dev 2A | Tombol Quick-fill/Contoh Prompt instan (contoh: Bakso, Barbershop, Cuci Sepatu) untuk kemudahan demo evaluator. |
| **US-11** | Publishing | Static URL Publish (Public Link) | Sebagai user, saya ingin link live preview publik yang bisa dibagikan langsung ke pelanggan. | Could-Have | 3 | Dev 1B | Direct static publish satu klik ke penyedia storage statis (Vercel, Supabase, Firebase) menghasilkan public URL aktif. |

---

## 3. Sprint 9-Day Technical Task Board

| Task ID | Hari | Story ID | Task Title | Detail Implementasi Teknis | SP | Assignee | Plan B / Kontinjensi |
|---|---|---|---|---|---|---|---|
| **TSK-01A** | Hari 1 | US-04 | Sistem Prompt & JSON Schema Contract Setup | Merancang instruksi system prompt ketat & pendefinisian schema kontrak JSON v1.0. | 1 | Dev 1A | Output JSON terpotong -> Aktifkan Strict JSON Schema Mode / Function Calling. |
| **TSK-01B** | Hari 1 | US-05 | Backend Repo & Routing API Baseline | Inisialisasi repo backend, setup env variables, dan setup endpoints routing API dasar. | 1 | Dev 1B | N/A - Standard Implementation |
| **TSK-01C** | Hari 1 | US-01 | Frontend Repo & Workspace Slicing | Inisialisasi proyek React/Tailwind, setup layout workspace dual-panel. | 1 | Dev 2A | N/A - Standard Implementation |
| **TSK-01D** | Hari 1 | US-03 | Template Slicing Baseline Component | Slicing mockup HTML statis dasar untuk komponen modular (Hero, About, dll). | 1 | Dev 2B | N/A - Standard CSS Slicing |
| **TSK-02A** | Hari 2 | US-05 | LLM API Integration & Parsing Engine | Integrasi API Gemini/OpenAI, memproses format parsing JSON secara ketat. | 1 | Dev 1A | Parsing gagal -> Implementasikan fallback static JSON data template. |
| **TSK-02B** | Hari 2 | US-05 | API Error Handling & Retry Logic | Membangun API controller backend yang kokoh, auto-retry 1x jika LLM gagal merespons. | 1 | Dev 1B | API timeout -> Use default built-in static data fallback instantly. |
| **TSK-02C** | Hari 2 | US-01 | Chat Onboarding UI & Loading State | Slicing antarmuka chat lengkap dengan typing/generating indicator. | 1 | Dev 2A | N/A - Standard Implementation |
| **TSK-02D** | Hari 2 | US-03 | Slicing 4 Komponen Template Utama | Slicing Hero, Tentang Kami, Produk, Kontak ke dalam visual Tailwind CSS. | 2 | Dev 2B | Style bentrok -> Pisahkan CSS template dengan editor utama. |
| **TSK-03A** | Hari 3-4 | US-05 | Prompt Context Optimization | Optimasi parameter temperatur & kontrol batas token (< 2.000 token per turn). | 1 | Dev 1A | Token melonjak -> Potong riwayat chat jika sudah melebihi 3 turns. |
| **TSK-03B** | Hari 3-4 | US-05 | Backend State Manager Orchestration | Menyalurkan respons JSON LLM ke backend state manager untuk persistent session. | 2 | Dev 1B | N/A - Standard State Management |
| **TSK-03C** | Hari 3-4 | US-01 | Iframe Sandbox Live Preview Binding | Mengamankan render preview di dalam sandbox iframe, binding props data JSON reaktif. | 2 | Dev 2A | Iframe bentrok CSS -> Gunakan dynamic srcdoc/Blob URL dengan Tailwind CDN. |
| **TSK-03D** | Hari 3-4 | US-06 | Logika Seleksi Template Deterministik | Sistem memilih otomatis 1 dari 3 preset template sesuai kategori bisnis. | 1 | Dev 2B | Kategori tidak sesuai -> Default ke Template A (Modern Clean). |
| **TSK-04A** | Hari 5 | US-05 | Core Flow End-to-End Integration Testing | Integrasi menyeluruh: Input chat -> Backend -> LLM -> Parsing JSON -> Render Iframe (TC-01). | 3 | Kolektif | Uji integrasi gagal -> Buat mockup static API local untuk melanjutkan testing frontend. |
| **TSK-04B** | Hari 5 | US-02 | Viewport Toggle Switcher Integration | Fungsionalitas tombol switcher Desktop & Mobile preview tanpa refresh workspace. | 1 | Dev 2A | Layout terpotong -> Pasang scaling transform CSS pada iframe mobile view. |
| **TSK-04C** | Hari 5 | US-03 | Slicing Template (Variasi & Kustomisasi) | Menyiapkan variasi visual warna, tipografi, dan kustomisasi konten untuk 3 preset kategori bisnis. | 2 | Dev 2B | Style pecah -> Gunakan Tailwind inline dynamic classes dengan safely-whitelisted classes. |
| **TSK-05A** | Hari 6 | US-07 | Revision Engine Prompt Diff Logic | Sistem prompt untuk revisi bagian spesifik berdasarkan context website lama. | 2 | Dev 1A | Revisi terlalu luas -> Batasi instruksi sistem hanya pada warna/teks terlebih dahulu. |
| **TSK-05B** | Hari 6 | US-08 | State Mutation Array & Object Handling | Logika backend untuk mutasi parsial data state JSON (diff-and-patch logic). | 2 | Dev 1B | JSON korup -> Simpan snapshot state lama sebelum menerapkan patch. |
| **TSK-05C** | Hari 6 | US-07 | UI Riwayat Chat & Reactive Event Trigger | Membangun UI chat history bubble dan event listener reaktif ke iframe. | 1 | Dev 2A | Iframe telat update -> Implement postMessage API untuk komunikasi instan. |
| **TSK-05D** | Hari 6 | US-07 | Styling Template Responsiveness for Revision | Menjamin ketepatan gaya visual Tailwind CSS saat warna/tema diubah via chat. | 1 | Dev 2B | Style pecah -> Gunakan Tailwind inline dynamic classes dengan safely-whitelisted classes. |
| **TSK-06A** | Hari 7 | US-09 | Export Standalone ZIP Generator | Membuat backend logic untuk zip bundler HTML/CSS/JS standalone, formatting link WA. Lolos TC-04. | 2 | Dev 1B | ZIP korup -> Sediakan tombol fallback 'Salin Kode HTML' langsung ke clipboard. |
| **TSK-06B** | Hari 7 | US-10 | Download UI, Toast Notification, & Prompt Quick-Fill | UI tombol Download ZIP, notifikasi sukses/gagal, dan preset prompt siap klik. | 1 | Dev 2A | N/A - Standard UI implementation |
| **TSK-06C** | Hari 7 | US-09 | WA Button Dynamic URL Generator | Menghubungkan link WhatsApp dinamis format wa.me dengan pesan custom dari JSON. | 1 | Dev 2B | No HP salah -> Validasi nomor WA di sisi client menggunakan regex. |
| **TSK-06D** | Hari 7 | US-11 | Static URL Publishing Direct Deploy | Direct static publish satu klik ke Supabase/Vercel CLI API (Stretch Goal). | 2 | Dev 1B | Publish gagal -> Nonaktifkan tombol publish, fokus pada unduhan ZIP. |
| **TSK-07A** | Hari 8 | Shared | Comprehensive Stability Testing & Code Freeze | Stress-testing input, mobile responsiveness testing, dan pembekuan repo (code freeze). | 2 | Kolektif | Bug kritis ditemukan -> Hotfix langsung pada branch rilis dan batasi fitur bermasalah. |
| **TSK-07B** | Hari 8 | Shared | Backup Demo Video & Slide Defense Setup | Merekam video demo 1x alur sukses penuh untuk cadangan, persiapan presentasi. | 1 | Kolektif | Demo gagal hari-H -> Jalankan video backup lokal sebagai ganti live-demo. |
| **TSK-08A** | Hari 9 | Shared | Final Staging Rehearsal & Capstone Presentation | Simulasi tanya jawab sidang, sanity check staging, dan demo produk di hadapan penguji. | 1 | Kolektif | Koneksi internet bermasalah -> Jalankan demo lokal offline secara penuh. |

---

## 4. Functional Requirements (FRD Summary)

### 4.1 System Architecture Data Flow
```text
[User Input (Chat)] 
        │
        ▼
[Chat Orchestrator & Prompt Engine (Backend / API Route)]
        │
        ├─► [LLM API (Gemini / OpenAI)] ──► [Structured JSON Response]
        │                                         │
        ▼                                         ▼
[State Management (Client / React Store)] ◄───────┘
        │
        ├─► [Template Rendering Engine] ──► [Live Preview Panel (Iframe)]
        │
        ▼
[Export Engine] ──► [Download ZIP / Static HTML File]
```

### 4.2 Functional Requirements Matrix
* **FR-01 (Dual-Panel Workspace):** Split-view (Chat ~35-40%, Preview ~60-65%), Toggle viewport Desktop/Mobile, transisi halus tanpa reload.
* **FR-02 (Conversational Onboarding):** Pesan pembuka otomatis, validasi no empty input, tombol Quick Fill / Contoh Prompt (Bakso, Barbershop, dll).
* **FR-03 (AI Generation Engine):** Prompt strict structured JSON schema, penanganan graceful degradation (retry 1x & fallback static data).
* **FR-04 (Template Matching & Rendering):** 3 preset layout deterministik (Template A: Services, Template B: F&B, Template C: Retail). Render < 5 detik.
* **FR-05 (Chat-Based Revision Loop):** LLM diff-and-patch logic. Memperbarui warna, teks, atau item daftar tanpa me-reset section lainnya.
* **FR-06 (Standalone Export):** Bundle ZIP / single HTML mandiri, Tailwind CDN/inline, direct WhatsApp link generator (`https://wa.me/{nomor}?text={pesan}`).
* **FR-07 (Static URL Publish - Stretch Goal):** Satu klik deploy ke Vercel/Supabase/Firebase untuk public live link.

### 4.3 Non-Functional Requirements (NFR)
* **NFR-01 Performance:** Time-to-first-draft < 10 detik.
* **NFR-02 Responsiveness:** Responsif dari layar smartphone (375px) hingga desktop (1440px).
* **NFR-03 Usability:** Bahasa Indonesia natural tanpa istilah teknis asing bagi pemilik UMKM.
* **NFR-04 Reliability:** Tidak ada crash saat parsing JSON gagal; gunakan fallback data.
* **NFR-05 Token Efficiency:** Maksimal 2.000 token per turn prompt percakapan.

---

## 5. JSON Schema Contract (`UMKMWebsiteState`)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "UMKMWebsiteState",
  "type": "object",
  "required": ["templateId", "theme", "meta", "hero", "about", "services", "contact"],
  "properties": {
    "templateId": { 
      "type": "string", 
      "enum": ["template-services", "template-fnb", "template-retail"] 
    },
    "theme": {
      "type": "object",
      "required": ["primaryColor", "fontFamily"],
      "properties": {
        "primaryColor": { "type": "string", "pattern": "^#([A-Fa-f0-9]{6})$" },
        "accentColor": { "type": "string", "pattern": "^#([A-Fa-f0-9]{6})$" },
        "fontFamily": { "type": "string", "enum": ["sans", "serif", "display"] }
      }
    },
    "meta": {
      "type": "object",
      "required": ["businessName", "category", "tagline"],
      "properties": {
        "businessName": { "type": "string" },
        "category": { "type": "string" },
        "tagline": { "type": "string" }
      }
    },
    "hero": {
      "type": "object",
      "required": ["title", "subtitle", "ctaText", "ctaWhatsappMessage"],
      "properties": {
        "title": { "type": "string" },
        "subtitle": { "type": "string" },
        "ctaText": { "type": "string" },
        "ctaWhatsappMessage": { "type": "string" }
      }
    },
    "about": {
      "type": "object",
      "required": ["story"],
      "properties": {
        "story": { "type": "string" },
        "highlights": { "type": "array", "items": { "type": "string" } }
      }
    },
    "services": {
      "type": "array",
      "minItems": 3,
      "items": {
        "type": "object",
        "required": ["name", "description", "priceEstimate"],
        "properties": {
          "name": { "type": "string" },
          "description": { "type": "string" },
          "priceEstimate": { "type": "string" }
        }
      }
    },
    "testimonials": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["customerName", "review"],
        "properties": {
          "customerName": { "type": "string" },
          "review": { "type": "string" }
        }
      }
    },
    "contact": {
      "type": "object",
      "required": ["whatsappNumber", "address"],
      "properties": {
        "whatsappNumber": { "type": "string" },
        "address": { "type": "string" },
        "instagram": { "type": "string" }
      }
    }
  }
}
```

---

## 6. Scrum Governance & Quality Gates

### 6.1 Definition of Ready (DoR)
1. Kriteria Penerimaan (Acceptance Criteria) tertulis jelas dan teruji.
2. Kontrak skema JSON output disepakati antar seluruh stream developer.
3. Estimasi Story Points tidak melebihi 5 poin.

### 6.2 Definition of Done (DoD)
1. Kode lolos review via Pull Request dan di-merge ke branch `main`.
2. Bebas unhandled exception / error parsing JSON di browser console.
3. Tampilan responsif tervalidasi di Desktop (1440px) dan Mobile (375-390px).
4. Lolos pengujian manual Acceptance Demo Matrix (TC-01 s/d TC-04).

### 6.3 Daily Cadence
* **Standup Pagi (09:00 WIB - 10 Menit):** 3 pertanyaan (Kemarin, Hari ini, Blocker).
* **Mid-Day Sync (Asinkron):** Konfirmasi bila ada pembaruan skema data JSON.
* **End-of-Day Push (17:30 WIB):** Push seluruh commit harian dengan status passing build.

---

## 7. Acceptance Demo Matrix & Capstone Defense

| Test Case | Langkah Pengujian | Hasil yang Diharapkan | Status Target |
|---|---|---|---|
| **TC-01: First Draft Generation** | Input teks: *"Warung Kopi Sejahtera, jual kopi tubruk dan roti bakar di Surabaya, target anak muda nugas, wa 08123456789"* | Preview me-render template F&B otomatis, copy bahasa Indonesia santai, 3 menu, tombol WA aktif. | Wajib Lulus |
| **TC-02: Color & Tone Revision** | Input revisi: *"Ganti nuansa warna jadi cokelat tua klasik"* | Tema warna berubah; teks dan link nomor WhatsApp tetap utuh. | Wajib Lulus |
| **TC-03: Content Addition** | Input revisi: *"Tambahkan menu baru: Pisang Goreng Keju harga 15 ribu"* | Daftar menu bertambah 1 item secara reaktif di preview tanpa reload. | Wajib Lulus |
| **TC-04: Export HTML Test** | Klik *"Download Website"*, buka file `.html` di browser lokal | Tampilan identik dengan preview, tata letak responsif, link WA mengarah ke `https://wa.me/628123456789...`. | Wajib Lulus |

### Checklist Kesiapan Demo (Hari ke-9)
- [ ] Prompt Uji 1 Siap: Warung Kopi / Kuliner (Template F&B)
- [ ] Prompt Uji 2 Siap: Barbershop / Cuci Sepatu (Template Services)
- [ ] Prompt Uji 3 Siap: Toko Retail / Produk Fisik (Template Retail)
- [ ] Perintah Revisi Teruji: Perubahan warna tema & penambahan menu selesai < 5 detik
- [ ] Export Teruji: File HTML standalone berfungsi offline lengkap dengan tombol WA
- [ ] Video Backup Demo: Rekaman video offline siap pakai jika internet bermasalah saat presentasi
