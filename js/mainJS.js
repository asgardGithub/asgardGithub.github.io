
var papelitos = []; 

var coso = document.getElementById("arre");

function addPapel() {
	if (document.getElementById("personaje").value=="") {
		alert("El cuadro de texto esta vacio!");
	} else {
		papelitos.push(document.getElementById("personaje").value); 
		document.getElementById("personaje").value=''; 
		document.getElementById("cantidad").innerHTML=papelitos.length;
	
		coso.innerHTML = String(papelitos);

	}
}

