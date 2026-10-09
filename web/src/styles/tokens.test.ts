import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

/**
 * Every text/background pair the design uses meets WCAG 2.2 AA (wiki: design/design.md § Colour). Values are read
 * from global.css `@theme`, so a token change that breaks contrast fails here before it reaches a screenshot.
 */
const css = readFileSync(new URL("./global.css", import.meta.url), "utf8");
const theme = css.slice(css.indexOf("@theme {"), css.indexOf("}", css.indexOf("@theme {")));
const token = (name: string): string => {
  const match = new RegExp(`--color-${name}:\\s*([^;]+);`).exec(theme);
  if (!match?.[1]) throw new Error(`token --color-${name} not found`);
  return match[1].trim();
};

type Rgb = [number, number, number];

/** sRGB channels 0..1 from `#rrggbb` or `oklch(L C H)` (L as 0..1 or %). */
function rgb(value: string): Rgb {
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    return [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255) as Rgb;
  }
  const parts = /oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)\s*\)/.exec(value);
  if (!parts) throw new Error(`unsupported colour ${value}`);
  const l = Number(parts[1]) / (parts[2] ? 100 : 1);
  const c = Number(parts[3]);
  const h = (Number(parts[4]) * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const linear = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  return linear.map((v) => {
    const clamped = Math.min(1, Math.max(0, v));
    return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
  }) as Rgb;
}

const luminance = ([r, g, b]: Rgb) => {
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const contrast = (fg: Rgb, bg: Rgb) => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};
/** `fg` at `alpha` over `bg` (for the translucent header). */
const over = (fg: Rgb, alpha: number, bg: Rgb): Rgb => fg.map((v, i) => v * alpha + (bg[i] as number) * (1 - alpha)) as Rgb;

const WHITE: Rgb = [1, 1, 1];
const BLACK: Rgb = [0, 0, 0];

// [text, background, minimum ratio, where it is used]
const PAIRS: [string, string, number, string][] = [
  ["foreground", "background", 4.5, "body text"],
  ["muted-foreground", "background", 4.5, "secondary text"],
  ["primary-foreground", "primary", 4.5, "buttons"],
  ["secondary-foreground", "secondary", 4.5, "secondary buttons"],
  ["ink-orange", "background", 4.5, "orange text on white"],
  ["primary-strong", "background", 3, "focus ring (non-text, 3:1)"],
];

describe("colour tokens meet WCAG AA", () => {
  it.each(PAIRS)("%s on %s ≥ %d:1 (%s)", (fg, bg, min) => {
    expect(contrast(rgb(token(fg)), rgb(token(bg)))).toBeGreaterThanOrEqual(min);
  });

  it("header text: white on black/60 over the lightest page background ≥ 4.5:1", () => {
    expect(contrast(WHITE, over(BLACK, 0.6, rgb(token("background"))))).toBeGreaterThanOrEqual(4.5);
  });
});
