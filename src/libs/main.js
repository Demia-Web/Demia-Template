import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// 🌐 Debug globale per tutto il progetto
window.swupDebug = false;

// LENIS
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

function initScripts() {
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
          duration: 0.8,
          easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        });
      };
    });
  }

  // Animazione Faq
  if (document.querySelector(".accordion-item")) {
    const accordions = document.querySelectorAll(".accordion-item");
    const animationDuration = 0.5;

    accordions.forEach((accordion) => {
      const header = accordion.querySelector(".accordion-header");
      const body = accordion.querySelector(".accordion-body");
      const p = accordion.querySelector(".accordion-text");
      const arrow = accordion.querySelector(".arrow");

      gsap.set(body, { height: 0 });

      accordion.addEventListener("click", () => {
        const isOpen = body.classList.contains("active");

        if (isOpen) {
          gsap.to(body, {
            height: 0,
            duration: animationDuration,
            ease: "power4.inOut",
          });
          accordion.classList.remove("active");
          body.classList.remove("active");
          arrow.classList.remove("active");
        } else {
          const fullHeight = `calc(${body.scrollHeight}px)`;
          gsap.fromTo(body, { height: 0 }, { height: fullHeight, duration: animationDuration, ease: "power4.inOut" });
          accordion.classList.add("active");
          body.classList.add("active");
          arrow.classList.add("active");
        }
      });
    });
  }
}

// ESECUZIONE: PRIMO LOAD + TRANSIZIONI SWUP
document.addEventListener("DOMContentLoaded", initScripts);
document.addEventListener("swup:page:view", initScripts);

document.addEventListener("swup:content:replace", () => {
  window.scrollTo(0, 0);
  if (window.swupDebug) console.log("scrollTo avviato");
});

document.addEventListener("swup:page:view", () => {
  if (window.swupDebug) console.log("Triggerato -> page:view");
});
