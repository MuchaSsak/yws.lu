import { expect, test } from "@playwright/test";

import { ROUTES } from "./routes";

/**
 * Privacy by default (wiki: legal/compliance-and-data.md): loading and scrolling a page sets no cookie, writes no
 * storage and talks to no other host. Third parties (Google Maps, forms, socials) are reached only by a click.
 */
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
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
        scrollTo(0, y);
        await new Promise((done) => setTimeout(done, 80));
      }
    });
    await page.waitForTimeout(1500);
    expect(foreign).toEqual([]);
    expect(await context.cookies()).toEqual([]);
    const storage = await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }));
    expect(storage).toEqual({ local: 0, session: 0 });
  });
}
