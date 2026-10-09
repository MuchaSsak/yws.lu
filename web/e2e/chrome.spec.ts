import { expect, type Page, test } from "@playwright/test";

import { ORGANISATION } from "../src/data/organisation";
import { pathTo } from "../src/lib/routes";
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

  test(`credits dialog opens centred and closes ${path}`, async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      const dialog = page.locator("dialog[data-credits]");
      await page.locator("footer .credits-open").click();
      await expect(dialog).toBeVisible();
      await page.waitForTimeout(450);
      // Centred (Tailwind's reset once pinned it to the top-left corner). Horizontally within half a scrollbar: headless
      // Chromium hides scrollbars but still reserves the `scrollbar-gutter: stable` space beside the dialog.
      const [dx, dy] = await dialog.evaluate((el) => {
        const box = el.getBoundingClientRect();
        const { clientWidth, clientHeight } = document.documentElement;
        return [box.x + box.width / 2 - clientWidth / 2, box.y + box.height / 2 - clientHeight / 2].map(Math.abs);
      });
      expect(dx, `${width}px, across`).toBeLessThan(10);
      expect(dy, `${width}px, down`).toBeLessThan(2);
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    }
  });
}

/**
 * F04, contact without forms: the Copy buttons beside the email and the office address put exactly that text on the
 * clipboard and say so ("Copied"), from the keyboard too. Reading the clipboard back needs a permission only Chromium
 * grants in Playwright; Firefox and WebKit check the button shows and confirms.
 */
for (const path of HOMES) {
  test(`copy buttons copy the email and the address ${path}`, async ({ page, context, browserName }) => {
    const readBack = browserName === "chromium";
    if (readBack) await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(path);
    const { office } = ORGANISATION;
    for (const [value, scope] of [
      [ORGANISATION.email, ".contact-actions"],
      [`${office.street}, ${office.postalCode} ${office.locality}`, ".contact-map-caption"],
    ] as const) {
      const button = page.locator(`${scope} button[data-copy]`).first();
      await button.scrollIntoViewIfNeeded();
      await button.focus();
      await page.keyboard.press("Enter");
      await expect(button).toHaveAttribute("data-copied", "");
      if (readBack) expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(value);
    }
  });
}

/**
 * Anchor jumps land on their target (scripts/anchor-jumps.ts). Sections skip layout off screen and stand at an
 * estimated height until drawn, which once put `/en/#contact` 552 px past its section: the target's top must sit at the
 * scroll padding (just under the sticky header), within a few pixels.
 */
const offTarget = (page: Page, selector: string) =>
  page.locator(selector).evaluate((el) => {
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
    return Math.abs(Math.round(el.getBoundingClientRect().top - padding));
  });

for (const [path, selector] of [
  ["/en/#contact", "#contact"],
  ["/fr/#contact", "#contact"],
  ["/en/about-us/#real-impact", "#real-impact"],
  ["/en/youth-housing/#who-gets-priority", "#who-gets-priority"],
] as const) {
  test(`a link from another page lands on its section ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    await expect.poll(() => offTarget(page, selector), { timeout: 5000 }).toBeLessThanOrEqual(4);
  });
}

for (const locale of ["en", "fr"] as const) {
  test(`a legal contents link lands on its heading ${locale}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(pathTo(locale, "privacy"));
    const link = page.locator("[data-legal-toc] a").nth(6);
    const hash = await link.getAttribute("href");
    await link.click();
    // The ids start with a digit ("7-…"): select by attribute, not `#7-…`.
    await expect.poll(() => offTarget(page, `[id="${hash?.slice(1)}"]`), { timeout: 5000 }).toBeLessThanOrEqual(4);
  });
}
