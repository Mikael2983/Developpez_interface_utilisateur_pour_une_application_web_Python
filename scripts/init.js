/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à l'initialisation
 * de la page index. 
 * 
 *********************************************************************************/

/**
 * Cette fonction renvoie les données de l'api. 
 */
async function findDataInApi(url){
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;  
          
} catch (error) {
  console.error("Erreur lors de la récupération des catégories :", error);
}}

/**
 * Cette fonction recherche la liste des catégories disponibles. 
 */
async function fetchCategories() {
  const baseUrl = "http://localhost:8000/api/v1";
  const endpoint = "/genres/?page_size=30";
  const categories = [];

  let url = `${baseUrl}${endpoint}`;
  const data = await findDataInApi(url);

  const names = data.results.map(category => category.name);
  categories.push(...names);      
            
  return categories;
  }

/**
 * Cette fonction remplit les options du menu déroulant. 
 */  
async function populateDropdown() {
  const categories = await fetchCategories();

  let dropdown = document.getElementById("categoriesDropdown");

  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.value = categories[i];
    option.textContent = categories[i]; 
    dropdown.appendChild(option);
  };
  };
/**
 * Cette fonction sélectionne une option aléatoire du menu déroulant. 
 */
async function selectRandomOption(){
  await populateDropdown();
  let dropdown = document.getElementById("categoriesDropdown");
  let randomIndex = Math.floor(Math.random() * dropdown.options.length);
  dropdown.selectedIndex = randomIndex;
  return dropdown.options[randomIndex].value;
};
/**
 * Cette fonction recherche le top "outputNumber" des films
 * de la catégorie. 
 */
async function fetchRatedFilm(category, outputNumber){
  const baseUrl = "http://localhost:8000/api/v1";
  const endpoint = "/titles/";
  let criterium = `?page_size=${outputNumber}&sort_by=-imdb_score`;
  if (category !== "all") {
    criterium += `&genre=${category}`;
  };

  let url = `${baseUrl}${endpoint}${criterium}`;
  let films = [];

  let data = await findDataInApi(url);
  films.push(...data.results);    
  return films; 
  };

/**
 * Cette fonction remplit la grid "htmlClass" de "outputNumber" éléments de la 
 * catégorie "category" sélectionnée.
 */
async function populateCategory(category, htmlClass, outputNumber) {
  
  const filmsData = await fetchRatedFilm(category, outputNumber);
  
  for (let i = 0; i < outputNumber ; i++){

    let filmData = filmsData[i];
    let selector = htmlClass+`${i+1}`;

    const grid = document.querySelector(selector);
    let btn = document.querySelector('button[title="result"]');

    // options spécifiques à la section "Autre"
    if (htmlClass === ".C3-"){
      // Cacher la div si la liste des films ne comporte pas 6 éléments
      if (filmData === undefined){
        grid.classList.add("hide");

        // Masquer les boutons "Voir plus" s'ils ne sont pas nécessaire
        if (filmsData.length <= 4 
            && !btn.classList.contains("tablette-useless")){ 
          btn.classList.add("tablette-useless");
        };
        if (filmsData.length <= 2 
            && !btn.classList.contains("mobile-useless")){ 
          btn.classList.add("mobile-useless");
          btn.classList.remove("tablette-useless");
        };
        
      continue;
      };
    };
  
    btn.classList.remove("mobile-useless");
    btn.classList.remove("tablette-useless");
    grid.classList.remove("hide");
    
    const image = document.querySelector(selector+" img");
    image.src = filmData.image_url;
    image.alt = `affiche du film ${filmData.title}`;

    // Gestion des erreurs de chargement
    image.onerror = () => {
      image.src = "images/default.jpg";
      image.alt = "image par défaut";
    };

    // Options spécifiques à  la section "meilleur film"
    if (selector === ".C0-1"){
      const filmDataDetails = await findFilmDetails(filmData.id);
      
      const title = document.querySelector(selector+" h2");
      title.textContent = filmDataDetails.title;
  
      const description = document.querySelector(selector+" p");
      description.innerText = filmDataDetails.description;

    } else {
      const p = document.querySelector(selector+" p");
      p.innerText = filmData.title;
    }

    const button = document.querySelector(selector+" button");
    button.title = filmData.id;
    }
  }

/**
 * Cette fonction initialise l'affichage de la page. 
 */
async function run(){
  let listCategories = [ ["all", 7] , ["Action",6] , ["Mystery", 6] ];

  const randomCategory = await selectRandomOption();
  listCategories.push([randomCategory,6]);

  for (let i = 0; i< listCategories.length; i++){
    populateCategory(listCategories[i][0], `.C${i}-`, listCategories[i][1]);
  };
}  

run()
