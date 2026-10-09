import { fileURLToPath } from "node:url";

import { lingui } from "@lingui/vite-plugin";
import { defineConfig } from "vitest/config";

/**
 * Unit tests only (wiki: tech/conventions.md § Tests); browser checks live in e2e/ (Playwright). The Lingui plugin
 * compiles the `msg` macros and the `.po` catalogs, so tests read messages exactly as the build does.
 */
export default defineConfig({
  plugins: [lingui({ macroTransform: true })],
  resolve: { alias: { "~": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    include: ["src/**/*.test.ts", "scripts/**/*.test.{ts,mjs}"],
  },
});
