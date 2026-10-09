/**
 * The case-study page manifest: one row per page, its URL before the revamp (Next, one URL for both
 * languages, language from navigator.language) and after (one URL per locale). The P0 and P8 captures
 * both read this file, so "before" and "after" always compare the same page under the same settings.
 */
export const PAGES = [
  { id: "home", before: "/", after: { en: "/en/", fr: "/fr/" } },
  { id: "looking-for-housing", before: "/LookingForHousing", after: { en: "/en/youth-housing/", fr: "/fr/logement-jeunes/" } },
  { id: "rent-your-property", before: "/RentYourProperty", after: { en: "/en/rent-your-property/", fr: "/fr/louer-son-bien/" } },
  { id: "about-us", before: "/AboutUs", after: { en: "/en/about-us/", fr: "/fr/a-propos/" } },
  { id: "we-spark-projects", before: "/WeSparkProjects", after: { en: "/en/youth-projects/", fr: "/fr/projets-jeunes/" } },
  { id: "jobs", before: "/Jobs", after: null },
  { id: "tec-conference", before: "/TecConference", after: { en: "/en/tec-conference/", fr: "/fr/conference-tec/" } },
  { id: "not-found", before: "/does-not-exist", after: { en: "/en/does-not-exist/", fr: "/fr/does-not-exist/" } },
];

export const LOCALES = ["en", "fr"];
/** Playwright/Chrome locale per site locale: before the revamp the language came from navigator.language. */
export const BROWSER_LOCALE = { en: "en-US", fr: "fr-FR" };
export const WIDTHS = [320, 390, 768, 1024, 1440, 1920, 2560];

/** The URL list for a phase: [{ id, locale, path }]. Before: one path, rendered per browser locale. */
export function urlsFor(phase) {
  return PAGES.flatMap((page) => {
    if (phase === "before") return LOCALES.map((locale) => ({ id: page.id, locale, path: page.before }));
    if (!page.after) return [];
    return LOCALES.map((locale) => ({ id: page.id, locale, path: page.after[locale] }));
  });
}

/** How a visitor opens the menu and switches language, per phase (the clips and the chrome checks use these). */
export const INTERACTIONS = {
  before: {
    menuButton: 'nav [data-slot="sheet-trigger"]',
    // The flag-only Select: open the visible trigger, then pick the option (named in the current language: "French🇫🇷"
    // in English, "Français" in the menu's French copy).
    switchToFrench: async (page) => {
      await page.locator('[data-slot="select-trigger"]:visible').first().click();
      await page.getByRole("option", { name: /French|Fran/ }).click();
    },
  },
  after: {
    menuButton: 'header button[aria-controls="site-menu"]',
    switchToFrench: async (page) => {
      await page.getByRole("link", { name: "Français" }).first().click();
    },
  },
};

/** Lighthouse: WebGL through SwiftShader (software, deterministic), or every 3D scene silently fails and looks "fast". */
export const CHROME_FLAGS = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
/** Screenshots and clips: the real GPU (SwiftShader starves shader pages and their frames look broken). */
export const SHOT_FLAGS = ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"];
