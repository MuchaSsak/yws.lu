#!/usr/bin/env node
/**
 * Visual-QA screenshots (wiki: tech/usage/visual-qa.md). Needs the built site served (`bun run preview`, 4322).
 *
 *   node scripts/shots.mjs [--base http://localhost:4322] [--paths /en/,/fr/] [--widths 390,1024,1440,1920]
 *                          [--all] [--full] [--reduced] [--settle 1800] [--accept] [--out <dir>]
 *
 * `--all` shoots every built route in both locales. Scratch PNGs go to repo-root screenshots/.work/<route>/ (gitignored);
 * `--accept` also keeps the 1920 and 390 shots as WebP in screenshots/<route>/ (local proof, gitignored; the log of
 * accepted views is screenshots/VISUAL-QA.md). The real GPU renders the 3D (SwiftShader frames look broken); full-page
 * shots of long pages use device scale 1 (past ~16,384 device px Chromium paints black). Prints horizontal overflow
 * per shot so a broken layout can't hide behind a nice crop.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";

import { chromium } from "@playwright/test";
import sharp from "sharp";

import { builtRoutes, ROOT } from "./routes.mjs";

const REPO = join(ROOT, "..");
const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const base = opt("base", "http://localhost:4322");
const paths = argv.includes("--all") ? builtRoutes() : opt("paths", "/en/,/fr/").split(",");
const widths = opt("widths", "390,1024,1440,1920").split(",").map(Number);
const settle = Number(opt("settle", "1800"));
const full = argv.includes("--full");
const reduced = argv.includes("--reduced");
const accept = argv.includes("--accept");
const outDir = opt("out", join(REPO, "screenshots", ".work"));

const slug = (path) => path.replace(/^\/|\/$/g, "").replace(/\//g, "_") || "root";
const browser = await chromium.launch({ args: ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"] });
let overflowing = 0;
try {
  for (const width of widths) {
    const height = width < 700 ? 844 : width < 1100 ? 1024 : width < 2000 ? 1080 : 1440;
    const scale = full ? 1 : width < 700 ? 2 : 1;
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: scale,
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    for (const path of paths) {
      await page.goto(base + path, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      if (full) {
        // Walk the page once so near-visibility loaders (3D, lazy images, in-view fades) run, then come back up.
        await page.evaluate(async () => {
          for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
            scrollTo(0, y);
            await new Promise((done) => setTimeout(done, 120));
          }
          scrollTo(0, 0);
        });
      }
      await page.waitForTimeout(reduced ? 300 : settle);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const dir = join(outDir, slug(path));
      mkdirSync(dir, { recursive: true });
      const name = `${width}${reduced ? "-rm" : ""}${full ? "-full" : ""}`;
      const file = join(dir, `${name}.png`);
      await page.screenshot({ path: file, fullPage: full });
      if (accept && (width === 1920 || width === 390) && !reduced) {
        const keep = join(REPO, "screenshots", slug(path));
        mkdirSync(keep, { recursive: true });
        await sharp(file)
          .webp({ quality: 74 })
          .toFile(join(keep, `${name}.webp`));
      }
      if (overflow > 0) overflowing++;
      console.log(`${slug(path)} ${name}${overflow > 0 ? ` OVERFLOW ${overflow}px` : ""}`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
if (overflowing) console.error(`${overflowing} shot(s) with horizontal overflow`);
