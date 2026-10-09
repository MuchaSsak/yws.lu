import type { Page } from "@playwright/test";

/**
 * Text-fit probe (wiki: tech/usage/visual-qa.md § Text fit): in the current state of the page, every visible text
 * node is checked for
 * - **clipped**: its element hides overflowing text (overflow hidden/clip/auto or an ellipsis);
 * - **spill**: the text runs outside its own element's box;
 * - **edge**: the text runs past the left or right edge of the screen;
 * - **split**: a word broken across two lines (a break after a hyphen is allowed);
 * - **overlap**: two different text nodes painted on top of each other. Text in a fixed or sticky layer (the header,
 *   the open menu) over page text that scrolls under it is not an overlap when that layer hides its backdrop (a blur
 *   or a near-opaque background): the page text is not readable there. Inside one layer, every overlap counts.
 * Decorative copies (`aria-hidden`), screen-reader-only text and intentional scrollers (`[data-marquee]`) are skipped.
 * Returns one line per problem.
 */
export async function textFitProblems(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const problems: string[] = [];
    const label = (el: Element) =>
      `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""} "${(el.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 40)}"`;
    const skip = (el: Element) =>
      !!el.closest('[aria-hidden="true"], .sr-only, .sr-only-focusable, [data-marquee], script, style, noscript, template');
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => ((node.textContent ?? "").trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    // The paint layer of an element: its nearest fixed or sticky ancestor, or the page (null).
    const layerOf = (el: Element): Element | null => {
      for (let node: Element | null = el; node; node = node.parentElement) {
        if (["fixed", "sticky"].includes(getComputedStyle(node).position)) return node;
      }
      return null;
    };
    // A layer hides what passes under it when it blurs its backdrop or its background is near opaque.
    const hidesBackdrop = (layer: Element) => {
      const style = getComputedStyle(layer);
      if (style.backdropFilter && style.backdropFilter !== "none") return true;
      const [, , , alpha = "1"] = style.backgroundColor.match(/[\d.]+/g) ?? ["0", "0", "0", "0"];
      return Number(alpha) >= 0.85;
    };
    const boxes: { el: Element; rect: DOMRect; layer: Element | null }[] = [];
    const vw = document.documentElement.clientWidth;
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const el = node.parentElement;
      if (!el || skip(el) || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
      if (!rects.length) continue;
      const own = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      // clipped
      if (
        (["hidden", "clip", "auto", "scroll"].includes(style.overflowX) || style.textOverflow === "ellipsis") &&
        el.scrollWidth > el.clientWidth + 1
      )
        problems.push(`clipped: ${label(el)} (${el.scrollWidth} > ${el.clientWidth})`);
      for (const r of rects) {
        if (r.right > own.right + 2 || r.left < own.left - 2) {
          problems.push(`spill: ${label(el)}`);
          break;
        }
      }
      for (const r of rects) {
        if (r.right > vw + 1 || r.left < -1) {
          problems.push(`edge: ${label(el)} (${Math.round(r.left)}–${Math.round(r.right)} of ${vw})`);
          break;
        }
      }
      // split words: each word's range must sit on one line
      const text = node.textContent ?? "";
      for (const match of text.matchAll(/[^\s\-‐–—/]+/g)) {
        if (match[0].length < 4) continue;
        const word = document.createRange();
        word.setStart(node, match.index);
        word.setEnd(node, match.index + match[0].length);
        const lines = new Set([...word.getClientRects()].filter((r) => r.width > 0.5).map((r) => Math.round(r.top)));
        if (lines.size > 1) {
          problems.push(`split: "${match[0]}" in ${label(el)}`);
          break;
        }
      }
      const layer = layerOf(el);
      for (const r of rects) boxes.push({ el, rect: r, layer });
    }
    // overlap between different elements' text (not ancestor/descendant pairs)
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i]!;
        const b = boxes[j]!;
        if (a.el === b.el || a.el.contains(b.el) || b.el.contains(a.el)) continue;
        if (a.layer !== b.layer && [a.layer, b.layer].some((layer) => layer && hidesBackdrop(layer))) continue;
        const w = Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left);
        const h = Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top);
        if (w > 4 && h > Math.min(a.rect.height, b.rect.height) * 0.4) {
          // Only what is on screen in this scroll position.
          const x = Math.max(a.rect.left, b.rect.left) + w / 2;
          const y = Math.max(a.rect.top, b.rect.top) + h / 2;
          if (y < 0 || y > innerHeight || x < 0 || x > vw) continue;
          problems.push(`overlap: ${label(a.el)} × ${label(b.el)}`);
        }
      }
    }
    return [...new Set(problems)];
  });
}
