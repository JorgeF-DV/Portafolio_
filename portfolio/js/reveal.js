/**
 * reveal.js
 * Uses IntersectionObserver to trigger .is-visible on .reveal elements
 * as they scroll into view. Falls back gracefully if observer not supported.
 */

(function initReveal() {
  const THRESHOLD = 0.12; // % of element visible to trigger
  const MARGIN    = "0px 0px -60px 0px";

  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  // Fallback: show all if IntersectionObserver unsupported
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: THRESHOLD, rootMargin: MARGIN }
  );

  elements.forEach((el) => observer.observe(el));
})();
