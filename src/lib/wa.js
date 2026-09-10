// ponytail: no lib — regex + encode, add libphonenumber if multi-country
export function normalizeWaNumber(raw) {
  if (!raw) return "";
  let s = String(raw).replace(/[^\d]/g, "");
  if (s.startsWith("0")) s = "62" + s.slice(1);
  if (!s.startsWith("62")) s = "62" + s;
  return s;
}

export function isValidWaNumber(raw) {
  const s = String(raw).replace(/[^\d]/g, "");
  return /^0?8\d{8,12}$/.test(s) || /^628\d{8,12}$/.test(s);
}

export function buildWaLink(number, message = "") {
  const n = normalizeWaNumber(number);
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${n}${text}`;
}
