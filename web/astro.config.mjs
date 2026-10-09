// @ts-check
import react from "@astrojs/react";
import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import linguiForAstro from "lingui-for-astro/integration";

/**
 * yws.lu (wiki: .claude/project-info/tech/technologies.md). `output: "static"`: every page is pre-rendered and served
 * from Vercel's CDN; React renders to HTML at build and ships JS only for islands (the 3D scenes).
 */
const SITE_URL = (process.env.PUBLIC_SITE_URL ?? "https://www.yws.lu").replace(/\/$/, "");
const BUILD = process.argv.includes("build");

export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always" },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  integrations: [linguiForAstro(), react()],
  vite: {
    plugins: [
      tailwindcss(),
      // Native macro transform for .tsx/.ts + `.po` compiled on import; a production build fails when the fr catalog
      // misses a message (site/i18n.md).
      lingui({ macroTransform: true, failOnMissing: BUILD ? "catalog" : false, failOnCompileError: true }),
    ],
  },
  image: { responsiveStyles: false },
});
