/**
 * Marks `[data-inview]` elements with `.is-in` the first time they scroll into view; CSS does the fade (global.css
 * § Fade in). One observer for the page. Without this script (or with reduced motion) nothing is hidden.
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
