import { expect, test } from "@playwright/test";

import { textFitProblems } from "./text-fit";
import { PAGES } from "./routes";

/**
 * Text fit in EVERY locale (working-agreement.md § 2; French runs longer, so boxes are sized for it): at each gate
 * width, after load (entrances finished) and with the mobile menu open, no text is clipped, spills, runs past the
 * screen edge, breaks inside a word or paints over other text. Scrolled through once so in-view entrances finish.
 */
const WIDTHS = [320, 390, 1024, 1440, 1920] as const;

for (const { path } of PAGES) {
  for (const width of WIDTHS) {
    test(`text fit ${width} ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const problems: string[] = [];
      // Viewport by viewport, so the overlap check sees what is really painted together.
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += (width < 700 ? 844 : 1000) * 0.9) {
        await page.evaluate((top) => scrollTo(0, top), y);
        await page.waitForTimeout(80);
        problems.push(...(await textFitProblems(page)));
      }
      expect([...new Set(problems)]).toEqual([]);
    });
  }
  test(`text fit with the menu open 390 ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    await page.locator("header button[aria-controls]").first().click();
    await page.waitForTimeout(300);
    expect(await textFitProblems(page)).toEqual([]);
  });
}
