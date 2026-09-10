// ponytail: stub Could-have — return disabled until creds exist, keep ZIP as primary (Dashboard Plan B)
export const PUBLISH_ENABLED = false;

export async function publish(html) {
  if (!PUBLISH_ENABLED) return { url: null, disabled: true, reason: "Publish dinonaktifkan — fokus Download ZIP (TSK-06D Plan B)" };
  // real impl when needed: fetch Vercel/Supabase API
  throw new Error("not implemented");
}
