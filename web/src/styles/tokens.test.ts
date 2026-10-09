import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { BLACK, colourTokens, contrast, over, rgb, themeOf, WHITE, type Rgb } from "~/lib/contrast";

/**
 * Every text/background pair the design uses meets WCAG 2.2 AA (wiki: design/design.md § Colour roles). Values are read
 * from global.css `@theme`, so a token change that breaks contrast fails here before it reaches a screenshot. A new
 * pair in design.md's table gets a row here.
 */
const css = readFileSync(new URL("./global.css", import.meta.url), "utf8");
const tokens = new Map(colourTokens(themeOf(css)));
const token = (name: string): Rgb => {
  const value = tokens.get(name);
  if (!value) throw new Error(`token --color-${name} not found`);
  return rgb(value);
};

const VIGNETTE = rgb("#fafafa");
const HEADER = over(BLACK, 0.6, WHITE);
const MENU = over(BLACK, 0.88, WHITE);

// [text, background, minimum ratio, where it is used]
const PAIRS: [string, () => Rgb, () => Rgb, number][] = [
  ["body text on white", () => token("foreground"), () => token("background"), 4.5],
  ["body text on the vignette edge", () => token("foreground"), () => VIGNETTE, 4.5],
  ["secondary text", () => token("muted-foreground"), () => token("background"), 4.5],
  ["primary button", () => token("primary-foreground"), () => token("primary"), 4.5],
  ["primary button hover (primary/90)", () => token("primary-foreground"), () => over(token("primary"), 0.9, WHITE), 4.5],
  ["secondary button", () => token("secondary-foreground"), () => token("secondary"), 4.5],
  ["secondary button hover (secondary/80)", () => token("secondary-foreground"), () => over(token("secondary"), 0.8, WHITE), 4.5],
  ["orange words (primary-strong)", () => token("primary-strong"), () => token("background"), 4.5],
  ["icons and small orange text (ink-orange)", () => token("ink-orange"), () => token("background"), 4.5],
  ["violet text", () => token("violet"), () => token("background"), 4.5],
  ["header text (white on black/60)", () => WHITE, () => HEADER, 4.5],
  ["menu text (white on black/88)", () => WHITE, () => MENU, 4.5],
  ["footer text (white on foreground)", () => WHITE, () => token("foreground"), 4.5],
  ["footer headings (primary on foreground)", () => token("primary"), () => token("foreground"), 4.5],
  ["focus ring on the page (primary-strong, 3:1)", () => token("primary-strong"), () => token("background"), 3],
  ["focus ring on dark chrome (white on black/60, 3:1)", () => WHITE, () => HEADER, 3],
];

describe("colour tokens meet WCAG AA", () => {
  it.each(PAIRS)("%s", (_, fg, bg, min) => {
    expect(contrast(fg(), bg())).toBeGreaterThanOrEqual(min);
  });

  it("every stop of the heading gradient is ≥ 3:1 on white (large text)", () => {
    const gradient = /--gradient-heading:\s*([^;]+);/.exec(css)?.[1] ?? "";
    const stops = [...gradient.matchAll(/#[0-9a-f]{6}|rgb\(\s*\d+\s+\d+\s+\d+\s*\)/gi)].map((m) => rgb(m[0]));
    expect(stops.length).toBeGreaterThanOrEqual(2);
    for (const stop of stops) expect(contrast(stop, WHITE)).toBeGreaterThanOrEqual(3);
  });
});
