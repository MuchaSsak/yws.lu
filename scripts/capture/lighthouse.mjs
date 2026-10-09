#!/usr/bin/env node
/**
 * Case-study Lighthouse capture: every page of a phase, mobile + desktop, N runs each (default 3).
 * Keeps the median run's full JSON, its load filmstrip (screenshot-thumbnails) and final screenshot, and
 * writes summary.json with the median of every metric. P0 (before) and P8 (after) run this same file.
 *
 *   node scripts/capture/lighthouse.mjs --phase before --base http://localhost:3100 --out .case-study/before/lighthouse-local
 *   node scripts/capture/lighthouse.mjs --phase after  --base http://localhost:4322 --out .case-study/after/lighthouse-local
 *   [--runs 3] [--only home,about-us] [--locales en] [--modes mobile,desktop]
 *
 * Settings: Lighthouse defaults (mobile: simulated Moto G Power + slow 4G; desktop: the desktop preset),
 * Chromium from Playwright, headless=new, SwiftShader WebGL so the 3D scenes really render.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

import { CHROME_FLAGS, urlsFor } from "./pages.mjs";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const phase = opt("phase", "before");
const base = opt("base", "http://localhost:3100").replace(/\/$/, "");
const out = resolve(opt("out", `.case-study/${phase}/lighthouse-local`));
const runs = Number(opt("runs", "3"));
const only = opt("only", null)?.split(",");
const modes = opt("modes", "mobile,desktop").split(",");
// Before the revamp both languages share one URL, so Lighthouse runs once per page (en); after, per locale.
const locales = opt("locales", phase === "before" ? "en" : "en,fr").split(",");

const targets = urlsFor(phase).filter((t) => locales.includes(t.locale) && (!only || only.includes(t.id)));
mkdirSync(out, { recursive: true });

const launch = () =>
  chromeLauncher.launch({
    chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
    chromeFlags: ["--headless=new", "--no-sandbox", ...CHROME_FLAGS],
  });
// A page whose WebGL never settles under SwiftShader can hang Lighthouse for good (the 2025 Jobs page did): each run
// gets a hard limit, and a hung run is recorded as such, with a fresh Chrome for the next one.
const RUN_LIMIT_MS = Number(opt("run-limit", "240000"));
let chrome = await launch();

function metrics(lhr) {
  const a = lhr.audits;
  const summary = Object.fromEntries((a["resource-summary"]?.details?.items ?? []).map((i) => [i.resourceType, i]));
  const kb = (type) => Math.round((summary[type]?.transferSize ?? 0) / 1024);
  return {
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    "best-practices": Math.round(lhr.categories["best-practices"].score * 100),
    seo: Math.round(lhr.categories.seo.score * 100),
    fcp: Math.round(a["first-contentful-paint"].numericValue),
    lcp: Math.round(a["largest-contentful-paint"].numericValue),
    cls: Number((a["cumulative-layout-shift"].numericValue ?? 0).toFixed(3)),
    tbt: Math.round(a["total-blocking-time"].numericValue),
    si: Math.round(a["speed-index"].numericValue),
    tti: Math.round(a.interactive?.numericValue ?? 0),
    totalKB: Math.round(a["total-byte-weight"].numericValue / 1024),
    requests: summary.total?.requestCount ?? a["network-requests"]?.details?.items?.length ?? 0,
    jsKB: kb("script"),
    imageKB: kb("image"),
    fontKB: kb("font"),
    cssKB: kb("stylesheet"),
    docKB: kb("document"),
    otherKB: kb("other") + kb("media"),
    lcpElement: a["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node?.snippet ?? null,
  };
}

const median = (values) => {
  const sorted = [...values].sort((x, y) => x - y);
  return sorted[Math.floor(sorted.length / 2)];
};

// Rows from earlier invocations survive a partial rerun (`--only`): same page + locale + mode is replaced.
const summaryPath = join(out, "summary.json");
const previous = existsSync(summaryPath) ? JSON.parse(readFileSync(summaryPath, "utf8")).rows ?? [] : [];
const rows = [];
const allRows = () => [
  ...previous.filter((p) => !rows.some((r) => r.id === p.id && r.locale === p.locale && r.mode === p.mode)),
  ...rows,
];
const failures = [];
try {
  for (const target of targets) {
    for (const mode of modes) {
      const url = base + target.path;
      const settings = { output: "json", logLevel: "error", locale: target.locale };
      const config =
        mode === "desktop"
          ? { ...desktopConfig, settings: { ...desktopConfig.settings, ...settings } }
          : { extends: "lighthouse:default", settings };
      const results = [];
      for (let i = 0; i < runs; i++) {
        let timer;
        const result = await Promise.race([
          // A killed Chrome makes the abandoned run reject later: swallow it, the timeout already recorded it.
          lighthouse(url, { port: chrome.port, ...settings }, config).catch((error) => {
            console.error(`${target.id} ${mode} run ${i + 1}: ${error.message}`);
            return null;
          }),
          new Promise((resolve) => (timer = setTimeout(() => resolve(null), RUN_LIMIT_MS))),
        ]);
        clearTimeout(timer);
        if (!result) {
          console.error(`${target.id} ${target.locale} ${mode} run ${i + 1}: no result after ${RUN_LIMIT_MS / 1000} s (hung)`);
          failures.push({ id: target.id, locale: target.locale, mode, run: i + 1, reason: `hung > ${RUN_LIMIT_MS / 1000} s` });
          await chrome.kill();
          chrome = await launch();
          continue;
        }
        if (result.lhr.runtimeError) console.error(`${url} ${mode}: ${result.lhr.runtimeError.code}`);
        results.push({ lhr: result.lhr, m: metrics(result.lhr) });
        console.log(`${target.id} ${target.locale} ${mode} run ${i + 1}: perf ${results.at(-1).m.performance} lcp ${results.at(-1).m.lcp}`);
      }
      if (!results.length) continue;
      // The kept run is the one whose performance score is the median (ties: the median LCP among them).
      const perfMedian = median(results.map((r) => r.m.performance));
      const kept = results
        .filter((r) => r.m.performance === perfMedian)
        .sort((x, y) => x.m.lcp - y.m.lcp)[Math.floor(results.filter((r) => r.m.performance === perfMedian).length / 2)];
      const numeric = Object.keys(kept.m).filter((k) => typeof kept.m[k] === "number");
      const med = Object.fromEntries(numeric.map((k) => [k, median(results.map((r) => r.m[k]))]));
      const name = `${target.id}-${target.locale}-${mode}`;
      writeFileSync(join(out, `${name}.report.json`), JSON.stringify(kept.lhr));
      const thumbs = kept.lhr.audits["screenshot-thumbnails"]?.details?.items ?? [];
      const stripDir = join(out, `${name}-filmstrip`);
      mkdirSync(stripDir, { recursive: true });
      thumbs.forEach((item, index) => {
        const data = item.data.replace(/^data:image\/\w+;base64,/, "");
        writeFileSync(join(stripDir, `${String(index).padStart(2, "0")}-${Math.round(item.timing)}ms.jpg`), Buffer.from(data, "base64"));
      });
      const final = kept.lhr.audits["final-screenshot"]?.details?.data;
      if (final) writeFileSync(join(out, `${name}-final.jpg`), Buffer.from(final.replace(/^data:image\/\w+;base64,/, ""), "base64"));
      rows.push({ id: target.id, locale: target.locale, mode, url, runs: results.length, median: med, kept: kept.m, all: results.map((r) => r.m) });
      writeFileSync(summaryPath, JSON.stringify({ at: new Date().toISOString(), phase, base, runs, lighthouse: kept.lhr.lighthouseVersion, rows: allRows(), failures }, null, 2));
    }
  }
} finally {
  await chrome.kill();
}

console.log("\npage".padEnd(32), "mode    perf a11y bp  seo   lcp    cls   tbt    si    KB  req  jsKB");
for (const r of allRows()) {
  const m = r.median;
  console.log(
    `${r.id}-${r.locale}`.padEnd(31),
    r.mode.padEnd(7),
    String(m.performance).padStart(4),
    String(m.accessibility).padStart(4),
    String(m["best-practices"]).padStart(3),
    String(m.seo).padStart(4),
    `${m.lcp}`.padStart(6),
    String(m.cls).padStart(6),
    `${m.tbt}`.padStart(5),
    `${m.si}`.padStart(6),
    String(m.totalKB).padStart(5),
    String(m.requests).padStart(4),
    String(m.jsKB).padStart(5),
  );
}
