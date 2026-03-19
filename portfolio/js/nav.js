/**
 * nav.js
 * Handles:
 *  - Sticky nav background on scroll
 *  - Mobile burger menu toggle
 *  - Smooth close on mobile link click
 */

(function initNav() {
  const nav        = document.getElementById("nav");
  const burger     = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!nav || !burger || !mobileMenu) return;

  // ── Scroll: add background ──────────────────────────────────
  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // run on load

  // ── Mobile menu toggle ──────────────────────────────────────
  const openMenu  = () => {
    mobileMenu.classList.add("open");
    burger.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    burger.classList.remove("open");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", () => {
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
