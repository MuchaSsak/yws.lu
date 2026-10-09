/**
 * WCAG 2.2 contrast for the design tokens (wiki: design/design.md § Colour). Shared by the AA token test and the
 * specimen page, so both read the same numbers from `src/styles/global.css`.
 */

export type Rgb = [number, number, number];

export const WHITE: Rgb = [1, 1, 1];
export const BLACK: Rgb = [0, 0, 0];

/** The `@theme` block of a stylesheet. */
export const themeOf = (css: string): string => css.slice(css.indexOf("@theme {"), css.indexOf("}", css.indexOf("@theme {")));

/** Every `--color-*` token of a `@theme` block, in order. */
export const colourTokens = (theme: string): [string, string][] =>
  [...theme.matchAll(/--color-([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name as string, (value as string).trim()]);

/** sRGB channels 0..1 from `#rrggbb`, `rgb(r g b)` or `oklch(L C H)` (L as 0..1 or %). */
export function rgb(value: string): Rgb {
  if (value.startsWith("#")) {
    const hex = value.slice(1);
    return [0, 2, 4].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255) as Rgb;
  }
  const channels = /rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\)/.exec(value);
  if (channels) return [1, 2, 3].map((i) => Number(channels[i]) / 255) as Rgb;
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

export const luminance = ([r, g, b]: Rgb): number => {
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

export const contrast = (fg: Rgb, bg: Rgb): number => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};

/** `fg` at `alpha` over `bg` (translucent surfaces: the header, button hover). */
export const over = (fg: Rgb, alpha: number, bg: Rgb): Rgb =>
  fg.map((v, i) => v * alpha + (bg[i] as number) * (1 - alpha)) as Rgb;

/** `#rrggbb` for display. */
export const hex = (colour: Rgb): string =>
  `#${colour
    .map((v) =>
      Math.round(v * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
