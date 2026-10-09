import { expect, test } from "@playwright/test";

import { PAGES } from "./routes";

/**
 * Reduced motion (design.md § Motion, requirements.md F09): the final state, nothing left hidden, no 3D scene loaded
 * (the poster stays), the H1 painted from the first frame in every case.
 */
for (const { path } of PAGES) {
  test(`reduced motion: final state, nothing hidden ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
        scrollTo(0, y);
        await new Promise((done) => setTimeout(done, 60));
      }
    });
    await page.waitForTimeout(800);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("main *")]
        .filter((el) => el.checkVisibility() && el.textContent?.trim() && Number(getComputedStyle(el).opacity) < 1)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 80)),
    );
    expect(hidden).toEqual([]);
    await expect(page.locator("main canvas")).toHaveCount(0);
  });
}

test("the H1 is painted in the first frame (no entrance hides the LCP)", async ({ page }) => {
  for (const { path } of PAGES) {
    await page.goto(path, { waitUntil: "commit" });
    await page.locator("h1").waitFor();
    const opacity = await page.locator("h1").evaluate((h1) => {
      let el: Element | null = h1;
      let value = 1;
      while (el) {
        value *= Number(getComputedStyle(el).opacity);
        el = el.parentElement;
      }
      return value;
    });
    expect(opacity, path).toBe(1);
  }
});
