#!/usr/bin/env node
/**
 * Writes `public/favicon.ico` (16 + 32 px, PNG frames) and `public/favicon.png` (32 px) from the client's favicon,
 * `src/assets/brand/favicon-32.png` (wiki: site/seo.md § Favicons, design/assets.md). Never upscaled: the only
 * original is 32×32, so the ≥ 48 px icon Google wants, the apple-touch-icon and a web manifest wait for a larger
 * master (Q33). The 2025 `app/favicon.ico` is the Next.js default (a triangle), not YWS's icon: never used.
 *
 *   node scripts/favicons.mjs
 */
import { copyFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import sharp from "sharp";

import { ROOT } from "./routes.mjs";

const SOURCE = join(ROOT, "src", "assets", "brand", "favicon-32.png");
const { width, height } = await sharp(SOURCE).metadata();
if (width !== 32 || height !== 32) throw new Error(`favicon source must be 32×32, got ${width}×${height}`);

const frames = await Promise.all(
  [16, 32].map(async (size) => ({
    size,
    png: await sharp(SOURCE).resize(size, size, { kernel: "lanczos3" }).png({ compressionLevel: 9 }).toBuffer(),
  })),
);

// ICO: a 6-byte header, a 16-byte entry per frame, then the PNG data (PNG frames: every browser since IE 9).
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = 6 + 16 * frames.length;
const entries = frames.map(({ size, png }) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});
writeFileSync(join(ROOT, "public", "favicon.ico"), Buffer.concat([header, ...entries, ...frames.map((f) => f.png)]));
copyFileSync(SOURCE, join(ROOT, "public", "favicon.png"));
console.log(`favicons: favicon.ico (${frames.map((f) => f.size).join(", ")} px), favicon.png (32 px)`);
