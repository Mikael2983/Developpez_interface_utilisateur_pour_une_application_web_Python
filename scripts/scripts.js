/*****************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à la surveillance des
 * évenements de la page
 * 
 *****************************************************************************/
/**
 *  initialisation les écouteurs d'événements qui concernent 
 * le choix de la catégorie du menu déroulant . 
 */
let categoriesDropdown = document.getElementById("categoriesDropdown");
categoriesDropdown.addEventListener("change", (event) => {
  populateCategory(event.target.value,".Category3-", 6);
});

/**
 * initialisation les écouteurs d'événements qui concernent 
 * l'affichage de la popup. 
 */
let listButton = document.querySelectorAll("button");

for (let index = 0; index < listButton.length; index++) {
  listButton[index].addEventListener("click", (event) => {
    
    if(event.target.classList.contains("fermer")){
      hidePopup();
    } else {
      if (event.target.classList.contains("button")){
      populatePopup(event.target.title);
      
      const mouseY = event.pageY + 200;

      displayPopup(mouseY);
      };
    };
  });
};
/**
 * initialisation les écouteurs d'événements qui concernent l'extension de
 * l'affichage des catégories en responsive. 
 */
let plus = document.querySelectorAll(".plus");

for (let index = 0; index < plus.length; index ++) {
  plus[index].addEventListener("click", (event) => {

    if (event.target.textContent === "Voir plus"){
      event.target.textContent = "Voir moins";
      gridItem = document.querySelectorAll(`.${event.target.title} .grid-item`);
      
      for (let item = 0; item< gridItem.length; item ++){
        gridItem[item].classList.remove("tablette");
        gridItem[item].classList.remove("mobile");
      }
      
    } else{
      
      event.target.textContent = "Voir plus";
      gridItem = document.querySelectorAll(`.${event.target.title} .grid-item`);
      
      for (let item = 4; item< gridItem.length; item ++){
        gridItem[item].classList.add("tablette");
      };
      for (let item = 2; item< gridItem.length; item ++){
        gridItem[item].classList.add("mobile");
      };
    };
  });
  };