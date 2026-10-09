#!/usr/bin/env node
/**
 * Case-study browser capture: full-page screenshots, clips, axe and an SEO audit for every page of a phase,
 * in both languages. P0 (before) and P8 (after) run this same file with the same settings.
 *
 *   node scripts/capture/browser.mjs --phase before --base http://localhost:3100 --tasks shots,clips,axe,seo
 *   [--out .case-study/before] [--only home,about-us] [--widths 390,1440] [--locales en,fr]
 *
 * Screenshots: every width in pages.mjs, full page at device scale 1 (taller than 16,000 px is shot in
 * segments and stitched), after a slow scroll to the bottom and back so scroll-triggered sections are shown,
 * as a visitor would see them; phones (< 768 px) get a mobile user agent and touch. Plus a viewport shot
 * ("fold", device scale 2 on phones) and reduced-motion shots at 390 and 1440.
 * Language: before = the browser's language (how the old site chose it); after = the locale URL.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import AxeBuilder from "@axe-core/playwright";
import { chromium, devices } from "@playwright/test";
import sharp from "sharp";

import { BROWSER_LOCALE, INTERACTIONS, SHOT_FLAGS, WIDTHS, urlsFor } from "./pages.mjs";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const phase = opt("phase", "before");
const base = opt("base", "http://localhost:3100").replace(/\/$/, "");
const out = resolve(opt("out", `.case-study/${phase}`));
const tasks = opt("tasks", "shots,clips,axe,seo").split(",");
const only = opt("only", null)?.split(",");
const widths = opt("widths", WIDTHS.join(",")).split(",").map(Number);
const locales = opt("locales", "en,fr").split(",");
const targets = urlsFor(phase).filter((t) => locales.includes(t.locale) && (!only || only.includes(t.id)));

const MOBILE_UA = devices["Pixel 7"].userAgent;
const browser = await chromium.launch({ args: SHOT_FLAGS });

function contextOptions(width, locale, extra = {}) {
  const phone = width < 768;
  const height = phone ? 844 : width < 1100 ? 1024 : width < 2000 ? 900 : 1440;
  return {
    viewport: { width, height },
    deviceScaleFactor: 1,
    locale: BROWSER_LOCALE[locale],
    isMobile: phone,
    hasTouch: phone,
    ...(phone ? { userAgent: MOBILE_UA } : {}),
    ...extra,
  };
}

async function open(page, path) {
  const response = await page.goto(base + path, { waitUntil: "load", timeout: 90_000 });
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  return response;
}

/** Scroll down in viewport steps (scroll-triggered sections reveal), then back to the top. */
async function revealByScrolling(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
}

async function fullPageShot(page, file) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const width = page.viewportSize().width;
  const LIMIT = 16_000;
  if (height <= LIMIT) {
    await page.screenshot({ path: file, fullPage: true });
    return height;
  }
  // Chromium paints black past ~16,384 px: shoot segments and stitch them.
  const parts = [];
  for (let y = 0; y < height; y += LIMIT) {
    const h = Math.min(LIMIT, height - y);
    parts.push({ input: await page.screenshot({ fullPage: true, clip: { x: 0, y, width, height: h } }), top: y, left: 0 });
  }
  await sharp({ create: { width, height, channels: 3, background: "#000" } }).composite(parts).png().toFile(file);
  return height;
}

