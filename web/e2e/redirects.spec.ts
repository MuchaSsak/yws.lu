import { expect, test } from "@playwright/test";

import { LEGACY_CASES, PAGES } from "./routes";

/**
 * Old URLs keep working (site/seo.md § Redirects): every 2025 and WordPress path 308s to its English page in ONE hop,
 * in its original case, lower case, and with a trailing slash. `/` answers 307 by browser language, never 200.
 * Served by scripts/serve.mjs from the same vercel.json Vercel reads.
 */
for (const { from, to } of LEGACY_CASES) {
  const variants = new Set([from, from.toLowerCase(), ...(from.endsWith(".pdf") ? [] : [`${from}/`])]);
  for (const variant of variants) {
    test(`308 ${variant}`, async ({ request }) => {
      const response = await request.get(variant, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(to);
      const next = await request.get(to.split("#")[0]!, { maxRedirects: 0 });
      expect(next.status(), "one hop, then 200").toBe(200);
    });
  }
}

test("/ redirects by Accept-Language (307)", async ({ request }) => {
  const fr = await request.get("/", { maxRedirects: 0, headers: { "Accept-Language": "fr-LU,fr;q=0.9,en;q=0.8" } });
  expect(fr.status()).toBe(307);
  expect(fr.headers().location).toBe("/fr/");
  const de = await request.get("/", { maxRedirects: 0, headers: { "Accept-Language": "de-LU,de;q=0.9" } });
  expect(de.status()).toBe(307);
  expect(de.headers().location).toBe("/en/");
});

test("pages without the trailing slash 308 to it", async ({ request }) => {
  for (const { path } of PAGES.filter((page) => page.id !== "home")) {
    const response = await request.get(path.replace(/\/$/, ""), { maxRedirects: 0 });
    expect(response.status(), path).toBe(308);
    expect(response.headers().location).toBe(path);
  }
});
