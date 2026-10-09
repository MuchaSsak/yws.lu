#!/usr/bin/env node
/**
 * Pre-renders the site's soft colour background (the 2025 BodyBackground's seven radial gradients under
 * `blur(6.25rem) saturate(150%)`) once, in Chromium, into `public/bg/aurora-{mobile,desktop}.webp`. The page then shows
 * a static image instead of a live 100 px blur on a fixed full-screen layer (wiki: design/design.md § Backgrounds).
 *
 *   node scripts/background.mjs
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "bg");
mkdirSync(OUT, { recursive: true });

// The exact 2025 declaration (components/layout/BodyBackground.tsx), opacity applied by the page, not baked in.
const GRADIENTS = [
  "radial-gradient(at 27% 37%, hsla(215,98%,61%,1) 0px, transparent 0%)",
  "radial-gradient(at 97% 21%, hsla(125,98%,72%,1) 0px, transparent 50%)",
  "radial-gradient(at 52% 99%, hsla(354,98%,61%,1) 0px, transparent 50%)",
  "radial-gradient(at 10% 29%, hsla(256,96%,67%,1) 0px, transparent 50%)",
  "radial-gradient(at 97% 96%, hsla(38,60%,74%,1) 0px, transparent 50%)",
  "radial-gradient(at 33% 50%, hsla(222,67%,73%,1) 0px, transparent 50%)",
  "radial-gradient(at 79% 53%, hsla(343,68%,79%,1) 0px, transparent 50%)",
].join(",");

// The layer's box: full width below xl (1280), half width at xl and up; full viewport height.
const SIZES = [
  { name: "mobile", width: 430, height: 932 },
  { name: "desktop", width: 960, height: 1080 },
];

const browser = await chromium.launch();
for (const { name, width, height } of SIZES) {
  // A margin around the box so the blur has the same transparent surroundings it has on the page.
  const margin = 200;
  const page = await browser.newPage({ viewport: { width: width + margin * 2, height: height + margin * 2 } });
  await page.setContent(
    `<html><body style="margin:0;background:transparent"><div style="position:absolute;left:${margin}px;top:${margin}px;width:${width}px;height:${height}px;background:${GRADIENTS};filter:blur(6.25rem) saturate(1.5)"></div></body></html>`,
  );
  // Keep the margin: the blur spreads past the box on the page too (BodyBackground.astro insets the image by it).
  const png = await page.screenshot({ omitBackground: true });
  await sharp(png)
    .webp({ quality: 70, alphaQuality: 70, effort: 6 })
    .toFile(join(OUT, `aurora-${name}.webp`));
  console.log(
    `bg/aurora-${name}.webp: box ${width}x${height}, margin ${margin}px (inset ${((margin / width) * 100).toFixed(1)}% / ${((margin / height) * 100).toFixed(1)}%)`,
  );
  await page.close();
}
await browser.close();
