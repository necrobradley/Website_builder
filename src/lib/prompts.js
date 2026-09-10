// ponytail: single string prompt, no template engine — add i18n if multi-language needed
export const SYSTEM_PROMPT_V1 = `Kamu generator JSON untuk AI Website Builder UMKM Indonesia.
ATUURAN KETAT:
- Output HANYA JSON valid, tanpa markdown, tanpa \`\`\`json, tanpa komentar.
- Ikuti skema UMKMWebsiteState persis. Jangan tambah field di luar skema.
- Bahasa Indonesia santai, relevan UMKM lokal.
- templateId: "template-services" (Jasa), "template-fnb" (F&B/Kuliner), "template-retail" (Retail/Produk)
- theme.primaryColor format "#RRGGBB", fontFamily: "sans"|"serif"|"display"
- services minimal 3 item {name, description, priceEstimate}
- testimonials minimal 2 {customerName, review}
- contact.whatsappNumber format "08..." (akan dinormalisasi ke 62)
- hero.ctaWhatsappMessage pesan custom untuk link wa.me
Skema: {templateId, theme{primaryColor, accentColor, fontFamily}, meta{businessName, category, tagline}, hero{title, subtitle, ctaText, ctaWhatsappMessage}, about{story, highlights}, services[], testimonials[], contact{whatsappNumber, address, instagram}}`;

export function buildInitialPrompt(userInput, history = []) {
  const h = trimHistory(history, 3);
  const histBlock = h.length ? `\nRiwayat chat (3 turn terakhir):\n${h.map((x) => `- ${String(x).slice(0, 200)}`).join("\n")}\n` : "";
  return `${SYSTEM_PROMPT_V1}${histBlock}\nInput user: """${userInput.slice(0, 1000)}"""\n\nBalas JSON saja.`;
}

export function buildRevisionPrompt(oldJson, userMsg, history = []) {
  const h = trimHistory(history, 3);
  const histBlock = h.length ? `\nRiwayat chat:\n${h.map((x) => `- ${String(x).slice(0, 200)}`).join("\n")}\n` : "";
  // ponytail: few-shot for TC-02/03 — keep short, remove if token budget tight
  const rules = `Aturan revisi (diff, bukan regenerate):
- HANYA ubah field yang disebut. JANGAN hapus/acak section lain.
- Jika kata "warna/tema/nuansa" → ubah theme.primaryColor & accentColor saja (#RRGGBB), lainnya identik.
- Jika kata "headline/judul" → ubah hero.title saja.
- Jika kata "tambah/menu/produk" → append 1 item ke services[] (jangan replace array).
Contoh: "Ganti warna cokelat tua" → primaryColor "#78350f". "Tambah menu Pisang Goreng Keju 15 ribu" → services +{name:"Pisang Goreng Keju",description:"Pisang goreng... ",priceEstimate:"15 ribu"}.`;
  return `${SYSTEM_PROMPT_V1}\n\nState website saat ini:\n${JSON.stringify(oldJson).slice(0, 3500)}${histBlock}\nRevisi diminta: """${userMsg.slice(0, 500)}"""\n${rules}\nBalas JSON lengkap yang sudah direvisi.`;
}

export function trimHistory(history, max = 3) {
  return history.slice(-max);
}
