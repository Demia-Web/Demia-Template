import { gsap } from "gsap";

document.addEventListener("astro:page-load", () => {
  const header = document.querySelector(".header");

  // --- NAVBAR SHOW/HIDE ALLO SCROLL (desktop con GSAP) ---
  let lastScrollTop = 0;
  let isScrolling = false;
  const navbar = document.getElementById("header");
  if (navbar) gsap.set(navbar, { y: 0 });

  const onScrollDesktop = () => {
    if (isScrolling) return;
    isScrolling = true;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const direction = scrollTop > lastScrollTop ? 1 : -1;

    if (scrollTop <= 1) {
      gsap.to(navbar, { y: 0, duration: 0.6, ease: "power4.out" });
    } else if (direction === 1 && scrollTop > navbarHeight + 50) {
      // scroll down → nascondi navbar
      gsap.to(navbar, { y: -navbarHeight, duration: 0.8, ease: "power4.out" });
    } else if (direction === -1) {
      // scroll up → mostra navbar con ombra (white)
      gsap.to(navbar, { y: 0, duration: 0.8, ease: "power4.out" });
    }

    lastScrollTop = scrollTop;
    setTimeout(() => {
      isScrolling = false;
    }, 100);
  };

  const mqlDesktop = window.matchMedia("(min-width: 1024px)");
  let scrollHandlerAttached = false;
  function attachScrollIfDesktop() {
    if (mqlDesktop.matches && !scrollHandlerAttached) {
      window.addEventListener("scroll", onScrollDesktop, { passive: true });
      scrollHandlerAttached = true;
    } else if (!mqlDesktop.matches && scrollHandlerAttached) {
      window.removeEventListener("scroll", onScrollDesktop);
      scrollHandlerAttached = false;
      if (navbar) gsap.to(navbar, { y: 0, duration: 0.3 });
    }
  }
  attachScrollIfDesktop();
  mqlDesktop.addEventListener("change", attachScrollIfDesktop);
});
