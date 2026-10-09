#!/usr/bin/env node
/**
 * The SEO / launch gate, run by `bun run build` after `astro build` (wiki: site/seo.md § Launch gate, placeholders.md).
 *
 * Every build fails on: a broken internal link, asset or #anchor; a page without a title, description or canonical; a
 * title or description over its hard cap; more than one H1; more than one origin across canonicals, hreflang, og:url
 * and the sitemap; hreflang that isn't reciprocal; JSON-LD that doesn't parse; a share image or its alt missing; a
 * new-tab link that doesn't say so; a raster image that isn't WebP/AVIF (favicons and share images aside); any <form>
 * (no forms, ever [user 2026-10-09]).
 * The 404 and the review-only design specimen have no canonical, hreflang or share card by design.
 * A launch build (scripts/launch.mjs) also fails on any PLACEHOLDER marker, on wrong robots values and on a review-only
 * page in the output.
 *
 *   node scripts/launch-gate.mjs [--launch]
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { isLaunchBuild } from "./launch.mjs";
import { cardOf, ogHash } from "./og-manifest.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
if (!existsSync(join(DIST, "en", "index.html"))) {
  console.error("launch-gate: dist/en/index.html is missing (run astro build first)");
  process.exit(1);
}

const TITLE_MAX = 65; // target ≤ 60 (warned), hard cap 65
const DESCRIPTION_MAX = 160; // target ≤ 155 (warned), hard cap 160
/** Pages kept out of the index on purpose (site/seo.md § Crawl): legal pages, the 404s, the root safety net. */
const NOINDEX =
  /^(index\.html|404\.html|(en|fr)\/404\/index\.html|(en|fr)\/(privacy-policy|politique-de-confidentialite|legal-notice|mentions-legales)\/index\.html)$/;
/** Pages built only in review builds (design/design.md § Specimen): never in a launch build. */
const REVIEW_ONLY = /^(en|fr)\/specimen\/index\.html$/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}
const pages = [...walk(DIST)].filter((file) => file.endsWith(".html"));
const name = (file) => relative(DIST, file).replaceAll("\\", "/");
const html = new Map(pages.map((file) => [file, readFileSync(file, "utf8")]));
const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');

const errors = [];
const warnings = [];
const ogManifestPath = join(ROOT, "public", "og", "manifest.json");
const ogManifest = existsSync(ogManifestPath) ? JSON.parse(readFileSync(ogManifestPath, "utf8")) : {};

