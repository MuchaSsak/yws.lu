/**
 * Marks `[data-inview]` elements with `.is-in` the first time they scroll into view; CSS does the fade or the rise
 * (global.css § Fade in). Without this script (or with reduced motion) nothing is hidden. Entrances start as soon as
 * their place reaches the screen, never later [user 2026-10-09: cards left empty space while waiting to rise]: a
 * rising card waits 200 px below its place and an observer sees the moved box, so the rise observer reaches 200 px
 * further down to start as the card's own place enters.
 *
 * `[data-loop]` elements get `.is-playing` while they are within 200 px of the viewport and lose it when they leave,
 * so continuous CSS loops (warp beams, marquee) run only while they can be seen (wiki: design/design.md § Motion).
 */
const reveal = (rootMargin: string) => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin },
  );
  return observer;
};
const fades = reveal("0px");
const rises = reveal("0px 0px 200px 0px");

for (const element of document.querySelectorAll<HTMLElement>("[data-inview]")) {
  (element.dataset.inview === "rise" ? rises : fades).observe(element);
}

const loops = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) entry.target.classList.toggle("is-playing", entry.isIntersecting);
  },
  { rootMargin: "200px 0px" },
);

for (const element of document.querySelectorAll("[data-loop]")) loops.observe(element);
