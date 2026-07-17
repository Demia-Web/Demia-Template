import gsap from "gsap";
import { CustomEase, Flip } from "gsap/all";
gsap.registerPlugin(CustomEase, Flip);
CustomEase.create("osmo", "M0,0 C0.625,0.05 0,1 1,1");

export function initAnimatedGrid() {
  let _gridListenersBound = false;
  const grid = document.querySelector("[data-animated-grid]");
  const cols = document.querySelectorAll("[data-animated-grid-col]");
  const toggles = document.querySelectorAll("[data-animated-grid-toggle]");

  if (window.swupDebug) console.log("🔄 initAnimatedGrid()");
  if (!grid || !cols.length) return;
  if (window.swupDebug) console.log("✅ initAnimatedGrid()");

  const storageKey = "animatedGridState";
  let isOpen = localStorage.getItem(storageKey) === "open";

  gsap.set(grid, { display: "block" });

  if (isOpen) {
    gsap.set(cols, { yPercent: 0 });
  } else {
    gsap.set(cols, { yPercent: 100 });
  }

  function openGrid() {
    isOpen = true;
    localStorage.setItem(storageKey, "open");

    gsap.fromTo(
      cols,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        ease: "expo.inOut",
        stagger: { each: 0.03, from: "start" },
        overwrite: true,
      },
    );
  }

  function closeGrid() {
    isOpen = false;
    localStorage.setItem(storageKey, "closed");

    gsap.fromTo(
      cols,
      {
        yPercent: 0,
      },
      {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        stagger: { each: 0.03, from: "start" },
        overwrite: true,
      },
    );
  }

  function toggleGrid() {
    const open = localStorage.getItem(storageKey) === "open";
    if (open) closeGrid();
    else openGrid();
  }

  function isTypingContext(e) {
    const el = e.target;
    if (!el) return false;
    const tag = (el.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || el.isContentEditable;
  }

  if (!_gridListenersBound) {
    _gridListenersBound = true;

    toggles.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleGrid();
      });
    });

    window.addEventListener("keydown", (e) => {
      if (isTypingContext(e)) return;
      if (!(e.shiftKey && (e.key || "").toLowerCase() === "g")) return;
      e.preventDefault();
      toggleGrid();
    });
  }
}
