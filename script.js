// Menu mobile, anno corrente e preferenze cookie.

document.addEventListener("DOMContentLoaded", () => {

  // ANNO AUTOMATICO
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // MENU MOBILE
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Chiudi il menu" : "Apri il menu"
      );

    });

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");

      });

    });
  }

  // COOKIE BANNER
  const banner = document.getElementById("cookie-banner");
  const modal = document.getElementById("cookie-modal");

  const storageKey = "charmant_cookie_preferences";

  let preferences = null;

  try {
    preferences = JSON.parse(
      localStorage.getItem(storageKey) || "null"
    );
  } catch (_) {}

  if (banner && !preferences) {
    banner.hidden = false;
  }

  // SALVATAGGIO PREFERENZE
  const savePreferences = (choice) => {

    const value = {
      necessary: true,
      analytics: false,
      marketing: false,
      choice: choice,
      savedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(value)
      );
    } catch (_) {}

    if (banner) {
      banner.hidden = true;
    }

    if (modal) {
      modal.hidden = true;
    }

  };

  // ACCETTA COOKIE
  document.getElementById("accept-cookies")
    ?.addEventListener("click", () => {
      savePreferences("accepted");
    });

  // RIFIUTA COOKIE
  document.getElementById("reject-cookies")
    ?.addEventListener("click", () => {
      savePreferences("rejected");
    });

  // SALVA PERSONALIZZAZIONE
  document.getElementById("save-cookie-settings")
    ?.addEventListener("click", () => {
      savePreferences("custom");
    });

  // APRI IMPOSTAZIONI
  document.querySelectorAll("[data-open-cookie-settings]")
    .forEach(button => {

      button.addEventListener("click", () => {

        if (modal) {
          modal.hidden = false;
        }

      });

    });

  // CHIUDI IMPOSTAZIONI
  document.getElementById("close-cookie-settings")
    ?.addEventListener("click", () => {

      if (modal) {
        modal.hidden = true;
      }

    });

  modal?.addEventListener("click", event => {

    if (event.target === modal) {
      modal.hidden = true;
    }

  });

  // FORM CONTATTI - FORMSPREE
  const form = document.getElementById("contact-form");

  if (form && form.action.includes("INSERISCI_ID")) {

    form.addEventListener("submit", event => {

      event.preventDefault();

      alert(
        "Il modulo non è ancora attivo. Inserisci il tuo ID Formspree nell'attributo action del modulo."
      );

    });

  }

});
