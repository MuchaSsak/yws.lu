import { defineConfig, devices } from "@playwright/test";

/**
 * Browser gates on the BUILT site (wiki: tech/usage/visual-qa.md): `bun run build`, then `bun run e2e`. Tests run
 * against scripts/serve.mjs (dist/ served the way Vercel will: redirects, headers, trailing slash, 404), never
 * `astro dev`. One server on 4322, shared with shots and Lighthouse.
 */
const PORT = Number(process.env.E2E_PORT ?? 4322);

export default defineConfig({
  testDir: "e2e",
  outputDir: ".cache/e2e-results",
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  timeout: 60_000,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    ...devices["Desktop Chrome"],
    serviceWorkers: "block",
  },
  webServer: {
    command: `node scripts/serve.mjs --port ${PORT}`,
    url: `http://localhost:${PORT}/en/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
