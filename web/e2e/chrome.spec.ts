import { expect, test } from "@playwright/test";

import { ORGANISATION } from "../src/data/organisation";
import { HOMES, PAGES } from "./routes";

/**
 * The chrome on every page (wiki: site/structure.md § Header, § Footer): one of each landmark, a menu that works from
 * the keyboard and gives focus back, and a footer where every fact is a tap: one `tel:` per number, the email a
 * `mailto:`, socials named.
 */
for (const { path } of PAGES) {
  test(`landmarks ${path}`, async ({ page }) => {
    await page.goto(path);
    // Roles, not tags: a <header> inside an <article> or <section> is a card's header, not the banner landmark.
    await expect(page.getByRole("banner")).toHaveCount(1);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.getByRole("contentinfo")).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
  });
}

for (const path of HOMES) {
  test(`menu opens, traps the page and closes from the keyboard ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    const button = page.locator("header button[aria-controls='site-menu']");
    const menu = page.locator("#site-menu");
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toBeVisible();
    await expect(page.locator("main")).toHaveJSProperty("inert", true);
    // Focus moved into the menu.
    expect(await page.evaluate(() => document.activeElement?.closest("#site-menu") !== null)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(button).toBeFocused();
    await expect(page.locator("main")).toHaveJSProperty("inert", false);
  });

  test(`footer facts are taps ${path}`, async ({ page }) => {
    await page.goto(path);
    const footer = page.locator("footer");
    for (const phone of ORGANISATION.phones) await expect(footer.locator(`a[href="tel:${phone.e164}"]`)).toHaveCount(1);
    await expect(footer.locator(`a[href="mailto:${ORGANISATION.email}"]`)).toHaveCount(1);
    for (const social of ORGANISATION.socials) {
      await expect(footer.getByRole("link", { name: social.name, exact: false }).first()).toHaveAttribute("href", social.href);
    }
  });
}
