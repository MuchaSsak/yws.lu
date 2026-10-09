/**
 * Share images are rendered locally (`bun run og`, Playwright) and committed in public/og/, because the Vercel build
 * has no browser. The manifest records what each image was drawn from; the launch gate compares it with every built
 * page, so a changed title or description fails the build until `bun run og` redraws the card.
 */
import { createHash } from "node:crypto";

/** Bump when the card's design changes, so every image is redrawn. */
export const OG_TEMPLATE = 3;

export const ogHash = ({ title, description, lang }) =>
  createHash("sha1").update(`${OG_TEMPLATE}|${lang}|${title}|${description}`).digest("hex").slice(0, 12);

const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const meta = (html, key) => decode(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`).exec(html)?.[1] ?? "");

/** What a built page's card shows: its og:image path, title (page part), description and language. */
export function cardOf(html) {
  const image = meta(html, "og:image");
  if (!image) return null;
  return {
    path: new URL(image).pathname,
    title: meta(html, "og:title"),
    description: meta(html, "og:description"),
    alt: meta(html, "og:image:alt"),
    lang: /<html lang="(\w+)"/.exec(html)?.[1] ?? "en",
  };
}
