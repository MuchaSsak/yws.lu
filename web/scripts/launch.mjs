/**
 * Is this build the real launch, and which origin do its URLs use? (wiki: site/seo.md § Crawl, placeholders.md)
 *
 * A launch build is indexable and refuses to ship placeholders (scripts/launch-gate.mjs). It is a Vercel production
 * deploy (`VERCEL_ENV=production`: the site on www.yws.lu), `IS_FULL_PRODUCTION=true`, or `--launch`. Every other build
 * (local, a branch preview) is `noindex` [assumption 2026-10-09: production must never ship noindex, so production is
 * the default trigger; placeholders then block the deploy and Vercel keeps the previous one live].
 */

/** The canonical origin (Q16: the apex 308s to www [assumption, verified by curl 2026-10-09]). */
export const SITE_URL = "https://www.yws.lu";

export function isLaunchBuild(env = process.env, argv = process.argv) {
  return argv.includes("--launch") || env.IS_FULL_PRODUCTION === "true" || env.VERCEL_ENV === "production";
}

/**
 * The origin for canonical, hreflang, og:image and the sitemap: `PUBLIC_SITE_URL` if set; a launch uses the real
 * domain; a Vercel preview its own host (so shared preview links show working cards); locally the real domain.
 */
export function siteUrl(env = process.env, argv = process.argv) {
  if (env.PUBLIC_SITE_URL) return env.PUBLIC_SITE_URL.replace(/\/$/, "");
  if (isLaunchBuild(env, argv)) return SITE_URL;
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return SITE_URL;
}
