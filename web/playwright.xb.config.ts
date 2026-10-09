/**
 * Cross-browser gates (`bun run e2e:xb`, after a build; wiki: tech/usage/visual-qa.md). Firefox: functional + axe +
 * text fit; WebKit: functional + layout. Playwright's WebKit on Windows is not Safari (fonts, rendering artifacts):
 * check a WebKit-only failure against the live site before fixing it (lessons.md).
 */
import { defineConfig, devices } from "@playwright/test";

import base from "./playwright.config";

export default defineConfig({
  ...base,
  projects: [
    { name: "firefox", use: { ...devices["Desktop Firefox"] }, testMatch: /(chrome|i18n|redirects|motion|a11y|text-fit)\.spec\.ts/ },
    { name: "webkit", use: { ...devices["Desktop Safari"] }, testMatch: /(chrome|i18n|redirects|motion|layout)\.spec\.ts/ },
  ],
});
