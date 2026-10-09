/**
 * Renders the still posters the 3D scenes show before (and instead of) WebGL (wiki: tech/usage/three.md § Posters):
 * opens the built page in Chromium with the GPU on and reduced motion (the scene then holds its final pose), waits
 * for the scene to mark itself ready, screenshots its box with a transparent background and writes a WebP.
 *
 *   node scripts/poster.mjs [--base http://localhost:4322]   (serve dist first: bun run preview)
 */
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";
import sharp from "sharp";

const args = process.argv.slice(2);
const base = args.includes("--base") ? args[args.indexOf("--base") + 1] : "http://localhost:4322";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const POSTERS = [{ page: "/en/?poster", host: "[data-house-scene]", out: "public/posters/house.webp", width: 960 }];

const browser = await chromium.launch({ args: ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"] });
try {
  for (const poster of POSTERS) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
    await page.goto(base + poster.page, { waitUntil: "load" });
    const host = page.locator(poster.host);
    await host.locator("canvas").waitFor({ state: "attached", timeout: 30_000 });
    await page.waitForFunction((selector) => document.querySelector(selector)?.hasAttribute("data-ready"), poster.host, {
      timeout: 30_000,
    });
    // Two more frames so the model is drawn, then hide the old poster so it can't leak into the new one.
    await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
    // Only the scene may reach the PNG: the page background (glow, grid) and every other layer are hidden.
    await page.addStyleTag({
      content: `html, body { background: transparent !important }
        body *, body *::before, body *::after { visibility: hidden !important }
        ${poster.host}, ${poster.host} * { visibility: visible !important }
        .house-poster { display: none !important }`,
    });
    const png = await host.screenshot({ omitBackground: true, animations: "disabled" });
    const out = resolve(root, poster.out);
    mkdirSync(dirname(out), { recursive: true });
    const info = await sharp(png).resize({ width: poster.width }).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(out);
    console.log(`${poster.out}: ${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB`);
    await page.close();
  }
} finally {
  await browser.close();
}