async function shots() {
  const dir = join(out, "screenshots");
  const log = [];
  for (const target of targets) {
    const runs = widths.map((w) => ({ w, reduced: false }));
    for (const w of [390, 1440]) if (widths.includes(w)) runs.push({ w, reduced: true });
    for (const { w, reduced } of runs) {
      const context = await browser.newContext(contextOptions(w, target.locale, { reducedMotion: reduced ? "reduce" : "no-preference" }));
      const page = await context.newPage();
      const response = await open(page, target.path);
      await page.waitForTimeout(reduced ? 500 : 2_500);
      await revealByScrolling(page);
      await page.waitForTimeout(800);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const pageDir = join(dir, target.id, target.locale);
      mkdirSync(pageDir, { recursive: true });
      const name = `${w}${reduced ? "-reduced" : ""}`;
      const height = await fullPageShot(page, join(pageDir, `${name}-full.png`));
      if (!reduced && (w === 390 || w === 1440)) {
        // The first screen as a visitor sees it, crisp on phones.
        const crisp = await browser.newContext(contextOptions(w, target.locale, { deviceScaleFactor: w < 768 ? 2 : 1 }));
        const fold = await crisp.newPage();
        await open(fold, target.path);
        await fold.waitForTimeout(3_000);
        await fold.screenshot({ path: join(pageDir, `${w}-fold.png`) });
        await crisp.close();
      }
      log.push({ id: target.id, locale: target.locale, width: w, reduced, status: response?.status(), height, overflow });
      console.log(`shot ${target.id} ${target.locale} ${name} h=${height}${overflow > 0 ? ` OVERFLOW ${overflow}px` : ""}`);
      await context.close();
    }
  }
  writeFileSync(join(dir, "shots.json"), JSON.stringify(log, null, 2));
}

function toMp4(webm, mp4) {
  try {
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", webm, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-crf", "23", mp4]);
    rmSync(webm);
  } catch {
    renameSync(webm, mp4.replace(/\.mp4$/, ".webm"));
  }
}

async function clip(name, width, locale, action) {
  const dir = join(out, "clips");
  const tmp = join(dir, ".tmp", name);
  mkdirSync(tmp, { recursive: true });
  const options = contextOptions(width, locale);
  const context = await browser.newContext({ ...options, recordVideo: { dir: tmp, size: options.viewport } });
  const page = await context.newPage();
  try {
    await action(page);
  } catch (error) {
    console.error(`clip ${name}: ${error.message.split("\n")[0]}`);
  }
  await context.close();
  const webm = readdirSync(tmp).find((f) => f.endsWith(".webm"));
  if (webm) toMp4(join(tmp, webm), join(dir, `${name}.mp4`));
  rmSync(tmp, { recursive: true, force: true });
  console.log(`clip ${name}`);
}

async function clips() {
  const ui = INTERACTIONS[phase];
  for (const target of targets.filter((t) => t.locale === "en" || phase === "after")) {
    for (const w of [390, 1440]) {
      // The first 5 s of a cold load.
      await clip(`${target.id}-${target.locale}-load-${w}`, w, target.locale, async (page) => {
        await page.goto(base + target.path, { waitUntil: "commit" });
        await page.waitForTimeout(5_000);
      });
      // A scroll through the page at a reading pace.
      await clip(`${target.id}-${target.locale}-scroll-${w}`, w, target.locale, async (page) => {
        await open(page, target.path);
        await page.waitForTimeout(1_500);
        const height = await page.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < height; y += 120) {
          await page.mouse.wheel(0, 120);
          await page.waitForTimeout(90);
        }
        await page.waitForTimeout(1_000);
      });
    }
  }
  const home = targets.find((t) => t.id === "home" && t.locale === "en");
  if (!home) return;
  await clip(`menu-390`, 390, "en", async (page) => {
    await open(page, home.path);
    await page.waitForTimeout(1_500);
    await page.locator(ui.menuButton).first().click();
    await page.waitForTimeout(2_000);
  });
  for (const w of [390, 1440]) {
    await clip(`language-switch-${w}`, w, "en", async (page) => {
      await open(page, home.path);
      await page.waitForTimeout(1_500);
      await ui.switchToFrench(page);
      await page.waitForTimeout(2_500);
    });
  }
}

