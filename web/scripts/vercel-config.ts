/**
 * Writes the repo-root vercel.json from the route map (wiki: tech/technologies.md § Hosting, site/seo.md § Redirects).
 * The site is static, so the host does what Astro can't: the `/` language redirect (307), the old-URL 308s, trailing
 * slashes, cache and security headers. It sits at the repo root and builds `web/`, so the Vercel project keeps its
 * Root Directory (no owner step). Run `bun run vercel:config` after changing routes.ts; the build and routes.test.ts
 * fail while the committed file differs from this output.
 *
 *   bun scripts/vercel-config.ts          write vercel.json
 *   bun scripts/vercel-config.ts --check  exit 1 if vercel.json is stale
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { DEFAULT_LOCALE } from "../src/lib/locales";
import { LEGACY, pathTo } from "../src/lib/routes";

const FILE = fileURLToPath(new URL("../../vercel.json", import.meta.url));

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
  has?: { type: "header"; key: string; value: string }[];
}

function legacyRedirects(): Redirect[] {
  const redirects: Redirect[] = [];
  for (const [source, { to, hash }] of Object.entries(LEGACY)) {
    const destination = pathTo(DEFAULT_LOCALE, to, hash);
    const variants = new Set([source, source.toLowerCase()]);
    for (const variant of variants) {
      redirects.push({ source: variant, destination, permanent: true });
      if (!variant.includes(":")) redirects.push({ source: `${variant}/`, destination, permanent: true });
    }
  }
  return redirects;
}

export function vercelConfig() {
  return {
    $schema: "https://openapi.vercel.sh/vercel.json",
    framework: "astro",
    installCommand: "cd web && bun install --frozen-lockfile",
    buildCommand: "cd web && bun run build",
    outputDirectory: "web/dist",
    trailingSlash: true,
    redirects: [
      // `/` by the browser's first language; temporary, so search engines keep both locale homes (site/i18n.md § Root).
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "(?i)^\\s*fr.*" }],
        destination: pathTo("fr", "home"),
        permanent: false,
      },
      { source: "/", destination: pathTo(DEFAULT_LOCALE, "home"), permanent: false },
      // The conventional sitemap URL (404 on the 2025 site) → the index Astro writes.
      { source: "/sitemap.xml", destination: "/sitemap-index.xml", permanent: true },
      ...legacyRedirects(),
    ] satisfies Redirect[],
    headers: [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Hashed build assets never change.
      { source: "/_astro/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      // Unhashed media: a day fresh, then revalidated in the background.
      {
        source: "/(models|posters|bg|fonts)/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ],
  };
}

export const vercelJson = () => `${JSON.stringify(vercelConfig(), null, 2)}\n`;

// CLI only (routes.test.ts imports this module for vercelJson()).
if (process.argv[1]?.replaceAll("\\", "/").endsWith("scripts/vercel-config.ts")) {
  const json = vercelJson();
  if (process.argv.includes("--check")) {
    // Compared as data, not bytes. On Vercel the check only warns: the host has applied vercel.json before the build
    // starts (so failing changes nothing) and the copy the build reads there is not byte-for-byte the committed one;
    // the local build and routes.test.ts keep the gate.
    let current: unknown;
    try {
      current = JSON.parse(readFileSync(FILE, "utf8"));
    } catch {
      current = undefined;
    }
    if (JSON.stringify(current) !== JSON.stringify(vercelConfig())) {
      console.error("vercel.json is stale: run `bun run vercel:config`");
      if (!process.env.VERCEL) process.exit(1);
    }
  } else {
    writeFileSync(FILE, json);
    console.log(`vercel.json: ${vercelConfig().redirects.length} redirects`);
  }
}
