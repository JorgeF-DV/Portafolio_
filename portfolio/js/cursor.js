/**
 * cursor.js
 * Handles the custom cursor dot and trailing ring.
 */

(function initCursor() {
  const cursor      = document.getElementById("cursor");
  const cursorTrail = document.getElementById("cursorTrail");

  if (!cursor || !cursorTrail) return;

  // Hide on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    cursor.style.display      = "none";
    cursorTrail.style.display = "none";
    document.body.style.cursor = "auto";
    return;
  }

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top  = mouseY + "px";

    // Trail follows with slight delay via CSS transition
    cursorTrail.style.left = mouseX + "px";
    cursorTrail.style.top  = mouseY + "px";
  });

  // Fade out when leaving window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity      = "0";
    cursorTrail.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity      = "1";
    cursorTrail.style.opacity = "1";
  });
})();
