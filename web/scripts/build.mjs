#!/usr/bin/env node
/**
 * `bun run build` (wiki: tech/technologies.md § Commands, tech/usage/visual-qa.md § The gates): the stale-vercel.json
 * check, `astro build`, then the SEO / launch gate on `dist/`. `--launch` builds exactly like production
 * (`IS_FULL_PRODUCTION=true` for every step: indexable robots, placeholders block), on any shell.
 *
 *   bun run build [--launch]
 */
import { spawnSync } from "node:child_process";

const launch = process.argv.includes("--launch");
const env = launch ? { ...process.env, IS_FULL_PRODUCTION: "true" } : process.env;
const steps = ["bun scripts/vercel-config.ts --check", "astro build", "node scripts/launch-gate.mjs"];

for (const step of steps) {
  const { status } = spawnSync(step, { stdio: "inherit", shell: true, env });
  if (status !== 0) process.exit(status ?? 1);
}
