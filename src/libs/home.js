export function initHomePage() {
  const isHome = document.querySelector('[data-page="home"]');
  if (window.swupDebug) console.log("🔄 initHomePage()");
  if (!isHome) {
    return;
  } else {
    if (window.swupDebug) console.log("✅ initHomePage()");
  }
}