async function axe() {
  const results = [];
  for (const target of targets) {
    for (const w of [390, 1440]) {
      const context = await browser.newContext(contextOptions(w, target.locale));
      const page = await context.newPage();
      await open(page, target.path);
      await page.waitForTimeout(2_000);
      await revealByScrolling(page);
      const report = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"]).analyze();
      const violations = report.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        tags: v.tags.filter((t) => t.startsWith("wcag")),
        help: v.help,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 5).map((n) => n.target.join(" ")),
      }));
      const wcag = violations.filter((v) => v.tags.length);
      results.push({ id: target.id, locale: target.locale, width: w, violations: violations.length, wcagViolations: wcag.length, nodes: violations.reduce((s, v) => s + v.nodes, 0), rules: violations });
      console.log(`axe ${target.id} ${target.locale} ${w}: ${violations.length} rules (${wcag.length} WCAG), ${results.at(-1).nodes} nodes`);
      await context.close();
    }
  }
  mkdirSync(join(out, "axe"), { recursive: true });
  writeFileSync(join(out, "axe", "axe.json"), JSON.stringify(results, null, 2));
}

/** What a page tells search engines and link previews: the server HTML (no JS) and the rendered DOM. */
function headProbe() {
  const meta = (sel) => document.querySelector(sel)?.getAttribute("content") ?? null;
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({ level: Number(h.tagName[1]), text: h.textContent.trim().replace(/\s+/g, " ").slice(0, 90) }));
  let skipped = 0;
  headings.forEach((h, i) => {
    if (i > 0 && h.level > headings[i - 1].level + 1) skipped++;
  });
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
    try {
      const data = JSON.parse(s.textContent);
      const graph = data["@graph"] ?? [data];
      return { valid: true, types: graph.map((n) => n["@type"]).flat() };
    } catch {
      return { valid: false, types: [] };
    }
  });
  const imgs = [...document.querySelectorAll("img")];
  const links = [...document.querySelectorAll("a[href]")].map((a) => ({ href: a.getAttribute("href"), text: (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 60) }));
  return {
    lang: document.documentElement.getAttribute("lang"),
    title: document.querySelector("title")?.textContent ?? null,
    description: meta('meta[name="description"]'),
    robots: meta('meta[name="robots"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => ({ lang: l.getAttribute("hreflang"), href: l.getAttribute("href") })),
    og: Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map((m) => [m.getAttribute("property"), m.getAttribute("content")])),
    twitter: Object.fromEntries([...document.querySelectorAll('meta[name^="twitter:"]')].map((m) => [m.getAttribute("name"), m.getAttribute("content")])),
    themeColor: meta('meta[name="theme-color"]'),
    icons: [...document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]')].map((l) => ({ rel: l.getAttribute("rel"), href: l.getAttribute("href"), sizes: l.getAttribute("sizes") })),
    h1: headings.filter((h) => h.level === 1).map((h) => h.text),
    headings,
    skippedHeadingLevels: skipped,
    jsonld,
    images: imgs.length,
    imagesWithoutAlt: imgs.filter((i) => !i.hasAttribute("alt")).map((i) => i.getAttribute("src")?.slice(0, 80)),
    imageAlts: imgs.map((i) => i.getAttribute("alt")).filter(Boolean).slice(0, 40),
    links,
    telLinks: links.filter((l) => l.href.startsWith("tel:")).map((l) => l.href),
    iconOnlyLinks: [...document.querySelectorAll("a[href]")].filter((a) => !a.textContent.trim() && !a.getAttribute("aria-label") && !a.querySelector("img[alt]:not([alt=''])")).map((a) => a.getAttribute("href")),
    textLength: document.body?.innerText?.length ?? 0,
  };
}

async function redirectChain(url) {
  const chain = [];
  let current = url;
  for (let i = 0; i < 6; i++) {
    const res = await fetch(current, { redirect: "manual" }).catch((e) => ({ status: `error ${e.message}`, headers: new Headers() }));
    chain.push({ url: current, status: res.status });
    const location = res.headers.get?.("location");
    if (!location || !(res.status >= 300 && res.status < 400)) break;
    current = new URL(location, current).href;
  }
  return chain;
}

