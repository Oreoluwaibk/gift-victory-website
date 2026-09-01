const DEFAULT_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

/** Site URL for server code (emails, API). Netlify sets URL at runtime. */
export function getServerSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.URL?.trim() ||
    process.env.DEPLOY_PRIME_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (fromEnv) {
    return normalizeSiteUrl(fromEnv);
  }

  return DEFAULT_SITE_URL;
}

export function buildCheckInUrl(code: string, origin?: string): string {
  const base = origin ? normalizeSiteUrl(origin) : getServerSiteUrl();
  return `${base}/check-in/${encodeURIComponent(code)}`;
}
