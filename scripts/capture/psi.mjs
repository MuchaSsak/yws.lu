#!/usr/bin/env node
/**
 * PageSpeed Insights API (Google's servers: lab run + CrUX field data when the page has enough traffic)
 * for every page of a phase on a public origin, mobile + desktop.
 *
 *   node scripts/capture/psi.mjs --phase before --origin https://www.yws.lu --out .case-study/before/psi
 *
 * An optional key raises the quota: PSI_API_KEY (env var name only; never commit the value).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { urlsFor } from "./pages.mjs";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const phase = opt("phase", "before");
const origin = opt("origin", "https://www.yws.lu").replace(/\/$/, "");
const out = resolve(opt("out", `.case-study/${phase}/psi`));
mkdirSync(out, { recursive: true });

const seen = new Set();
const targets = urlsFor(phase).filter((t) => t.id !== "not-found" && !seen.has(t.path) && seen.add(t.path));
const rows = [];
for (const target of targets) {
  for (const strategy of ["mobile", "desktop"]) {
    const url = origin + target.path;
    const api = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    api.searchParams.set("url", url);
    api.searchParams.set("strategy", strategy);
    for (const c of ["performance", "accessibility", "best-practices", "seo"]) api.searchParams.append("category", c);
    if (process.env.PSI_API_KEY) api.searchParams.set("key", process.env.PSI_API_KEY);
    let json = null;
    for (let attempt = 0; attempt < 3 && !json?.lighthouseResult; attempt++) {
      const res = await fetch(api).catch((e) => ({ ok: false, json: async () => ({ error: { message: e.message } }) }));
      json = await res.json();
      if (!json.lighthouseResult) await new Promise((r) => setTimeout(r, 15_000));
    }
    const name = `${target.id}-${target.locale}-${strategy}`;
    writeFileSync(join(out, `${name}.json`), JSON.stringify(json));
    const lhr = json.lighthouseResult;
    const field = json.loadingExperience;
    const originField = json.originLoadingExperience;
    const pick = (exp) =>
      exp?.metrics
        ? Object.fromEntries(Object.entries(exp.metrics).map(([k, v]) => [k, { p75: v.percentile, category: v.category }]))
        : null;
    rows.push({
      id: target.id,
      url,
      strategy,
      error: json.error?.message ?? null,
      lab: lhr
        ? {
            performance: Math.round(lhr.categories.performance.score * 100),
            accessibility: Math.round(lhr.categories.accessibility.score * 100),
            "best-practices": Math.round(lhr.categories["best-practices"].score * 100),
            seo: Math.round(lhr.categories.seo.score * 100),
            lcp: Math.round(lhr.audits["largest-contentful-paint"].numericValue),
            cls: Number(lhr.audits["cumulative-layout-shift"].numericValue.toFixed(3)),
            tbt: Math.round(lhr.audits["total-blocking-time"].numericValue),
            si: Math.round(lhr.audits["speed-index"].numericValue),
            totalKB: Math.round(lhr.audits["total-byte-weight"].numericValue / 1024),
          }
        : null,
      fieldPage: pick(field),
      fieldOrigin: pick(originField),
      fieldNote: field?.metrics ? field.overall_category : "no page-level CrUX data",
    });
    console.log(`psi ${name}: ${rows.at(-1).lab ? `perf ${rows.at(-1).lab.performance}` : rows.at(-1).error} | field: ${rows.at(-1).fieldNote}`);
  }
}
writeFileSync(join(out, "summary.json"), JSON.stringify({ at: new Date().toISOString(), origin, rows }, null, 2));
