var puntAzu = 0;
var puntRoj = 0;
var seconds = 60;
var numPap = 0;
var turno = 1;
var etapas = 1;
var aciertos = 0;
var bowlMaster = [];
var bowlSlave = [];
var blueScore = document.getElementById("puntAz");
var redScore = document.getElementById("puntRo");
var blueScore2 = document.getElementById("puntAz2");
var redScore2 = document.getElementById("puntRo2");
var winner = document.getElementById("win");
winner.style.visibility = "hidden";
var pap = document.getElementById("papel");
var epa = document.getElementById("etapa");
var gol1 = document.getElementById("goles");
var pap1 = document.getElementById("papls");

var torre = document.getElementById("arreglo");

var lastSeg = new Audio();
lastSeg.src = "../sounds/5segundos.mp3";
var acier = new Audio();
acier.src = "../sounds/acierto.mp3";
var horn = new Audio();
horn.src = "../sounds/airhorn.mp3";
var rand = new Audio();
rand.src = "../sounds/papel.mp3";
var turndown = new Audio();
turndown.src = "../sounds/turndown.mp3";
var newPap = new Audio();
newPap.src = "../sounds/newpap.mp3";
var team = new Audio();
team.src = "../sounds/ranteam.mp3";

var scrollY = 0;
var distance = 40;
var speed = 20;



//    F U N C I O N E S    //

document.onkeydown = function(event) {
    var key_press = String.fromCharCode(event.keyCode);
    var key_code = event.keyCode;
    if(key_code == 13) {
        addPapel();
    }
}

function autoScrollTo(elDiv) {
    var currentY = window.pageYOffset;
    var targetY = document.getElementById(elDiv).offsetTop;
    var bodyHeight = document.body.offsetHeight;
    var yPos = currentY + window.innerHeight;
    var animator = setTimeout('autoScrollTo(\''+elDiv+'\')',speed);
    
    if (currentY < targetY) {
        if (yPos > bodyHeight) {
            clearTimeout (animator);
        } else {
            speed = 20;
            if (currentY < targetY - distance) {
                scrollY = currentY + distance;
                window.scroll(0, scrollY);
            } else {
                clearTimeout(animator);
            }
        }
    } else {
        speed = 5;
        if (currentY > targetY) {
            scrollY = currentY - distance;
            window.scroll(0, scrollY);
        } else {
            clearTimeout(animator);
        }
    }    
}

function countdown() {
    document.getElementById("papel").style.color = "white";
    document.getElementById("acierto").disabled = false;
    document.getElementById("pasar").disabled = false;
    document.getElementById("finTime").disabled = false;
    turno ++;
    numPap = Math.floor(Math.random()*bowlSlave.length);
    pap.innerHTML = String(bowlSlave[numPap]);
    if (turno % 2 === 1) {
        document.getElementById("comAzu").disabled = true;
        document.getElementById("comRoj").disabled = false;
    } else {
        document.getElementById("comAzu").disabled = false;
        document.getElementById("comRoj").disabled = true;
    }
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML = String(seconds);
        if( seconds > 5 && bowlSlave.length !== 0) {
            setTimeout(tick, 1000);
        } else if (seconds > 0 && bowlSlave.length !== 0) {
            setTimeout(tick, 1000);
            lastSeg.play();
        } else {
            counter.innerHTML = String(seconds);
            document.getElementById("papel").style.color = "red";
            pap.innerHTML = String("tiempo cumplido");
            seconds = 60;
            horn.play();
            document.getElementById("acierto").disabled = true;
            document.getElementById("pasar").disabled = true;
            document.getElementById("finTime").disabled = true;
            counter.innerHTML = String(seconds);
            aciertos = 0;
            gol1.innerHTML = String(aciertos);
        }
    }
    tick();
}

function endTime() {
    pap.innerHTML = String("tiempo cumplido");
    seconds = 0;
    counter.innerHTML = String("60");
}

