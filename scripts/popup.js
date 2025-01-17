/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à l'affichage et à la 
 * fermeture de la popup de détail des films. 
 * 
 *********************************************************************************/
/**
 * Cette fonction initialise le contenu de la popup de détails 
 */
async function populatePopup(filmId) {
    const filmData = await findFilmDetails(filmId);

    /* titre */
    let titre = document.querySelector(".entete h2");
    titre.innerText = filmData.title;

    /* année - genres */
    let detail1 = document.querySelector(".entete h3.element1");
    detail1.innerText = `${filmData.year} -`;
    for (let index = 0; index < filmData.genres.length; index++){
        detail1.innerText += ` ${filmData.genres[index]}, `;
    };

    /* classification - XXX minutes - (country1 - country2 - etc) */
    let detail2 = document.querySelector(".entete h3.element2");
    switch (true) {
        case filmData.rated <= 10:
            detail2.innerText = "G";
            break;
        case filmData.rated <= 13:
            detail2.innerText = "PG";
            break;
        case filmData.rated <= 17:
            detail2.innerText = "PG-13";
            break;
        case filmData.rated < 18:
            detail2.innerText = "R";
            break;
        case filmData.rated >= 18:
            detail2.innerText = "NC-17";
            break;
        default:
            detail2.innerText = "Unk";
    };
    detail2.innerText += ` - ${filmData.duration} minutes (`;
    for (let i = 0 ; i < filmData.countries.length; i++){
        detail2.innerText += ` ${filmData.countries[i]}`;
    };
    detail2.innerText += ` )`;

    /* IMDB score: XX.XX */
    let detail3 = document.querySelector(".entete h3.element3");
    detail3.innerText = `IMDB score: ${filmData.imdb_score}`;
    console.log(detail3)
    /* Recettes mondiales */
    let detail4 = document.querySelector(".entete h3.element4");
    console.log(detail4)
    console.log(filmData.worldwide_gross_income)
    if (filmData.worldwide_gross_income) {
        detail4.innerText = `Worldwide income : ${filmData.worldwide_gross_income}$`  
    } else {
        detail4.innerText = "Worldwide income : unknown"
    }
    /* réalisateur */ 
    let detail5 = document.querySelector(".entete p.element5");;
    detail5.innerText = `${filmData.directors}`;

    /* affiche du film ou celle par défaut*/ 
    let image = document.querySelector(".popup img");
    image.src = filmData.image_url;
    image.alt = `affiche du film ${filmData.title}`;
    image.addEventListener("error", () => {
        image.src = "images/default.jpg";
        image.alt = "image par défaut";
      })

    /* longue description */ 
    let element1 = document.querySelector(".description p.element1");
    element1.innerText = filmData.long_description;

    /* distribution */ 
    let element2 = document.querySelector(".distribution p.element2");
    element2.innerText = filmData.actors; 
}

/**
 * Cette fonction affiche la popup pour détailler la description. 
 */
function afficherPopup(positionY) {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut, ajouter la classe "active"
    // va changer son display et la rendre visible. 
    popupBackground.classList.add("active")
    
    /* afficher la popup à la hauteur du clic */   
    popupBackground.style.top= `${positionY}px`
}

/**
 * Cette fonction cache la popup pour détailler la description. 
 */
function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    // La popup est masquée par défaut, supprimer la classe "active"
    // va rétablir cet affichage par défaut. 
    popupBackground.classList.remove("active")
}
/**
 * Cette fonction recherche les données sur un film dans l'api
 **/
async function findFilmDetails(filmId){
    const filmUrl = `http://localhost:8000/api/v1/titles/${filmId}`
    const filmData = await findDataInApi(filmUrl);
    return filmData
    }
