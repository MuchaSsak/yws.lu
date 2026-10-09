#!/usr/bin/env node
/**
 * Share images, one per page × locale (wiki: site/seo.md § Link previews). Reads every built page in dist/ (run after
 * `bun run build`), takes its og:image path, title, description and language, and renders a 1200×630 PNG card with
 * Playwright in the site's look: warm white with the orange and violet glow, the page title big in Montserrat, the
 * description, and the logo on an orange tile with the host. PNG, not WebP: LinkedIn and some chat apps don't preview
 * WebP. Writes public/og/<name>.png + public/og/manifest.json (committed) and copies them into dist/og/.
 *
 *   bun run build; bun run og; bun run build   (the second build passes the launch gate's share-image check)
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

import { chromium } from "@playwright/test";
import sharp from "sharp";

import { cardOf, ogHash, OG_TEMPLATE } from "./og-manifest.mjs";
import { DIST, ROOT } from "./routes.mjs";

const PUBLIC_OG = join(ROOT, "public", "og");
const force = process.argv.includes("--force");
if (!existsSync(join(DIST, "en", "index.html"))) throw new Error("dist/ is missing: run `bun run build` first");

function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* pages(path);
    else if (name.endsWith(".html")) yield path;
  }
}

const cards = new Map();
for (const file of pages(DIST)) {
  const card = cardOf(readFileSync(file, "utf8"));
  if (card && !cards.has(card.path)) cards.set(card.path, card);
}

const require = createRequire(import.meta.url);
const font = readFileSync(require.resolve("@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2")).toString(
  "base64",
);
const logo = readFileSync(join(ROOT, "public", "logo.png")).toString("base64");
const escape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const html = ({ title, description, lang }) => `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face { font-family: M; src: url(data:font/woff2;base64,${font}) format("woff2"); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: M, sans-serif; color: #18181b; background: #fffaf5; position: relative; }
.glow { position: absolute; border-radius: 50%; filter: blur(80px); }
.g1 { width: 620px; height: 620px; right: -160px; top: -260px; background: #ff8a3d; opacity: .55; }
.g2 { width: 520px; height: 520px; right: 120px; bottom: -330px; background: #b96ff9; opacity: .45; }
.g3 { width: 420px; height: 420px; left: -220px; bottom: -240px; background: #ffd230; opacity: .35; }
.card { position: absolute; inset: 0; padding: 64px 72px 56px; display: flex; flex-direction: column; }
h1 { font-weight: 800; font-size: 76px; line-height: 1.04; letter-spacing: -0.02em; max-width: 960px; text-wrap: balance; }
p { margin-top: 26px; font-size: 29px; line-height: 1.35; font-weight: 500; color: #3f3f46; max-width: 900px;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.foot { margin-top: auto; display: flex; align-items: center; gap: 22px; }
.tile { width: 132px; height: 88px; border-radius: 18px; background: #ff6900; display: grid; place-items: center; }
.tile img { width: 108px; }
.host { font-size: 30px; font-weight: 700; }
.org { font-size: 22px; font-weight: 500; color: #52525b; }
.bar { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: linear-gradient(90deg, #fd9a00, #f54a00, #efb100); }
</style></head><body>
<div class="glow g1"></div><div class="glow g2"></div><div class="glow g3"></div>
<div class="card">
  <h1>${escape(title)}</h1>
  <p>${escape(description)}</p>
  <div class="foot"><div class="tile"><img src="data:image/png;base64,${logo}" alt=""></div>
    <div><div class="host">yws.lu</div><div class="org">Youth Work Synergy ASBL · Luxembourg</div></div></div>
</div><div class="bar"></div></body></html>`;

mkdirSync(PUBLIC_OG, { recursive: true });
const manifestPath = join(PUBLIC_OG, "manifest.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const browser = await chromium.launch();
let drawn = 0;
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const card of cards.values()) {
    const name = card.path.replace(/^\/og\//, "");
    const hash = ogHash(card);
    const out = join(PUBLIC_OG, name);
    if (!force && manifest[name]?.hash === hash && existsSync(out)) continue;
    // The card shows the page part of "Page | Youth Work Synergy" (the site name is on the tile).
    const title = card.title.replace(/\s+\|\s+Youth Work Synergy$/, "");
    await page.setContent(html({ ...card, title }), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({ type: "png" });
    await sharp(png).png({ compressionLevel: 9, palette: true, quality: 92, effort: 8 }).toFile(out);
    manifest[name] = { hash, title: card.title, lang: card.lang, template: OG_TEMPLATE };
    drawn++;
  }
} finally {
  await browser.close();
}
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
mkdirSync(join(DIST, "og"), { recursive: true });
for (const name of readdirSync(PUBLIC_OG)) copyFileSync(join(PUBLIC_OG, name), join(DIST, "og", name));
console.log(`og: ${cards.size} card(s), ${drawn} drawn, ${cards.size - drawn} unchanged`);
