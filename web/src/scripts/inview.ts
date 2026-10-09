/**
 * Marks `[data-inview]` elements with `.is-in` the first time they scroll into view; CSS does the fade (global.css
 * § Fade in). One observer for the page. Without this script (or with reduced motion) nothing is hidden.
 *
 * `[data-loop]` elements get `.is-playing` while they are within 200 px of the viewport and lose it when they leave,
 * so continuous CSS loops (warp beams, marquee) run only while they can be seen (wiki: design/design.md § Motion).
 */
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    }
  },
  { rootMargin: "0px 0px -10% 0px" },
);

for (const element of document.querySelectorAll("[data-inview]")) observer.observe(element);

const loops = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) entry.target.classList.toggle("is-playing", entry.isIntersecting);
  },
  { rootMargin: "200px 0px" },
);

for (const element of document.querySelectorAll("[data-loop]")) loops.observe(element);
