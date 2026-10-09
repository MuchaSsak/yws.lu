import { expect, test } from "@playwright/test";

import { AUTONYMS, DEFAULT_LOCALE, LOCALES } from "../src/lib/locales";
import { pathTo } from "../src/lib/routes";
import { PAGES, ROUTES } from "./routes";

/**
 * Head + language switcher per page × locale (site/i18n.md, site/seo.md § Metadata rules). Review builds are noindex;
 * the launch gate checks production robots.
 */
for (const { id, locale, path } of PAGES) {
  test(`head ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page).toHaveTitle(/\S.{5,}/);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(path);
    const hreflangs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) => links.map((link) => `${link.getAttribute("hreflang")} ${new URL(link.getAttribute("href")!).pathname}`));
    expect(hreflangs).toEqual([
      ...LOCALES.map((other) => `${other} ${pathTo(other, id)}`),
      `x-default ${id === "home" ? "/" : pathTo(DEFAULT_LOCALE, id)}`,
    ]);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /^https?:\/\/.+\.png$/);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", locale === "fr" ? "fr_FR" : "en_GB");
    // One site name everywhere (seo.md § Entity): og:site_name and the title suffix.
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "Youth Work Synergy");
  });

  test(`switcher keeps the page ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    const links = page.locator("header [data-lang-switch] a");
    await expect(links).toHaveCount(LOCALES.length);
    const seen = await links.evaluateAll((all) =>
      all.map((a) => `${a.getAttribute("hreflang")} ${a.getAttribute("href")} ${a.textContent!.replace(/\s+/g, " ").trim()}`),
    );
    expect(seen).toEqual(LOCALES.map((other) => `${other} ${pathTo(other, id)} ${AUTONYMS[other]}`));
    await expect(page.locator(`header [data-lang-switch] a[hreflang="${locale}"]`)).toHaveAttribute("aria-current", "page");
  });
}

for (const route of ROUTES) {
  test(`no console errors or CSP violations ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" && !/404 \(Not Found\)/.test(message.text())) errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(String(error)));
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });
}

test("the 404 answers 404, is noindex and speaks the visitor's language", async ({ page }) => {
  const en = await page.goto("/en/does-not-exist/");
  expect(en?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.goto("/fr/page-introuvable/");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator("h1:visible")).toHaveCount(1);
});