async function seo() {
  const pages = [];
  const internal = new Set();
  const external = new Set();
  for (const target of targets) {
    const raw = await browser.newContext({ ...contextOptions(1440, target.locale), javaScriptEnabled: false });
    const rawPage = await raw.newPage();
    const response = await rawPage.goto(base + target.path, { waitUntil: "load", timeout: 90_000 });
    const server = await rawPage.evaluate(headProbe);
    const headers = response?.headers() ?? {};
    await raw.close();
    const context = await browser.newContext(contextOptions(1440, target.locale));
    const page = await context.newPage();
    await open(page, target.path);
    await page.waitForTimeout(2_500);
    const rendered = await page.evaluate(headProbe);
    await context.close();
    for (const { href } of rendered.links) {
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) continue;
      const abs = new URL(href, base + target.path);
      if (abs.origin === new URL(base).origin) internal.add(abs.pathname + abs.search);
      else external.add(abs.href);
    }
    pages.push({ id: target.id, locale: target.locale, path: target.path, status: response?.status(), xRobotsTag: headers["x-robots-tag"] ?? null, server, rendered });
    console.log(`seo ${target.id} ${target.locale}: title=${JSON.stringify(rendered.title)} h1=${rendered.h1.length} jsonld=${rendered.jsonld.length}`);
  }
  const links = [];
  for (const path of internal) {
    const res = await fetch(base + path, { redirect: "manual" }).catch(() => null);
    links.push({ url: path, internal: true, status: res?.status ?? "error" });
  }
  for (const url of external) {
    let res = await fetch(url, { method: "HEAD", redirect: "follow" }).catch(() => null);
    if (!res || res.status >= 400) res = await fetch(url, { redirect: "follow" }).catch(() => null);
    links.push({ url, internal: false, status: res?.status ?? "error" });
  }
  const site = {};
  for (const file of ["/robots.txt", "/sitemap.xml", "/sitemap-index.xml", "/llms.txt", "/manifest.webmanifest", "/site.webmanifest", "/favicon.ico", "/ms32821332.txt"]) {
    const res = await fetch(base + file, { redirect: "follow" }).catch(() => null);
    const text = res ? await res.text() : "";
    site[file] = { status: res?.status ?? "error", type: res?.headers.get("content-type") ?? null, bytes: text.length, sitemapLine: file === "/robots.txt" ? /^sitemap:/im.test(text) : undefined, noindex404: /noindex/.test(text) && res?.status === 404 };
  }
  writeFileSync(join(out, "seo-" + new URL(base).host.replace(/[:.]/g, "_") + ".json"), JSON.stringify({ at: new Date().toISOString(), base, site, pages, links }, null, 2));
}

/** Host and old-URL redirects on the live domain (only meaningful against production). */
async function hosts() {
  const urls = [
    "http://yws.lu/",
    "https://yws.lu/",
    "http://www.yws.lu/",
    "https://www.yws.lu/",
    "https://yws.lu/robots.txt",
    "https://www.yws.lu/robots.txt",
    "https://www.yws.lu/sitemap.xml",
    "https://yws.lu/AboutUs",
    "https://www.yws.lu/AboutUs/",
    "https://www.yws.lu/aboutus",
    "https://www.yws.lu/does-not-exist",
  ];
  const chains = [];
  for (const url of urls) chains.push({ url, chain: await redirectChain(url) });
  writeFileSync(join(out, "hosts.json"), JSON.stringify({ at: new Date().toISOString(), chains }, null, 2));
  for (const c of chains) console.log(`host ${c.url} → ${c.chain.map((s) => s.status).join(" → ")}`);
}

mkdirSync(out, { recursive: true });
try {
  if (tasks.includes("seo")) await seo();
  if (tasks.includes("hosts")) await hosts();
  if (tasks.includes("axe")) await axe();
  if (tasks.includes("shots")) await shots();
  if (tasks.includes("clips")) await clips();
} finally {
  await browser.close();
}
if (existsSync(join(out, "clips", ".tmp"))) rmSync(join(out, "clips", ".tmp"), { recursive: true, force: true });
