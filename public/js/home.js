document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("selectlaguage");
  const Mb = document.querySelector("#burger");
  const Mp = document.querySelector("#pages");

  // URLs des images de drapeaux pour chaque langue
  const flagUrls = {
    fr: "/icons/fra_fr_france_flag_icon_255812.png",
    en: "/icons/gb_flag_great_britain_england_union_jack_english_icon_228674.png",
  };

  /**
   * Met à jour l'affichage du drapeau dans le select
   */
  function updateFlag() {
    const selectedOption = select.options[select.selectedIndex];
    const flagUrl = flagUrls[selectedOption.value];
    select.style.backgroundImage = `url('${flagUrl}')`;
    select.style.backgroundSize =
      selectedOption.value === "fr" ? "35px" : "25px";
    select.style.backgroundPosition = "right 15px center";
  }

  // Initialisation du drapeau
  updateFlag();
  // Écouteur de changement de langue
  select.addEventListener("change", function () {
    const selectedLang = this.value;
    window.location.href = `/change-lang/${selectedLang}`;
  });

  /**
   * Gestion du défilement fluide pour la navigation
   */
  document.querySelectorAll("#pages a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const navHeight = document.querySelector("nav").offsetHeight;
      const windowHeight = window.innerHeight;
      const targetHeight = targetElement.offsetHeight;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        windowHeight / 2 +
        targetHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /**
   * Gestion du menu burger
   */
  function toggleMenu() {
    Mb.classList.toggle("active");
    Mp.classList.toggle("active");
  }

  function closeMenu() {
    Mb.classList.remove("active");
    Mp.classList.remove("active");
  }

  Mb.addEventListener("click", toggleMenu);
  document
    .querySelectorAll("#pages a")
    .forEach((n) => n.addEventListener("click", closeMenu));

  const btnCliquez = document.getElementById("btnCliquez");
  const infoCarte = document.getElementById("infoCarte");
  const qustion = document.getElementById("QUESTION");

  btnCliquez.addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement
    // Bascule l'affichage de la carte
    if (infoCarte.style.display === "none" || infoCarte.style.display === "") {
      infoCarte.style.display = "block";
      qustion.style.marginTop = "100px";
    } else {
      infoCarte.style.display = "none";
      ;
    }
  });
  // Masquer la carte si on clique en dehors
  document.addEventListener("click", (event) => {
    if (
      infoCarte.style.display === "block" &&
      !infoCarte.contains(event.target)
    ) {
      infoCarte.style.display = "none";
      qustion.style.marginTop = "0px";
    }
  });

  document.cookie = "lang=; max-age=0; path=/"; // Supprime le cookie 'lang'
  if (selectedOption === fr) {
    document.cookie = "lang=; max-age=0; path=/"; // Supprime le cookie 'lang';
  }
  if (selectedOption === en) {
    window.location.href = "/change-lang/en";
  }
});
