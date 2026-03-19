/**
 * counters.js
 * Animates numeric counters in .stat__number elements
 * when they enter the viewport.
 */

(function initCounters() {
  const DURATION = 1800; // ms

  /**
   * Eases a value using easeOutExpo curve.
   * @param {number} t - Progress 0 to 1
   * @returns {number} Eased value
   */
  const easeOutExpo = (t) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  /**
   * Animates a single counter element from 0 to its target.
   * @param {HTMLElement} el - The element with data-target attribute
   */
  const animateCounter = (el) => {
    const target    = parseInt(el.dataset.target, 10);
    const startTime = performance.now();

    const tick = (currentTime) => {
      const elapsed  = currentTime - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased    = easeOutExpo(progress);
      const current  = Math.round(eased * target);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const counters  = document.querySelectorAll(".stat__number[data-target]");

  if (!counters.length) return;

  if (!("IntersectionObserver" in window)) {
    counters.forEach((el) => {
      el.textContent = el.dataset.target;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
})();
