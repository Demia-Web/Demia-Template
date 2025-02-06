import { gsap } from "gsap";
import Lenis from "lenis";

const lenis = new Lenis();

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

lenis.on("scroll", (e) => {
  console.log(e);
});

var isLenisRunning = true;

function toggleLenis() {
  if (lenis) {
    if (isLenisRunning) {
      lenis.stop();
      isLenisRunning = false;
    } else {
      lenis.start();
      isLenisRunning = true;
    }
  } else {
  }
}

export function stopLenis() {
  lenis.stop();
}

export function startLenis() {
  lenis.start();
}

document.addEventListener("astro:page-load", () => {
  lenis.start();
});
