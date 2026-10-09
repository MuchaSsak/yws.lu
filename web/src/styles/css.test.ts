import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

/**
 * CSS rules a minifier or a browser punishes (lessons.md): scroll-driven animations are written in longhands (the
 * `animation` shorthand next to `animation-timeline` gets folded into one declaration Chrome rejects), and nothing
 * hides content without a reduced-motion path is checked in e2e (motion.spec.ts).
 */
const SRC = fileURLToPath(new URL("..", import.meta.url));
function* files(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (/\.(css|astro)$/.test(name)) yield path;
  }
}

describe("CSS", () => {
  it("scroll-driven animations use longhands only", () => {
    const offenders: string[] = [];
    for (const file of files(SRC)) {
      const css = readFileSync(file, "utf8");
      for (const [block] of css.matchAll(/\{[^{}]*animation-timeline[^{}]*\}/g))
        if (/(^|[\s;{])animation\s*:/.test(block)) offenders.push(`${file.slice(SRC.length)}: ${block.replace(/\s+/g, " ").slice(0, 90)}`);
    }
    expect(offenders).toEqual([]);
  });
});
