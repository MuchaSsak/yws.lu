#!/usr/bin/env node
/**
 * Repo-level numbers for the case study: shipped static weight (public/), each image and model,
 * dependencies, lines of code, and the output of the type checker, the linter and knip.
 *
 *   node scripts/capture/repo-metrics.mjs --out .case-study/before/repo-metrics.json [--public public] [--skip-checks]
 *
 * The checks run the project's own commands (package.json `typecheck`, `lint`) when they exist, else the
 * stack default (tsc --noEmit / next lint), and knip with its default config.
 */
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : fallback;
};
const ROOT = process.cwd();
const outFile = resolve(opt("out", ".case-study/before/repo-metrics.json"));
const publicDir = resolve(opt("public", "public"));
const skipChecks = argv.includes("--skip-checks");

function walk(dir, skip = []) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (skip.includes(entry.name)) continue;
    if (entry.isDirectory()) files.push(...walk(path, skip));
    else files.push({ path, bytes: statSync(path).size });
  }
  return files;
}

const pub = walk(publicDir);
const byExt = {};
for (const f of pub) {
  const ext = extname(f.path).toLowerCase() || "(none)";
  byExt[ext] = byExt[ext] ?? { files: 0, bytes: 0 };
  byExt[ext].files++;
  byExt[ext].bytes += f.bytes;
}
const IMAGE = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);
const MODEL = new Set([".glb", ".gltf", ".bin"]);
const list = (set) =>
  pub
    .filter((f) => set.has(extname(f.path).toLowerCase()))
    .map((f) => ({ file: relative(ROOT, f.path).replace(/\\/g, "/"), kb: Math.round(f.bytes / 1024) }))
    .sort((a, b) => b.kb - a.kb);

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const SOURCE_DIRS = ["app", "components", "canvases", "contexts", "hooks", "lib", "services", "typings", "src", "e2e", "scripts"];
const SOURCE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".astro", ".css"]);
const loc = { files: 0, lines: 0, byExt: {} };
for (const dir of SOURCE_DIRS) {
  let files = [];
  try {
    files = walk(join(ROOT, dir), ["node_modules", ".next", "dist", ".astro"]);
  } catch {
    continue;
  }
  for (const f of files) {
    const ext = extname(f.path);
    if (!SOURCE_EXT.has(ext)) continue;
    const lines = readFileSync(f.path, "utf8").split("\n").length;
    loc.files++;
    loc.lines += lines;
    loc.byExt[ext] = (loc.byExt[ext] ?? 0) + lines;
  }
}

function run(cmd) {
  try {
    return { code: 0, output: execSync(cmd, { cwd: ROOT, encoding: "utf8", stdio: "pipe", maxBuffer: 64 * 1024 * 1024 }) };
  } catch (error) {
    return { code: error.status ?? 1, output: `${error.stdout ?? ""}${error.stderr ?? ""}` };
  }
}

const checks = {};
if (!skipChecks) {
  const tsc = run(pkg.scripts?.typecheck ? "bun run typecheck" : "bunx tsc --noEmit -p tsconfig.json");
  checks.typecheck = { code: tsc.code, errors: (tsc.output.match(/error TS\d+/g) ?? []).length + (tsc.output.match(/\d+ errors?/)?.[0] ? 0 : 0), tail: tsc.output.split("\n").slice(-15).join("\n") };
  const lint = run(pkg.scripts?.lint ? "bun run lint" : "bunx next lint");
  checks.lint = {
    code: lint.code,
    errors: Number(lint.output.match(/(\d+) errors?/)?.[1] ?? (lint.output.match(/\bError:/g) ?? []).length),
    warnings: Number(lint.output.match(/(\d+) warnings?/)?.[1] ?? (lint.output.match(/\bWarning:/g) ?? []).length),
    tail: lint.output.split("\n").slice(-25).join("\n"),
  };
  const knip = run("bunx knip --reporter json --no-exit-code");
  try {
    const json = JSON.parse(knip.output.slice(knip.output.indexOf("{")));
    const count = (key) => json.issues.reduce((s, i) => s + (Array.isArray(i[key]) ? i[key].length : Object.keys(i[key] ?? {}).length), 0);
    checks.knip = {
      unusedFiles: json.files?.length ?? count("files"),
      unusedDependencies: count("dependencies"),
      unusedDevDependencies: count("devDependencies"),
      unlistedDependencies: count("unlisted"),
      unusedExports: count("exports"),
      unusedTypes: count("types"),
      files: json.files ?? json.issues.filter((i) => i.files?.length).map((i) => i.file),
      dependencies: json.issues.flatMap((i) => (i.dependencies ?? []).map((d) => d.name)),
    };
  } catch {
    checks.knip = { error: knip.output.slice(0, 2000) };
  }
}

const sum = (files) => files.reduce((s, f) => s + f.bytes, 0);
const metrics = {
  at: new Date().toISOString(),
  public: { files: pub.length, mb: Number((sum(pub) / 1048576).toFixed(1)), byExt: Object.fromEntries(Object.entries(byExt).map(([k, v]) => [k, { files: v.files, mb: Number((v.bytes / 1048576).toFixed(2)) }])) },
  images: { count: list(IMAGE).length, mb: Number((list(IMAGE).reduce((s, f) => s + f.kb, 0) / 1024).toFixed(1)), largest: list(IMAGE).slice(0, 25) },
  models: { count: list(MODEL).length, mb: Number((list(MODEL).reduce((s, f) => s + f.kb, 0) / 1024).toFixed(1)), files: list(MODEL) },
  dependencies: { prod: Object.keys(pkg.dependencies ?? {}).length, dev: Object.keys(pkg.devDependencies ?? {}).length, names: Object.keys(pkg.dependencies ?? {}) },
  loc,
  checks,
};
mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(metrics, null, 2));
console.log(JSON.stringify({ public: metrics.public.mb, images: metrics.images.mb, models: metrics.models.mb, deps: metrics.dependencies, loc: loc.lines, checks: Object.fromEntries(Object.entries(checks).map(([k, v]) => [k, { ...v, tail: undefined, files: undefined }])) }, null, 1));
