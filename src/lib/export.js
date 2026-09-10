// ponytail: single-file ZIP — no folder, no file-saver lib (use <a download> native)
import JSZip from "jszip";
import { buildWaLink } from "./wa.js";

function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

export function buildHtml(website) {
  const wa = buildWaLink(website.contact.whatsappNumber, website.hero.ctaWhatsappMessage);
  const services = website.services.map(s => `<div class="border p-4 rounded-xl bg-white shadow-sm"><h3 class="font-bold">${esc(s.name)}</h3><p class="text-sm text-slate-600">${esc(s.description)}</p><p class="font-semibold mt-2">${esc(s.priceEstimate)}</p></div>`).join("");
  const testimonials = (website.testimonials||[]).map(t => `<blockquote class="border-l-4 pl-3 py-2" style="border-color:${website.theme.primaryColor}"><p class="italic">"${esc(t.review)}"</p><cite class="text-sm font-semibold">— ${esc(t.customerName)}</cite></blockquote>`).join("");
  return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(website.meta.businessName)} — ${esc(website.meta.tagline)}</title><script src="https://cdn.tailwindcss.com"><\/script></head><body class="font-sans text-slate-800 scroll-smooth">
<nav class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b flex items-center justify-between px-4 py-3">
  <span class="font-extrabold" style="color:${website.theme.primaryColor}">${esc(website.meta.businessName)}</span>
  <button id="nav-toggle" aria-label="Menu" class="sm:hidden p-2 border rounded-lg">☰</button>
  <div id="nav" class="hidden sm:flex gap-4 text-sm"><a href="#about" class="hover:underline">Tentang</a><a href="#services" class="hover:underline">Layanan</a><a href="#contact" class="hover:underline">Kontak</a><a href="${wa}" target="_blank" class="bg-green-500 text-white px-3 py-1 rounded-full">WA</a></div>
</nav>
<div id="nav-mobile" class="hidden sm:hidden border-b px-4 py-2 flex-col gap-2 text-sm bg-white"><a href="#about">Tentang</a><a href="#services">Layanan</a><a href="#contact">Kontak</a><a href="${wa}" target="_blank" class="text-green-600 font-semibold">Chat WhatsApp</a></div>
<header class="text-center py-16 px-6 text-white" style="background:${website.theme.primaryColor}"><h1 class="text-4xl font-extrabold">${esc(website.hero.title)}</h1><p class="mt-3 text-lg opacity-90">${esc(website.hero.subtitle)}</p><a href="${wa}" target="_blank" class="inline-block mt-6 bg-white px-6 py-3 rounded-full font-bold" style="color:${website.theme.primaryColor}">${esc(website.hero.ctaText)}</a></header>
<section id="about" class="max-w-3xl mx-auto px-6 py-12"><h2 class="text-2xl font-bold">Tentang Kami</h2><p class="mt-3 leading-relaxed">${esc(website.about.story)}</p></section>
<section id="services" class="max-w-5xl mx-auto px-6 py-12"><h2 class="text-2xl font-bold">Layanan</h2><div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${services}</div></section>
<section class="max-w-3xl mx-auto px-6 py-12"><h2 class="text-2xl font-bold">Testimoni</h2><div class="mt-6 grid gap-4">${testimonials}</div></section>
<footer id="contact" class="bg-slate-900 text-white text-center py-8 px-6"><p>${esc(website.contact.address)}</p><p class="mt-2"><a href="${wa}" class="text-green-400 font-semibold">WhatsApp: ${esc(website.contact.whatsappNumber)}</a> ${website.contact.instagram?`· ${esc(website.contact.instagram)}`:""}</p></footer>
<a href="${wa}" target="_blank" aria-label="Chat WA" class="fixed bottom-4 right-4 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-2xl">✉</a>
<script>
// ponytail: vanilla only — ~25 lines, no framework. Split if >50 lines.
const t=document.getElementById('nav-toggle'),m=document.getElementById('nav-mobile');
if(t&&m) t.onclick=()=>m.classList.toggle('hidden');
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id.length>1){ const el=document.querySelector(id); if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); if(m) m.classList.add('hidden'); }}
  });
});
</script>
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
