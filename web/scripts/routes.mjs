/**
 * The built pages, for the node QA scripts (Lighthouse gate, shots, OG images). The source of truth is the route map
 * (`src/lib/routes.ts`), which decides what Astro builds; reading `dist/` gives the scripts exactly that list without
 * importing TypeScript. The Playwright specs import the route map directly (`e2e/routes.ts`).
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const DIST = join(ROOT, "dist");

/** Every built page path (`/en/`, `/fr/logement-jeunes/`…), without the root safety net and the 404. */
export function builtRoutes() {
  if (!existsSync(join(DIST, "en", "index.html"))) throw new Error("dist/ is missing: run `bun run build` first");
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name === "index.html" && dir !== DIST) out.push(`/${relative(DIST, dir).replaceAll("\\", "/")}/`);
    }
  };
  walk(DIST);
  return out.filter((path) => !/\/404\/$/.test(path)).sort((a, b) => a.localeCompare(b));
}

/** Answers on `base`? (the shared Vercel-like server on 4322 is reused when it is up). */
export async function answers(base) {
  try {
    return (await fetch(`${base}/en/`)).ok;
  } catch {
    return false;
  }
}
