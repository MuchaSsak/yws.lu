import babelExtractor from "@lingui/cli/api/extractors/babel";
import { formatter } from "@lingui/format-po";
import { defineConfig } from "lingui-for-astro/config";
import { astroExtractor } from "lingui-for-astro/extractor";

import { DEFAULT_LOCALE, LOCALES, SOURCE_LOCALE } from "./src/lib/locales";

/**
 * Lingui (wiki: tech/usage/lingui.md). One `.po` catalog per locale; the Vite plugin compiles them on import, so no
 * compiled catalog is committed. Production builds fail on a message missing from the fr catalog (astro.config.mjs).
 * Origins without line numbers: moving code never changes the catalogs, so `lingui check sync` only fails on messages.
 */
export default defineConfig({
  sourceLocale: SOURCE_LOCALE,
  locales: [...LOCALES],
  fallbackLocales: { default: DEFAULT_LOCALE },
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["<rootDir>/src"],
      exclude: ["**/node_modules/**", "<rootDir>/src/locales/**"],
    },
  ],
  extractors: [astroExtractor, babelExtractor],
  format: formatter({ lineNumbers: false }),
});
