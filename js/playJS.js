var puntAzu = 0;
var puntRoj = 0;
var seconds = 60;
var numPap = 0;
var turno = 1;
var etapas = 1;
var aciertos = 0;
var bowlMaster = ["pablo","daniel","richieri","suarez"];
var bowlSlave = [];
var blueScore = document.getElementById("puntAz");
var redScore = document.getElementById("puntRo");
var winner = document.getElementById("win");
winner.style.visibility = "hidden";
var pap = document.getElementById("papel");
var epa = document.getElementById("etapa");
var gol1 = document.getElementById("goles");
var pap1 = document.getElementById("papls");

var torre = document.getElementById("arreglo");

//    F U N C I O N E S    //

function countdown() {
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
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            counter.innerHTML = String(seconds);
            pap.innerHTML = String(". . . . .");
            seconds = 60;
            document.getElementById("acierto").disabled = true;
            document.getElementById("pasar").disabled = true;
            document.getElementById("finTime").disabled = true;
            setTimeout(function() {
                alert("Tiempo cumplido");
            }, 0);
            counter.innerHTML = String(seconds);
            aciertos = 0;
            gol1.innerHTML = String(aciertos);
        }
    }
    tick();
}

function endTime() {
    pap.innerHTML = String(". . . . .");
    seconds = 0;
    counter.innerHTML = String("60");
}

function detEtap() {
    bowlSlave = Array.from(bowlMaster);
    pap1.innerHTML = String(bowlSlave.length);
    
    torre.innerHTML = String(bowlSlave);

    switch (etapas) {
        case 1:
            epa.innerHTML = String("Etapa en juego : Tabu");
            break;
        case 2:
            epa.innerHTML = String("Etapa en juego : Una sola palabra");
            break;
        case 3:
            epa.innerHTML = String("Etapa en juego : Mimicas");
            break;
        case 4: 
            document.getElementById("comAzu").disabled = true;
            document.getElementById("comRoj").disabled = true;
            document.getElementById("acierto").disabled = true;
            document.getElementById("pasar").disabled = true;
            document.getElementById("finTime").disabled = true;
            if (puntAzu < puntRoj) {
                winner.innerHTML = String("ganador: equipo rojo");
            } else if (puntRoj < puntAzu) {
                winner.innerHTML = String("ganador: equipo azul");
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
    } else if (bowlSlave.length > 1) {
        pass()
    } else if (bowlSlave.length === 1) {
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
    if (turno % 2 === 0) {
        puntRoj ++;
        redScore.innerHTML = String(puntRoj);
    } else {
        puntAzu ++;
        blueScore.innerHTML = String(puntAzu);
    }
    pass();
}

//    J U E G O    //

detEtap();

redScore.innerHTML = String(puntRoj);
blueScore.innerHTML = String(puntAzu);

document.getElementById("comAzu").disabled = true;
document.getElementById("acierto").disabled = true;
document.getElementById("pasar").disabled = true;
document.getElementById("finTime").disabled = true;
