import { expect, test } from "@playwright/test";

import { STATISTICS } from "../src/data/statistics";
import { pathTo } from "../src/lib/routes";
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
        scrollTo({ top: y, behavior: "instant" });
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

/**
 * With motion, the WebGL scenes draw in workers on OffscreenCanvases (three.md): each box gets its one canvas and turns
 * ready (CSS swaps the poster for it) once scrolled near, without a page error. The home's three toys share a worker.
 */
for (const [name, route, box] of [
  ["house", "home", '[data-toy="house"]'],
  ["wardrobe", "home", '[data-toy="wardrobe"]'],
  ["rocket", "home", '[data-toy="rocket"]'],
  ["globe", "tec", "[data-tec-globe]"],
] as const) {
  test(`with motion, the ${name} scene draws and replaces its poster`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(pathTo("en", route));
    await page.locator(box).scrollIntoViewIfNeeded();
    await expect(page.locator(box)).toHaveAttribute("data-ready", "", { timeout: 30_000 });
    await expect(page.locator(`${box} canvas`)).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}

/** About us, Real impact: the tiles count up to the numbers in statistics.ts once in view (and show them under reduced motion). */
for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`the impact tiles end on the statistics (${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto(pathTo("en", "about"));
    const tiles = page.locator(".impact-tiles [data-count]");
    await tiles.first().scrollIntoViewIfNeeded();
    const { sharedHouses, youngPeopleHoused, waitingList } = STATISTICS;
    await expect(tiles).toHaveText([String(sharedHouses), String(youngPeopleHoused), String(waitingList)], { timeout: 5000 });
  });
}
