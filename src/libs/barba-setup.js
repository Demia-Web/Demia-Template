// src/scripts/barba-setup.js
import barba from "@barba/core";
import { gsap } from "gsap";
import { initAllPages } from "./main";

const TRANSITION_DURATION = 0.6;

export function initBarba() {
  barba.init({
    transitions: [
      {
        name: "fade-transition",

        async leave(data) {
          console.log("🔴 LEAVE: fade out");
          const current = data.current.container;

          // Fissa vecchia pagina
          gsap.set(current, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
          });

          // Fade out
          await gsap.to(current, {
            opacity: 0,
            duration: TRANSITION_DURATION,
            ease: "power2.inOut",
            onStart: () => console.log("👻 Fade out vecchia pagina"),
            onComplete: () => console.log("✅ Fade out completato"),
          });

          window.barbaOldPage = current;
        },

        async enter(data) {
          console.log("🟢 ENTER: fade in");
          const current = window.barbaOldPage;
          const next = data.next.container;

          // Nuova pagina sotto, invisibile
          gsap.set(next, {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: 0,
            zIndex: 1,
          });

          // Rimuovi vecchia
          current.remove();

          // Fade in
          await gsap.to(next, {
            opacity: 1,
            duration: TRANSITION_DURATION,
            ease: "power2.inOut",
            onStart: () => console.log("✨ Fade in nuova pagina"),
            onComplete: () => console.log("✅ Fade in completato"),
          });

          // Cleanup
          gsap.set(next, {
            position: "relative",
            opacity: 1,
            zIndex: 1,
          });

          delete window.barbaOldPage;

          window.scrollTo(0, 0);
          console.log("✅ Transizione fade completata");
        },
      },
    ],
  });

  barba.hooks.after(() => {
    console.log("🔄 Hook: reinizializzo animazioni");
    initAllPages();
  });
}
