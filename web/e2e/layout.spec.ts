import { expect, test } from "@playwright/test";

import { HOMES, INNER_WIDTHS, ROUTES, WIDTHS } from "./routes";

/**
 * The layout sweep (working-agreement.md § 2): no horizontal overflow from 320 to 2560, and text stays inside the
 * content cap on ultrawide screens (design.md § Layout: 90rem shell).
 */
for (const route of ROUTES) {
  const widths: readonly number[] = HOMES.includes(route) ? WIDTHS : INNER_WIDTHS;
  for (const width of widths) {
    test(`layout ${width} ${route}`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, "horizontal overflow (px)").toBeLessThanOrEqual(0);
      const widest = await page.evaluate(() =>
        Math.max(
          0,
          ...[...document.querySelectorAll("main :is(h1, h2, h3, p, li, dd)")].map((el) => el.getBoundingClientRect().width),
        ),
      );
      expect(widest, "widest text block (px)").toBeLessThanOrEqual(1440);
    });
  }
}