function detEtap() {
    bowlSlave = Array.from(bowlMaster);
    pap1.innerHTML = String(bowlSlave.length);
    var ani = "animated zoomIn";
    torre.innerHTML = String(bowlSlave);

    switch (etapas) {
        case 1:
            epa.innerHTML = String("Etapa en juego : Tabu");
            break;
        case 2:
            $("#etapa").addClass(ani).one("animationend", function() {
            $(this).removeClass(ani);
        }); 
            epa.innerHTML = String("Etapa en juego : Una sola palabra");
            break;
        case 3:
            $("#etapa").addClass(ani).one("animationend", function() {
            $(this).removeClass(ani);
        });        
            epa.innerHTML = String("Etapa en juego : Mimicas");
            break;
        case 4: 
            document.getElementById("comAzu").disabled = true;
            document.getElementById("comRoj").disabled = true;
            document.getElementById("acierto").disabled = true;
            document.getElementById("pasar").disabled = true;
            document.getElementById("finTime").disabled = true;
            autoScrollTo('divEnd');
            turndown.play();
            redScore2.innerHTML = String(puntRoj);
            blueScore2.innerHTML = String(puntAzu);
            if (puntAzu < puntRoj) {
                winner.innerHTML = String("ganador: equipo rojo");
                setInterval(function() {$("#scoreRojo2").addClass("animated tada").one("animationend", function() {
            $(this).removeClass("animated tada");
            });},1500); 
            } else if (puntRoj < puntAzu) {
                winner.innerHTML = String("ganador: equipo azul");
                setInterval(function() {$("#scoreAzul2").addClass("animated tada").one("animationend", function() {
            $(this).removeClass("animated tada");
            });},1500); 
            } else {
                winner.innerHTML = String("empate")
            }
            epa.innerHTML = String("FIN DEL JUEGO");
            winner.style.visibility = "visible";
    }
} 

function pass() {
    var numRan = Math.floor(Math.random()*bowlSlave.length);
    if (bowlSlave[numRan] !== bowlSlave[numPap] && bowlSlave.length > 1) {
        numPap = numRan;
        pap.innerHTML = String(bowlSlave[numPap]);
        seconds = seconds - 3;
        $("#pasar").addClass("animated wobble").one("animationend", function() {
            $(this).removeClass("animated wobble");
        }); 
    } else if (bowlSlave.length > 1) {
        pass()
    } else if (bowlSlave.length === 1) {
        $("#pasar").addClass("animated wobble").one("animationend", function() {
            $(this).removeClass("animated wobble");
        }); 
        numPap = 0;
        pap.innerHTML = String(bowlSlave[numPap]);
    } else {
        endTime();
        etapas ++;
        detEtap();
    }
}   

function oks() {
    aciertos ++;
    bowlSlave.splice(numPap, 1);
    torre.innerHTML = String(bowlSlave);
    gol1.innerHTML = String(aciertos);
    pap1.innerHTML = String(bowlSlave.length);
    gol1.innerHTML = String(aciertos);
    $("#acierto").addClass("animated wobble").one("animationend", function() {
            $(this).removeClass("animated wobble");
        }); 
    if (turno % 2 === 0) {
        puntRoj ++;
        redScore.innerHTML = String(puntRoj);
    } else {
        puntAzu ++;
        blueScore.innerHTML = String(puntAzu);
    }
    pass();
}

function addPapel() {
    if (document.getElementById("personaje").value=="") {
        alert("El cuadro de texto esta vacio!");
    } else {
        newPap.play();
        bowlMaster.push(document.getElementById("personaje").value); 
        document.getElementById("personaje").value=''; 
        document.getElementById("cantiPap").innerHTML=bowlMaster.length;
        $("#bowlChico").addClass("animated rubberBand").one("animationend", function() {
            $(this).removeClass("animated rubberBand");
        });
        coso.innerHTML = String(bowlMaster);
        detEtap();
    }
}

function equipoRand() {
    var Equi = Math.floor(Math.random()*2); 
    team.play();
    if (Equi % 2 === 1) {
        document.getElementById("botonEquipo").style.background = "red";
        $("#bowlChico2").addClass("animated shake").one("animationend", function() {
            $(this).removeClass("animated shake");
        });

        setTimeout(function(){ document.getElementById("botonEquipo").style.background = "white"; }, 2000);
    } else {
        document.getElementById("botonEquipo").style.background = "blue";
        $("#bowlChico2").addClass("animated shake").one("animationend", function() {
            $(this).removeClass("animated shake");
        });
        setTimeout(function(){ document.getElementById("botonEquipo").style.background = "white"; }, 2000);
    }
}    

function newGame() {
    location.reload();
    
}

//    J U E G O    //
autoScrollTo('divHome');
detEtap();

redScore.innerHTML = String(puntRoj);
blueScore.innerHTML = String(puntAzu);
redScore2.innerHTML = String(puntRoj);
blueScore2.innerHTML = String(puntAzu);

document.getElementById("comAzu").disabled = true;
document.getElementById("acierto").disabled = true;
document.getElementById("pasar").disabled = true;
document.getElementById("finTime").disabled = true;

var papelitos = []; 

var coso = document.getElementById("arre");

setInterval(function() {$("#logoHome").addClass("animated tada").one("animationend", function() {
            $(this).removeClass("animated tada");
        });}, 8000);