// 1. Links, assets and anchors resolve to a file in dist/ (and the id on that page).
const ids = new Map();
const idsOf = (file) => {
  if (!ids.has(file)) ids.set(file, new Set([...readFileSync(file, "utf8").matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  return ids.get(file);
};
const target = (path) => {
  const file = join(DIST, decodeURIComponent(path));
  if (path.endsWith("/")) return existsSync(join(file, "index.html")) ? join(file, "index.html") : null;
  return existsSync(file) && statSync(file).isFile() ? file : null;
};
for (const [file, source] of html) {
  const body = source.replace(/<script[\s\S]*?<\/script>/g, "");
  for (const [, url] of body.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (!/^[/#]/.test(url) || url.startsWith("//")) continue;
    const [rest, hash = ""] = url.split("#");
    const path = (rest ?? "").split("?")[0];
    // A bare `#id` points into this very file (404.html is not its folder's index.html).
    const found = path ? target(path) : file;
    if (!found) errors.push(`${name(file)}: ${url} (no file)`);
    else if (hash && found.endsWith(".html") && !idsOf(found).has(decodeURIComponent(hash)))
      errors.push(`${name(file)}: ${url} (no #${hash})`);
  }
}

// 2. Head and content signals per page.
const origins = new Set();
const robotsOf = new Map();
const alternatesOf = new Map();
for (const [file, source] of html) {
  const page = name(file);
  const stub = page === "index.html";
  const notFound = /(^|\/)404(\/index)?\.html$/.test(page);
  const uncrawled = notFound || REVIEW_ONLY.test(page);
  robotsOf.set(page, /<meta name="robots" content="([^"]+)"/.exec(source)?.[1] ?? "");
  const title = decode(/<title>([^<]*)<\/title>/.exec(source)?.[1] ?? "");
  if (!title) errors.push(`${page}: no <title>`);
  else if (title.length > TITLE_MAX) errors.push(`${page}: title ${title.length} chars (cap ${TITLE_MAX}): "${title}"`);
  else if (title.length > 60) warnings.push(`${page}: title ${title.length} chars (target 60)`);
  if (stub) continue;
  const description = decode(/<meta name="description" content="([^"]*)"/.exec(source)?.[1] ?? "");
  if (description.length < 50) errors.push(`${page}: description missing or under 50 chars`);
  else if (description.length > DESCRIPTION_MAX)
    errors.push(`${page}: description ${description.length} chars (cap ${DESCRIPTION_MAX})`);
  else if (description.length > 155) warnings.push(`${page}: description ${description.length} chars (target 155)`);
  const h1s = (source.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) errors.push(`${page}: ${h1s} <h1> (exactly one)`);
  if (/<form[\s>]/i.test(source)) errors.push(`${page}: has a <form> (no forms, ever)`);
  if (!uncrawled) {
    const canonical = /<link rel="canonical" href="([^"]+)"/.exec(source)?.[1];
    if (!canonical) errors.push(`${page}: no canonical`);
    const alternates = [...source.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(([, lang, href]) => ({
      lang,
      href,
    }));
    if (!alternates.some((a) => a.lang === "x-default")) errors.push(`${page}: no hreflang x-default`);
    if (canonical && !alternates.some((a) => a.href === canonical))
      errors.push(`${page}: hreflang doesn't include the page itself`);
    alternatesOf.set(canonical, alternates);
  }
  for (const [, url] of source.matchAll(
    /<(?:link rel="(?:canonical|alternate)"[^>]*?|meta property="og:url"[^>]*?) (?:href|content)="(https?:\/\/[^"]+)"/g,
  ))
    origins.add(new URL(url).origin);
  const image = /<meta property="og:image" content="([^"]+)"/.exec(source)?.[1];
  if (!image) {
    if (!uncrawled) errors.push(`${page}: no og:image`);
  } else if (!existsSync(join(DIST, new URL(image).pathname)))
    errors.push(`${page}: share image ${new URL(image).pathname} not built (bun run og)`);
  if (image && !/<meta property="og:image:alt" content="[^"]{5,}"/.test(source)) errors.push(`${page}: no og:image:alt`);
  const card = cardOf(source);
  if (card && ogManifest[card.path.replace(/^\/og\//, "")]?.hash !== ogHash(card))
    errors.push(`${page}: share image ${card.path} is stale or missing (bun run og)`);
  for (const [, json] of source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json);
      if (!data["@context"]) errors.push(`${page}: JSON-LD without @context`);
    } catch {
      errors.push(`${page}: JSON-LD does not parse`);
    }
  }
  for (const [tag, body] of source.matchAll(/<a\b[^>]*target="_blank"[^>]*>([\s\S]*?)<\/a>/g))
    if (!/class="sr-only"/.test(body ?? ""))
      errors.push(`${page}: ${/href="([^"]+)"/.exec(tag)?.[1]} opens a new tab without saying so`);
  for (const [, value] of source.matchAll(/<(?:img|source)\b[^>]*?\s(?:src|srcset)="([^"]+)"/g))
    for (const url of value.split(",").map((part) => part.trim().split(/\s+/)[0] ?? ""))
      if (/\.(png|jpe?g|gif)(\?|$)/i.test(url) && !/\/(og|icons)\//.test(url)) errors.push(`${page}: ${url} is not WebP/AVIF`);
}

// 3. Reciprocal hreflang: every alternate of a page lists that page back.
for (const [canonical, alternates] of alternatesOf) {
  for (const { lang, href } of alternates) {
    if (lang === "x-default" || href === canonical) continue;
    const back = alternatesOf.get(href);
    if (!back) errors.push(`${canonical}: hreflang ${lang} → ${href} is not a built page`);
    else if (!back.some((a) => a.href === canonical)) errors.push(`${href} doesn't link back to ${canonical}`);
  }
}

// 4. Crawl files.
const robotsTxt = join(DIST, "robots.txt");
if (!existsSync(robotsTxt) || !/^Sitemap: https?:\/\//m.test(readFileSync(robotsTxt, "utf8")))
  errors.push("robots.txt missing or without a Sitemap line");
const sitemaps = readdirSync(DIST).filter((file) => /^sitemap.*\.xml$/.test(file));
if (!sitemaps.includes("sitemap-index.xml")) errors.push("sitemap-index.xml missing");
for (const map of sitemaps)
  for (const [, url] of readFileSync(join(DIST, map), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) origins.add(new URL(url).origin);
if (origins.size > 1)
  errors.push(`more than one origin across canonicals, hreflang, og:url and the sitemap: ${[...origins].join(", ")}`);

// 5. Launch only: placeholders and robots.
const launch = isLaunchBuild();
const markers = [];
for (const dir of ["src", "public"]) {
  for (const file of walk(join(ROOT, dir))) {
    if (!/\.(astro|tsx?|mjs|json|po|md|css|txt|svg|html)$/.test(file) || /\.test\.ts$/.test(file)) continue;
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, index) => {
        if (/PLACEHOLDER/.test(line))
          markers.push(`${relative(ROOT, file).replaceAll("\\", "/")}:${index + 1}: ${line.trim().slice(0, 110)}`);
      });
  }
}
if (launch) {
  errors.push(...markers.map((m) => `placeholder in a launch build: ${m}`));
  for (const [page, robots] of robotsOf) {
    if (REVIEW_ONLY.test(page)) errors.push(`${page}: review-only page in a launch build`);
    const hidden = NOINDEX.test(page);
    if (!hidden && !robots.startsWith("index")) errors.push(`${page}: robots "${robots}" in a launch build`);
    if (hidden && !robots.startsWith("noindex")) errors.push(`${page}: should be noindex`);
  }
} else if (robotsOf.get("en/index.html")?.startsWith("index")) {
  errors.push("en/index.html is indexable in a review build (review builds are noindex)");
}

for (const line of warnings.slice(0, 20)) console.log(`launch-gate: warning: ${line}`);
if (errors.length) {
  console.error(`launch-gate: ${errors.length} problem(s):\n  ${errors.slice(0, 60).join("\n  ")}`);
  process.exit(1);
}
console.log(
  launch
    ? `launch-gate: clean, launch build allowed (${pages.length} pages)`
    : `launch-gate: review build (noindex), ${pages.length} pages clean. ${markers.length} placeholder marker(s) left for launch.`,
);
