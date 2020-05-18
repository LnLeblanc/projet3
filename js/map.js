// Variables
var details = document.getElementById("details");
var nomStation = document.getElementById("nomStation");
var adresse = document.getElementById("adresse");
var ouvert = document.getElementById("ouvert");
var places = document.getElementById("places");
var velo = document.getElementById("velo");

// carte avec marqueurs
//Initialisation de la carte
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.750000, lng: 4.850000},
        zoom: 14
    });
    // Récupération des données opendata de la ville de Paris
    ajaxGet("https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&maxfeatures=30&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&SRSNAME=urn%3Aogc%3Adef%3Acrs%3AEPSG%3A%3A4171", function(reponse) {
        // transformation des données en tableau d'éléments
        var infos = JSON.parse(reponse);
        var tableauMarkers = [];
        // Récupération des informations pour chaque station
        var elements = infos.features.forEach(function(element) {
            var Station = {
                nom: element.properties.name,
                coordonnees: {
                    0: element.properties.lat,
                    1: element.properties.lng },
                adresse: element.properties.address,
                velos: element.properties.bike_stands,
                dispo: element.properties.available_bikes,
                ouvert: element.properties.status
            };
            // Création des marqueurs affichés sur la carte
            var marker = new google.maps.Marker({
                position: {
                    lat: Station.coordonnees[0],
                    lng: Station.coordonnees[1]
                },
                map: map,
                title: Station.nom
            });
            // couleurs des marqueurs
            if (Station.ouvert === "OPEN" && Station.dispo != "0") {
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
            } else if (Station.ouvert === "CLOSED") {
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            } else {
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
            };
            // Lors du clic sur les marqueurs
            marker.addListener("click", function() {
                // Fais apparaître l'aside
                details.style.display = "block";
                // Récupération des informations sur la station pour les afficher dans l'aside
                nomStation.textContent = Station.nom;
                var nouveauTitre = nomStation.textContent;
                var sansLesChiffres = nouveauTitre.substring(7,nouveauTitre.length);
                nomStation.textContent = sansLesChiffres;
                // api web storage, enregistrement du nom de la station
                window.sessionStorage.setItem("stationChoisie", sansLesChiffres);
                adresse.textContent = Station.adresse;
                window.sessionStorage.setItem("refAdresse", adresse.textContent);
                if (Station.ouvert === "OPEN") {
                    ouvert.textContent = "Station ouverte";
                    ouvert.style.color = "green";
                } else if (Station.ouvert === "CLOSED") {
                    ouvert.textContent = "Station fermée";
                    ouvert.style.color = "red";
                };
                window.sessionStorage.setItem("refOuvert", ouvert.textContent);
                window.sessionStorage.setItem("colOuvert", ouvert.style.color);
                places.textContent = Station.velos;
                window.sessionStorage.setItem("refPlaces", places.textContent);
                velo.textContent = Station.dispo;
                // api web storage, enregistrement du nombre de vélos dispo
                window.sessionStorage.setItem("velosDispo", Station.dispo);
                // Cache le canvas et le texte d'infos erreur
                boutonRes.style.display = "block";
                cadreCanevas.style.display = "none";
                pasDispo.style.display = "none";
            });
            tableauMarkers.push(marker);
        });
        // Cluster quand on dézoome une fois sur la carte
        var options = {
            maxZoom: 14,
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        };
        var markerCluster = new MarkerClusterer(map, tableauMarkers, options);
    });
};