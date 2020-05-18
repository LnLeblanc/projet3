// fonctionnalités des boutons de réservation

// Bouton de réservation pour faire apparaitre le canvas
// Création des variables
var boutonRes = document.querySelector("button");
var cadreCanevas = document.getElementById("cadreCanevas");
var etatRes = document.getElementById("etatRes");
var dispo = document.getElementById("velo");
// Création de l'élément pasDispo: texte d'avertissement si erreur de l'utilisateur
var pasDispo = document.createElement("p");
pasDispo.textContent = "";
pasDispo.style.color = "red";
document.getElementById("details").appendChild(pasDispo);
pasDispo.style.display = "none";

//Lors du clic sur le bouton 
boutonRes.addEventListener("click", function(e) {
    e.preventDefault();
    // Si 0 vélos à la station, message d'erreur
    if (dispo.textContent === "0") {
        pasDispo.textContent = "Aucun vélo disponible à cette station pour le moment.";
        pasDispo.style.display = "block";
    } 
    // Sinon apparition du canvas pour la signature
    else if (dispo.textContent > 0 && etatRes.style.display != "none") {
        pasDispo.style.display = "none";
        boutonRes.style.display = "none";
        cadreCanevas.style.display = "block";
    // Si une réservation est déjà en cours
    } else if (dispo.textContent > 0 && etatRes.style.display === "none") {
        pasDispo.textContent = "Vous ne pouvez réserver qu'un vélo à la fois, cette réservation annulera la précédente";
        pasDispo.style.display = "block";
        boutonRes.style.display = "none";
        cadreCanevas.style.display = "block";
    };
});

// fonctionnalités du bouton de réservation sous le canvas
// variables
var reserver = document.getElementById("reserver");
var nomStation = document.getElementById("nomStation");
var getStation = document.getElementById("getStation");
var velo = document.getElementById("velo");
var etatRes2 = document.getElementById("etatRes2");

// Compteur
var compteurMinElt = document.getElementById("minutes");
var compteurSecElt = document.getElementById("secondes");
var chrono;
var interval;

function decompte() { 
        resaEnCours = true;
        //on divise la valeur du compteur et on arrondit pour les minutes, on prend le modulo de 60 pour les secondes
        var tempsRestant = sessionStorage.fin - (Date.now() * 0.001);
		var min = Math.floor(tempsRestant/60); 
		var secondes = tempsRestant%60; 
        var sec = Number(String(secondes).charAt(0) + String(secondes).charAt(1));
        // Affiche les secondes avec un 0 si elles sont inférieures à 10
		if (sec < 10) {
            sec = '0'+sec;
        } 
        compteurMinElt.textContent = min;
        compteurSecElt.textContent = sec;
        tempsRestant --;
        if (tempsRestant < 0) {
            clearInterval(interval);
            etatRes2.style.display = "none";
            etatRes.style.display = "block";
        }
};  

// récupération du chrono pour le rafraichissement de la page
var resaEnCours = false;
// fonction clic
reserver.addEventListener("click", function(e) {
    e.preventDefault();
    // Si l'utilisateur n'a pas signé, message d'erreur
    if (empty === true) {
        pasDispo.style.display = "block";
        pasDispo.textContent = "Signature obligatoire pour réserver";
    } 
    // si l'utilisateur a bien signé
    else {
        clearInterval(interval);
        // recupération du temps restant sur le chrono pour le rechargement de la page
        chrono = Date.now();
        var fin = (chrono * 0.001) + 1200;
        sessionStorage.setItem("fin", fin);
        // efface le contenu du canvas (au cas où l'utilisateur ferait une autre réservation plus tard) et cache le canvas 
        effacer();
        pasDispo.style.display = "none";
        cadreCanevas.style.display = "none";
        // Décrémente le nombre de vélos disponibles à cette station d'un vélo (puisqu'un vélo a été réservé)
        var veloMoins = Number(velo.textContent -1);
        sessionStorage.setItem("veloMoins", veloMoins);
        velo.textContent = sessionStorage.veloMoins;
        // Fais réapparaitre le bouton de réservation du début
        boutonRes.style.display = "block";
        // Change le message de l'état de la réservation 
        etatRes.style.display = "none";
        etatRes2.style.display = "block";
        getStation.textContent = sessionStorage.stationChoisie;
        interval = setInterval(decompte, 1000);
        decompte();
    };
});

// si on a cliqué sur réserver, un vélo en moins est stoqué dans sessionStorage et une réservation est en cours
if (sessionStorage.veloMoins != undefined) {
    resaEnCours = true;
};

// récupération et affichage des informations de l'aside au rechargement de la page si un marqueur a été selectionné
if (sessionStorage.stationChoisie != undefined) {
    details.style.display = "block";
    nomStation.textContent = sessionStorage.stationChoisie;
    adresse.textContent = sessionStorage.refAdresse;
    ouvert.textContent = sessionStorage.refOuvert;
    ouvert.style.color = sessionStorage.colOuvert;
    places.textContent = sessionStorage.refPlaces;
    if (etatRes.style.display === "none") {
        dispo.textContent = sessionStorage.veloMoins;
    } else {
        dispo.textContent = sessionStorage.velosDispo;
    };
};

// Affichage du chrono et des infos de réservation si une réservation est en cours
if (resaEnCours === true) {
    // Arrêt du décompte en cours
    clearInterval(interval);
    // récupération du chrono en cours
    var heureActuelle = Date.now();
    var tempsRestant = sessionStorage.fin - (heureActuelle * 0.001);
    // Relance du chrono avec le temps qui reste
    decompte();
    interval = setInterval(decompte, 1000);
    // velo = 1 vélo en moins, message de réservation, nom de la station choisie dans le message
    velo.textContent = sessionStorage.veloMoins;
    etatRes.style.display = "none";
    etatRes2.style.display = "block";
    getStation.textContent = sessionStorage.stationChoisie;
};