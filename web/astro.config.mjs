// @ts-check
import sitemap from "@astrojs/sitemap";
import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import linguiForAstro from "lingui-for-astro/integration";

import { alternates, INDEXABLE, routeOf } from "./src/lib/routes";
import { siteUrl } from "./scripts/launch.mjs";

/**
 * yws.lu (wiki: .claude/project-info/tech/technologies.md). `output: "static"`: every page is pre-rendered and served
 * from Vercel's CDN; React renders to HTML at build and ships JS only for islands (the 3D scenes). The origin comes
 * from scripts/launch.mjs (the real domain on a launch, the preview's own host on a branch preview).
 */
const SITE_URL = siteUrl();
const BUILD = process.argv.includes("build");

export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  integrations: [
    linguiForAstro(),
    // Indexable pages only, each with its en / fr / x-default alternates (site/seo.md § Crawl). The 404, the root
    // safety net and the noindex legal pages stay out.
    sitemap({
      serialize(item) {
        const route = routeOf(new URL(item.url).pathname);
        if (!route || !INDEXABLE.includes(route.id)) return undefined;
        return { ...item, links: alternates(SITE_URL, route.id).map(({ hreflang, href }) => ({ lang: hreflang, url: href })) };
      },
    }),
  ],
  vite: {
    // An inline PostCSS config stops Vite searching upwards into the Next app's postcss.config.mjs at the repo root
    // (Tailwind runs as a Vite plugin here).
    css: { postcss: { plugins: [] } },
    plugins: [
      tailwindcss(),
      // Native macro transform for .tsx/.ts + `.po` compiled on import; a production build fails when the fr catalog
      // misses a message (site/i18n.md).
      lingui({ macroTransform: true, failOnMissing: BUILD ? "catalog" : false, failOnCompileError: true }),
    ],
  },
  image: { responsiveStyles: false },
});
