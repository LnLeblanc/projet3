// slider
// Tableau des images et textes
var image = new Array();
    image[0] = document.getElementById("img1");
    image[1] = document.getElementById("img2");
    image[2] = document.getElementById("img3");
    image[3] = document.getElementById("img4");
    image[4] = document.getElementById("img5");
    image[5] = document.getElementById("img6");
    image[6] = document.getElementById("img7");

var cercle = new Array();
    cercle[0] = document.getElementById("cercle1");
    cercle[1] = document.getElementById("cercle2");
    cercle[2] = document.getElementById("cercle3");
    cercle[3] = document.getElementById("cercle4");
    cercle[4] = document.getElementById("cercle5");
    cercle[5] = document.getElementById("cercle6");
    cercle[6] = document.getElementById("cercle7");

// Déclaration des variables pour le slider
var curentImg = document.querySelector(".affiche");
var imagePlus = image[1];
var imageMoins = image[image.length-1];
var curentCercle = document.querySelector(".fa-circle");
var i = Number();
// Fonction pour supprimer la classe de l'élément en cours
function supprimerClasse () {
    curentImg.classList.remove("affiche");
    curentCercle.classList.remove("fa-circle");
    curentCercle.classList.add("fa-circle-o");
};
// Fonction pour ajouter une classe au nouvel élément en cours
function ajouterClasse () {
    if(curentImg === imagePlus) {
        imagePlus.classList.add("affiche");
    } else if(curentImg === imageMoins) {
        imageMoins.classList.add("affiche");
    };
    switch(curentImg) {
        case (curentImg = image[0]):
            imagePlus = image[1];
            imageMoins = image[0];
            curentCercle = cercle[0];
            break;
        case (curentImg = image[1]):
            imagePlus = image[2];
            imageMoins = image[0];
            curentCercle = cercle[1];
            break;
        case (curentImg = image[2]):
            imagePlus = image[3];
            imageMoins = image[1];
            curentCercle = cercle[2];
            break;
        case (curentImg = image[3]):
            imagePlus = image[4];
            imageMoins = image[2];
            curentCercle = cercle[3];
            break; 
        case (curentImg = image[4]):
            imagePlus = image[5];
            imageMoins = image[3];
            curentCercle = cercle[4];
            break;
        case (curentImg = image[5]):
            imagePlus = image[6];
            imageMoins = image[4];
            curentCercle = cercle[5];
            break;
        case (curentImg = image[6]):
            imagePlus = image[0];
            imageMoins = image[5];
            curentCercle = cercle[6];
            break;
    };   
    curentCercle.classList.remove("fa-circle-o");
    curentCercle.classList.add("fa-circle");
};

// Ce qu'il se passe quand l'utilisateur passe à l'image de droite
function imageDroite() {
    supprimerClasse();
    curentImg = imagePlus;
    ajouterClasse();
    return curentImg;
};
// Ce qu'il se passe quand l'utilisateur passe à l'image de gauche
function imageGauche() {
    supprimerClasse();
    curentImg = imageMoins;
    ajouterClasse();
    return curentImg;
};

// fonction lors du clic sur la flèche droite
document.getElementById("droite").addEventListener("click", function(e) {
    e.preventDefault();
    imageDroite(); 
});
// fonction lors du clic sur la flèche gauche
document.getElementById("gauche").addEventListener("click", function(e) {
    e.preventDefault();
    imageGauche();
});

// fonction changement d'image et de texte lors de l'appui sur les flèches du clavier
document.addEventListener("keydown", function(e) {
    e.preventDefault();
    // flèche droite
    if(e.keyCode === 39) {
        imageDroite();
    };
    // flèche gauche
    if(e.keyCode === 37) {
        imageGauche();
    };
});