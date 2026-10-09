#!/usr/bin/env node
/**
 * One-off: brings the We Spark project images into the image pipeline (wiki: design/assets.md, tech/conventions.md
 * § Images). The 25–30 MB camera originals in ../public/images/projects/ never ship: each photo is turned upright from
 * its EXIF orientation, scaled to at most 2560 px on its long side and re-encoded as JPEG (EXIF, including the camera
 * and Artist tags, dropped: Q39); Astro then makes the AVIF/WebP sizes. Logos and the Safe Paths posters are copied
 * byte for byte.
 *
 *   node scripts/project-photos.mjs
 */
import { copyFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import sharp from "sharp";

import { ROOT } from "./routes.mjs";

const FROM = join(ROOT, "..", "public", "images", "projects");
const TO = join(ROOT, "src", "assets", "projects");
mkdirSync(TO, { recursive: true });

for (const slug of ["get-your-home", "locked-out"]) {
  mkdirSync(join(TO, slug), { recursive: true });
  for (const name of readdirSync(join(FROM, slug))
    .filter((file) => /\.jpe?g$/i.test(file))
    .sort()) {
    const target = join(TO, slug, `${slug}-${name.replace(/\.jpe?g$/i, "")}.jpg`);
    const info = await sharp(join(FROM, slug, name))
      .rotate()
      .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(target);
    const before = statSync(join(FROM, slug, name)).size;
    console.log(
      `${slug}/${name}: ${(before / 1e6).toFixed(1)} MB → ${info.width}×${info.height}, ${(info.size / 1e3).toFixed(0)} KB`,
    );
  }
}
for (const [from, to] of [
  ["get_your_home_logo.png", "get-your-home-logo.png"],
  ["locked_out_logo.png", "locked-out-logo.png"],
  ["safe-paths/image_en.jpg", "safe-paths-poster-en.jpg"],
  ["safe-paths/image_fr.jpg", "safe-paths-poster-fr.jpg"],
]) {
  copyFileSync(join(FROM, from), join(TO, to));
  console.log(`${from} → ${to} (copied)`);
}
