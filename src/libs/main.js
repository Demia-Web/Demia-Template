import { gsap } from "gsap";
import Lenis from "lenis";

// Configurazione
const debug = false;
const lenis = new Lenis();
let isLenisRunning = true;

gsap.ticker.lagSmoothing(0);
gsap.ticker.add((time) => lenis.raf(time * 1000));

export const startLenis = () => {
  isLenisRunning = true;
  lenis.start();
};
export const stopLenis = () => {
  isLenisRunning = false;
  lenis.stop();
};
const toggleLenis = () => (isLenisRunning ? stopLenis() : startLenis());

document.addEventListener("astro:page-load", () => {
  // Avvia Lenis
  lenis.start();

  // Debug viewport
  if (debug) {
    const updateViewport = () => {
      const { innerWidth: vw, innerHeight: vh } = window;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      console.log(`Current vw: ${vw}px | ${(vw / rem).toFixed(2)}rem — ` + `vh: ${vh}px | ${(vh / rem).toFixed(2)}rem`);
    };
    window.addEventListener("resize", updateViewport);
    updateViewport();
  }

  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");
  const icons = document.querySelectorAll(".menuIcon");

  for (const icon of icons) {
    icon.addEventListener("click", () => {
      icon.classList.toggle("active");
      menu.classList.toggle("show");
      overlay.classList.toggle("show");
      toggleLenis();
    });
  }

  // Smooth scroll per link
  document.querySelectorAll(".scroll-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      const offsetTop = target.getBoundingClientRect().top + lenis.scroll;
      lenis.scrollTo(offsetTop, {
        duration: 0.6,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    });
  });
});
