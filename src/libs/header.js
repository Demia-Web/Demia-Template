import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initHeader() {
  if (window.swupDebug) console.log("🔄 initHeader()");
  const navbar = document.getElementById("header");
  if (!navbar) return;

  if (window.swupDebug) console.log("✅ initHeader() caricata");

  // HEADER HIDE ALLO SCROLL
  if (document.querySelector("#header")) {
    let lastScrollTop = 0;
    let isScrolling = false;

    const onScroll = () => {
      if (isScrolling) return;
      isScrolling = true;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const navbarHeight = navbar.offsetHeight;
      const direction = scrollTop > lastScrollTop ? 1 : -1;

      if (scrollTop <= 1) {
        gsap.to(navbar, { y: 0, duration: 0.6, ease: "power4.out" });
      } else if (direction === 1 && scrollTop > navbarHeight + 50) {
        gsap.to(navbar, { y: -navbarHeight - 50, duration: 0.8, ease: "power4.out" });
      } else if (direction === -1) {
        gsap.to(navbar, { y: 0, duration: 0.8, ease: "power4.out" });
      }

      lastScrollTop = scrollTop;
      setTimeout(() => (isScrolling = false), 100);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }
}
