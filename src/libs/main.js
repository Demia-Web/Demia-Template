import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { initForm } from "./form";
import { initHeader } from "./header";
import { initHomePage } from "./home";
import { initBarba } from "./barba-setup";
import { initAnimatedGrid } from "./components";

gsap.registerPlugin(ScrollTrigger);

// 🌐 Debug globale per tutto il progetto
window.swupDebug = true;

// LENIS
const lenis = new Lenis({
  autoRaf: false,
  smoothWheel: true,
  touchMultiplier: 1.5,
  lerp: 0.1,
});
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

function refreshOnMediaLoad() {
  let queued = false;
  const queueRefresh = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      ScrollTrigger.refresh();
    });
  };

  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", queueRefresh, { once: true });
  });
  document.querySelectorAll("video").forEach((video) => {
    if (video.readyState < 1) video.addEventListener("loadedmetadata", queueRefresh, { once: true });
  });
}

export function initAllPages() {
  const themeEl = document.querySelector("#theme-value");
  if (themeEl) {
    const newTheme = themeEl.dataset.theme;
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  ScrollTrigger.getAll().forEach((t) => t.kill());
  ScrollTrigger.refresh();

  lenis.start();

  // Smooth scroll su btn
  if (document.querySelector(".scroll-link")) {
    document.querySelectorAll(".scroll-link").forEach((link) => {
      link.onclick = (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        const offsetTop = target.getBoundingClientRect().top + lenis.scroll;
        lenis.scrollTo(offsetTop, {
          easing: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
          duration: 1.2,
          offset: -36,
        });
      };
    });
  }

  // Init Components
  initForm();
  initHeader();
  initAnimatedGrid();
  refreshOnMediaLoad();

  // Init Pages
  initHomePage();
}

// Init iniziale
initAllPages();

// Setup Barba
initBarba();
