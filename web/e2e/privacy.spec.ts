import { expect, test } from "@playwright/test";

import { HOMES, ROUTES } from "./routes";

/**
 * Privacy by default (wiki: legal/compliance-and-data.md): loading a page sets no cookie, writes no storage and talks
 * to no other host. Scrolling keeps it that way everywhere except the homes, whose office map is Google's embed and
 * loads by itself near the screen [user 2026-10-09]: there, and only there, Google's map hosts may be reached and may
 * set their own cookies. Forms and socials stay links.
 */
const GOOGLE_MAPS = /(^|\.)(google\.[a-z.]+|gstatic\.com|googleapis\.com|googleusercontent\.com|ggpht\.com)$/;

for (const route of ROUTES) {
  test(`no cookies, storage or third-party requests ${route}`, async ({ page, context, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    const foreign: string[] = [];
    page.on("request", (request) => {
      const url = new URL(request.url());
      if (!["data:", "blob:"].includes(url.protocol) && url.origin !== origin) foreign.push(request.url());
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route);
    await page.waitForTimeout(500);
    expect(foreign, "on load").toEqual([]);
    expect(await context.cookies(), "on load").toEqual([]);

    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
        scrollTo({ top: y, behavior: "instant" });
        await new Promise((done) => setTimeout(done, 80));
      }
    });
    await page.waitForTimeout(1500);
    const map = HOMES.includes(route);
    const allowed = (host: string) => map && GOOGLE_MAPS.test(host.replace(/^\./, ""));
    expect(foreign.filter((url) => !allowed(new URL(url).hostname))).toEqual([]);
    expect((await context.cookies()).filter((cookie) => !allowed(cookie.domain))).toEqual([]);
    const storage = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }));
    expect(storage).toEqual({ local: 0, session: 0 });
  });
}
