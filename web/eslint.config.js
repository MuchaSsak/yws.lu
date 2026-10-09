// @ts-check
import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import lingui from "eslint-plugin-lingui";
import globals from "globals";
import tseslint from "typescript-eslint";

/** One flat config for `web/` (wiki: tech/conventions.md § Code style), the portfolio's rules. */
export default tseslint.config(
  {
    ignores: ["dist/**", ".astro/**", ".cache/**", "node_modules/**", "lighthouse/**", "test-results/**", "playwright-report/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
  {
    // Ambient declarations (Astro's `App.Locals`) need inline `import()` types.
    files: ["**/*.d.ts"],
    rules: { "@typescript-eslint/consistent-type-imports": "off" },
  },
  {
    files: ["**/*.ts"],
    plugins: { lingui },
    rules: {
      "lingui/t-call-in-function": "error",
      "lingui/no-single-variables-to-translate": "error",
    },
  },
);
