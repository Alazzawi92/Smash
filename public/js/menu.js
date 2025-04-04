document.addEventListener('DOMContentLoaded', function() {
  const select = document.getElementById('selectlaguage');
  
  // URLs des images de drapeaux pour chaque langue
  const flagUrls = {
      'fr': '/icons/fra_fr_france_flag_icon_255812.png',
      'en': '/icons/gb_flag_great_britain_england_union_jack_english_icon_228674.png'
  };

  // Fonction de mise à jour de l'affichage du drapeau
  function updateFlag() {
      // Récupération de l'option sélectionnée
      const selectedOption = select.options[select.selectedIndex];
      
      // Récupération de l'URL du drapeau correspondant
      const flagUrl = flagUrls[selectedOption.value];
      
      // Mise à jour du style du select pour afficher le drapeau
      select.style.backgroundImage = `url('${flagUrl}')`;
      if (selectedOption.value === 'fr') {
          select.style.backgroundSize = '35px';
          select.style.backgroundPosition = ' right 15px center';
      }else {
          select.style.backgroundSize = '25px'; 
      }

  }

  // Écouteur de changement sur le select
  select.addEventListener('change', updateFlag);
  
  // Appel initial pour initialiser l'affichage
  updateFlag();
});
const Mb = document.querySelector("#burger");
const Mp = document.querySelector("#pages");

// Fonction pour basculer le menu
function toggleMenu() {
  Mb.classList.toggle("active");
  Mp.classList.toggle("active");
}

// Fonction pour fermer le menu
function closeMenu() {
  Mb.classList.remove("active");
  Mp.classList.remove("active");
}

// Écouteurs d'événements
Mb.addEventListener("click", toggleMenu);
document
  .querySelectorAll("#pages a")
  .forEach((n) => n.addEventListener("click", closeMenu));
