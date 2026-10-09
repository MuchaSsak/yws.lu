/**
 * Anchor jumps land on their target. Sections, project chapters and the footer skip layout while off screen
 * (`content-visibility: auto`) and stand at an estimated height until they have been drawn once, so a jump landed
 * hundreds of pixels off as the sections above the target took their real height: `/en/#contact` ended 552 px past
 * the section in Chromium, and the legal pages' contents links missed their headings. For a jump, `html[data-jump]`
 * draws everything (global.css); every section's real height is then remembered (`contain-intrinsic-height: auto`), so
 * letting them skip again a moment later moves nothing.
 */
const root = document.documentElement;

const targetOf = (hash: string) => {
  if (hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
};

let timer = 0;
const drawEverything = () => {
  root.dataset.jump = "";
  clearTimeout(timer);
  timer = window.setTimeout(() => delete root.dataset.jump, 1500);
};

// Opened with a hash (a link from another page): the browser jumped while the sections stood at their estimates.
const opened = targetOf(location.hash);
if (opened) {
  drawEverything();
  opened.scrollIntoView({ behavior: "instant" });
  // The web font can arrive after the jump and reflow the text above the target (Safari has no scroll anchoring):
  // align once more, unless the reader has started to move.
  let moved = false;
  for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
    addEventListener(type, () => (moved = true), { once: true, passive: true });
  }
  void document.fonts.ready.then(() => {
    if (!moved) opened.scrollIntoView({ behavior: "instant" });
  });
}

// A link within the page: draw everything before the browser works out where to scroll.
document.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href*='#']") : null;
  if (!link || link.origin !== location.origin || link.pathname !== location.pathname || !targetOf(link.hash)) return;
  drawEverything();
});
