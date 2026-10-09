#!/usr/bin/env node
/**
 * The Lighthouse gate (`bun run lhci`; wiki: lighthouse-qa skill, product/requirements.md § Non-functional): every
 * built route (or the paths given), mobile median of --runs (default 3) + desktop median, checked against the
 * budgets; exits 1 on a miss. Runs against the Vercel-like server (scripts/serve.mjs) on 4322, reusing it when up.
 * Review builds are noindex, so SEO is scored without `is-crawlable` (the launch gate checks production robots).
 * WebGL through SwiftShader, so the 3D scenes really render (same flags as the case-study capture). No full-page
 * screenshot (a report image, never scored): on the long projects page it timed out the DevTools protocol. Rows print
 * as they finish; a run that errors is a hard miss, and the sweep goes on.
 *
 *   bun run build && bun run lhci [-- --runs 3 --mobile-only --base http://localhost:4322 /en/ /fr/]
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

import { answers, builtRoutes, ROOT } from "./routes.mjs";

const argv = process.argv.slice(2);
const value = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const runs = Number(value("runs", "3"));
const modes = argv.includes("--mobile-only") ? ["mobile"] : ["mobile", "desktop"];
const valued = new Set(["--runs", "--base"]);
const paths = argv.filter((arg, index) => !arg.startsWith("--") && !valued.has(argv[index - 1]));
const PAGES = paths.length ? paths : builtRoutes();
const PORT = 4322;
let base = value("base", null);

/** Targets (`requirements.md`): perf 95 (floor 90, the only plateau allowed), the rest 100; LCP/TBT targets. */
const BUDGET = { performance: 95, accessibility: 100, "best-practices": 100, seo: 100, lcp: 2000, cls: 0.05, tbt: 100 };
const FLOOR = { performance: 90, lcp: 2500, tbt: 200 };

let server = null;
if (!base && (await answers(`http://localhost:${PORT}`))) base = `http://localhost:${PORT}`;
if (!base) {
  base = `http://localhost:${PORT}`;
  server = spawn(process.execPath, [join(ROOT, "scripts", "serve.mjs"), "--port", String(PORT)], { cwd: ROOT, stdio: "ignore" });
  let up = false;
  for (let i = 0; i < 60 && !up; i++) {
    up = await answers(base);
    if (!up) await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!up) {
    server.kill();
    throw new Error(`scripts/serve.mjs did not answer on ${base}`);
  }
}

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
  chromeFlags: [
    "--headless=new",
    "--no-sandbox",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
  ],
});

async function audit(url, mode, locale) {
  const settings = { skipAudits: ["is-crawlable"], disableFullPageScreenshot: true, output: "json", logLevel: "error", locale };
  const config =
    mode === "desktop"
      ? { ...desktopConfig, settings: { ...desktopConfig.settings, ...settings } }
      : { extends: "lighthouse:default", settings };
  const result = await lighthouse(url, { port: chrome.port, ...settings }, config);
  const { categories, audits, runtimeError } = result.lhr;
  if (argv.includes("--save")) {
    mkdirSync(join(ROOT, "lighthouse"), { recursive: true });
    writeFileSync(
      join(ROOT, "lighthouse", `${new URL(url).pathname.replace(/\//g, "_")}-${mode}.json`),
      JSON.stringify(result.lhr),
    );
  }
  if (runtimeError) throw new Error(`${url}: ${runtimeError.code} ${runtimeError.message}`);
  const summary = Object.fromEntries((audits["resource-summary"]?.details?.items ?? []).map((i) => [i.resourceType, i]));
  return {
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    "best-practices": Math.round(categories["best-practices"].score * 100),
    seo: Math.round(categories.seo.score * 100),
    fcp: Math.round(audits["first-contentful-paint"].numericValue),
    lcp: Math.round(audits["largest-contentful-paint"].numericValue),
    cls: Number((audits["cumulative-layout-shift"].numericValue ?? 0).toFixed(3)),
    tbt: Math.round(audits["total-blocking-time"].numericValue),
    kb: Math.round(audits["total-byte-weight"].numericValue / 1024),
    jsKB: Math.round((summary.script?.transferSize ?? 0) / 1024),
  };
}

const median = (list, key) => {
  const sorted = list.map((item) => item[key]).sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

const rows = [];
const misses = [];
const belowFloor = [];
const HEADER = ["page".padEnd(34), "mode    perf a11y bp  seo    fcp    lcp    cls    tbt    KB  jsKB"];
const print = (row) =>
  console.log(
    row.path.padEnd(34),
    row.mode.padEnd(7),
    String(row.performance).padStart(4),
    String(row.accessibility).padStart(4),
    String(row["best-practices"]).padStart(3),
    String(row.seo).padStart(4),
    `${row.fcp}`.padStart(6),
    `${row.lcp}`.padStart(6),
    String(row.cls).padStart(6),
    `${row.tbt}`.padStart(6),
    String(row.kb).padStart(5),
    String(row.jsKB).padStart(5),
  );
console.log(...HEADER);
try {
  for (const path of PAGES) {
    const locale = path.split("/")[1] === "fr" ? "fr" : "en";
    for (const mode of modes) {
      const list = [];
      try {
        for (let i = 0; i < runs; i++) list.push(await audit(base + path, mode, locale));
      } catch (error) {
        belowFloor.push(`${path} ${mode} run error: ${error.message}`);
        console.error(`${path} ${mode}: run error (${error.message})`);
        continue;
      }
      const row = Object.fromEntries(Object.keys(list[0]).map((key) => [key, median(list, key)]));
      rows.push({ path, mode, ...row });
      print(rows.at(-1));
      for (const [key, bar] of Object.entries(BUDGET)) {
        const lower = ["lcp", "cls", "tbt"].includes(key);
        if (lower ? row[key] > bar : row[key] < bar) misses.push(`${path} ${mode} ${key} ${row[key]} (target ${bar})`);
        const floor = FLOOR[key];
        if (floor !== undefined && (lower ? row[key] > floor : row[key] < floor))
          belowFloor.push(`${path} ${mode} ${key} ${row[key]} (floor ${floor})`);
      }
    }
  }
} finally {
  await chrome.kill();
  if (server) server.kill();
}

mkdirSync(join(ROOT, "lighthouse"), { recursive: true });
writeFileSync(
  join(ROOT, "lighthouse", "summary.json"),
  JSON.stringify({ at: new Date().toISOString(), runs, rows, misses, belowFloor }, null, 2),
);
if (misses.length) console.error(`\n${misses.length} target miss(es):\n  ${misses.join("\n  ")}`);
// Performance may plateau between floor and target (record the reason in memory/slice-costs.md); everything else is a
// hard miss.
const hard = misses.filter((miss) => !/ (performance|lcp|tbt) /.test(miss)).concat(belowFloor);
if (hard.length) {
  console.error(
    `\n${hard.length} hard miss(es) (a11y/bp/seo/cls under 100/over budget, or perf/LCP/TBT past the floor):\n  ${hard.join("\n  ")}`,
  );
  process.exit(1);
}
console.log(`\n${rows.length} rows: ${misses.length ? "within the floors (targets missed above)" : "all within the targets"}.`);
