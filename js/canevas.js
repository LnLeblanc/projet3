// Canvas
var canevas = document.querySelector("#canevas");
var context = canevas.getContext("2d");

// Création des variables pour le canvas: tableaux de données
var clicX = new Array();
var clicY = new Array();
var clicDrag = new Array();
var paint;

// Designe si le canvas est vide ou non
var empty = true;

// Fonction cliquer, pour mettre les données dans les tableaux
function cliquer(x, y, dragging) {
    clicX.push(x);
    clicY.push(y);
    clicDrag.push(dragging);
};

// fonction redraw
function redraw(){
    context.clearRect(0, 0, 200, 150);
    // style du trait
    context.strokeStyle = "black";
    context.lineJoin = "round";
    context.lineWidth = 2;
    // Fais apparaître ce que l'utilisateur dessine
    for(var i=0; i < clicX.length; i++) {		
        context.beginPath();
        if(clicDrag[i] && i){
            context.moveTo(clicX[i-1], clicY[i-1]);
        }else{
            context.moveTo(clicX[i]-1, clicY[i]);
        };
        context.lineTo(clicX[i], clicY[i]);
        context.closePath();
        context.stroke();
    }
};

// 3 fonctions souris
// Bouton enfoncé
canevas.addEventListener("mousedown", function(e) {
    empty = false;
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    paint = true;
    cliquer(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw(); 
});
// Souris en mouvement
canevas.addEventListener("mousemove", function(e){
    if(paint) { 
        cliquer(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
});
// Relachement du bouton
canevas.addEventListener("mouseup", function(e) {
    paint = false;
});

// Fonction effacer le contenu
function effacer() {
    empty = true;
    paint = false;
    context.clearRect(0, 0, 200, 150);
    clicX.splice(0, clicX.length);
    clicY.splice(0, clicY.length);
    clicDrag.splice(0, clicDrag.length);
};

// Effacer le contenu lors du clic sur le bouton effacer
document.getElementById("effacer").addEventListener("click", function(e) {
    effacer();
});