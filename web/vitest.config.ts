import { defineConfig } from "vitest/config";

/** Unit tests only (wiki: tech/conventions.md § Tests); browser checks live in e2e/ (Playwright). */
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts", "scripts/**/*.test.{ts,mjs}"],
  },
});
