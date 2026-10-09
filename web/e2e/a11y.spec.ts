import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { HOMES, ROUTES } from "./routes";

/**
 * WCAG 2.2 AA via axe on every route and locale (design-quality.md § Accessibility floor), at a phone and a desktop
 * width. Reduced motion, so entrance animations don't leave half-faded text for the contrast check.
 */
for (const route of ROUTES) {
  for (const width of [390, 1440]) {
    test(`axe ${width} ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(summary).toEqual([]);
    });
  }
}

for (const home of HOMES) {
  test(`skip link is the first tab stop and moves focus to main ${home}`, async ({ page }) => {
    await page.goto(home);
    await page.keyboard.press("Tab");
    const skip = page.locator("a.sr-only-focusable").first();
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });
}
