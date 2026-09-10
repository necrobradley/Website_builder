// ponytail: single-file ZIP — no folder, no file-saver lib (use <a download> native)
import JSZip from "jszip";
import { buildWaLink } from "./wa.js";

function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

export function buildHtml(website) {
  const wa = buildWaLink(website.contact.whatsappNumber, website.hero.ctaWhatsappMessage);
  const services = website.services.map(s => `<div style="border:1px solid #e2e8f0;padding:16px;border-radius:12px"><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p><p><b>${esc(s.priceEstimate)}</b></p></div>`).join("");
  const testimonials = (website.testimonials||[]).map(t => `<blockquote style="border-left:4px solid ${website.theme.primaryColor};padding:8px 12px"><p>${esc(t.review)}</p><cite>${esc(t.customerName)}</cite></blockquote>`).join("");
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(website.meta.businessName)} — ${esc(website.meta.tagline)}</title><script src="https://cdn.tailwindcss.com"><\/script></head><body class="font-sans text-slate-800">
<header style="background:${website.theme.primaryColor};color:white;padding:48px 24px;text-align:center"><h1 style="font-size:2.5rem;font-weight:800">${esc(website.hero.title)}</h1><p style="margin:12px 0;font-size:1.2rem">${esc(website.hero.subtitle)}</p><a href="${wa}" target="_blank" style="display:inline-block;background:white;color:${website.theme.primaryColor};padding:12px 24px;border-radius:9999px;font-weight:700;text-decoration:none">${esc(website.hero.ctaText)}</a></header>
<section style="max-width:800px;margin:0 auto;padding:32px 24px"><h2>Tentang Kami</h2><p>${esc(website.about.story)}</p></section>
<section style="max-width:1000px;margin:0 auto;padding:32px 24px"><h2>Layanan</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">${services}</div></section>
<section style="max-width:800px;margin:0 auto;padding:32px 24px"><h2>Testimoni</h2><div style="display:grid;gap:12px">${testimonials}</div></section>
<footer style="background:#0f172a;color:white;text-align:center;padding:24px"><p>${esc(website.contact.address)}</p><p><a href="${wa}" style="color:#25d366">WhatsApp: ${esc(website.contact.whatsappNumber)}</a> ${website.contact.instagram?`· ${esc(website.contact.instagram)}`:""}</p></footer>
</body></html>`;
}

export async function exportZip(website) {
  const zip = new JSZip();
  zip.file("index.html", buildHtml(website));
  return zip.generateAsync({ type: "blob" });
}

export function downloadBlob(blob, filename="website.zip") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function copyHtml(website) {
  const html = buildHtml(website);
  await navigator.clipboard.writeText(html);
  return html;
}
