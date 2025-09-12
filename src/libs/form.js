const DEBUG = false;
if (!DEBUG) console.log = () => {};

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // const loader = document.getElementById("formLoader");
  // loader.classList.remove("hidden");
  // loader.classList.add("fixed");

  const formData = new FormData(this);

  const honeypotFields = ["nome_alternativo", "sito_web", "email_secondaria", "telefono_cellulare"];
  const isBot = honeypotFields.some((field) => {
    const value = formData.get(field);
    return typeof value === "string" && value.trim() !== "";
  });
  console.log("isBot:", isBot);
  if (isBot) return;

  const postDataEmail = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    cap: formData.get("cap"),
    message: formData.get("message"),
    richiesta: formData.get("richiesta"),
    privacyConsent: formData.get("privacyConsent") === "on",
    cliente: "LUCAR",
  };

  try {
    console.log("Sending request to:", import.meta.env.PUBLIC_SMTP_URL);
    const response = await fetch("/.netlify/functions/proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiUrl: `${import.meta.env.PUBLIC_SMTP_URL}`,
        requestBody: postDataEmail,
      }),
    });
    setTimeout(() => {
      if (DEBUG) console.log("[Redirect] Reindirizzamento alla pagina di ringraziamento");
      window.location.href = "/ThanksYouPage";
    }, 2000);
  } catch (error) {
    console.log("Errore nel invio del form:", error);
    alert("Errore nel processo. Riprova più tardi.");
    loader.classList.remove("fixed");
    loader.classList.add("hidden");
  }
});
