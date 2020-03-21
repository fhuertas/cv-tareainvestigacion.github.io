//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Variables globales:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

var personId = Math.floor((Math.random() * 1000000) + 1);
//var personId = 9999;    //el ID se lo proporciona el tutor/a
var group =99; 
//var Balanceo = Math.floor(Math.random()*2 + 1);
var state=99;           //controla el ensayo dentro de cada fase
var stateTexto=99;      //controla la pantalla de textos
var fase = 0;           //controla en qué fase estamos
var stateQuest = 1;     //controla en qué pregunta del cuestionario estamos
var training=[];        //contendrá el array de ensayos
var data=[];            //contendrá los datos.
var fecha="";           //contendrá la fecha/hora.
var Cuestionario=[];    //contiene las respuestas al cuestionario de generalizacion

// TFK probando... 
var juiciorealizado =0;
var confianzaevaluada =0;
var riesgoevaluado =0;

//variables demográficas:
var Gender=""; 
var	Age=99;
var Experience=99
// var Curso="";

var BalPanel = Math.floor((Math.random() * 2) + 1); //para aleatorizar la posición del panel de respuesta para cada sujeto

var PregInduccionPrecio = "";
var PregInduccion = "";


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Funciones generales:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

//función para inyectar HTML:
function pintarHTML(targetDiv, htmlContenido){ 
	document.getElementById(targetDiv).innerHTML=htmlContenido;
}

//función para desordenar arrays...
function shuffle(array) {    
    var rand, 
        index = -1,        
        length = array.length,        
        result = Array(length);    
    while (++index < length) {        
        rand = Math.floor(Math.random() * (index + 1));        
        result[index] = result[rand];        
        result[rand] = array[index];    }    
    return result;
}




//función para rellenar arrays...
function fillArray(value, len) { 
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}
    
    
//funciones para mostrar/ocultar paneles:
function mostrar(panel){panel.style.display="block";}
function ocultar(panel){panel.style.display="none";}


//función de fecha:
function stringDate() {
  var fecha = new(Date);
  return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
}


//precache de imágenes (METER LAS IMÁGENES FINALES!!!):
var preloadImages="img/BatatrimBoton.png, img/DugetilBoton.png, img/enfermo.png, img/noBatatrimBoton.png, img/noDugetilBoton.png, img/Nooutcome.png, img/NooutcomeF2.png, img/outcome.png, img/Sano.png, img/stetoscope.png, img/outcome_F2.png, img/nooutcome_F2.png".split(",");
var tempIMG=[];

function preloadIMG(){
	for (var i=0;i<preloadImages.length;i++){
		tempIMG[i]=new Image();
		tempIMG[i].src=preloadImages[i];    }
}


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//Función ARRANCA:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

//función global
function arranca(){
    //preloadIMG();
    //GeneraEnsayos();
    group= "Experimental"; //se asigna el grupo manualmente
    // group= "Control"; //se asigna el grupo manualmente - TFK Parece que no va... 
    state=0;
    stateTexto=0;
    fase=0;
    
    //genero las cadenas de outcomes:
    
    switch (Fase1.Contingencia){
        case "ContNula": 
            
            for(var i=0; i<5; i++){ //creo 5 bloques de 10 con 70% de éxito
                var arrayOutcome= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
                arrayOutcome=shuffle(arrayOutcome);
                Fase1.posibleOutcomesYES=Fase1.posibleOutcomesYES.concat(arrayOutcome);
                var arrayOutcome2= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
                arrayOutcome2=shuffle(arrayOutcome2);
                Fase1.posibleOutcomesNO=Fase1.posibleOutcomesNO.concat(arrayOutcome2);
                
                var arrayOutcome3= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
                arrayOutcome3=shuffle(arrayOutcome3);
                Fase2.posibleOutcomesYES=Fase1.posibleOutcomesYES.concat(arrayOutcome3);
                var arrayOutcome4= [1, 1, 1, 1, 1, 1, 1, 0, 0, 0];
                arrayOutcome4=shuffle(arrayOutcome4);
                Fase2.posibleOutcomesNO=Fase2.posibleOutcomesNO.concat(arrayOutcome4);
                
            }
            break;
        case "ContPositiva":
            for(var i=0; i<5; i++){ //creo 5 bloques...
                var arrayOutcome= [1, 1, 1, 1, 1, 1, 0, 0];
                arrayOutcome=shuffle(arrayOutcome);
                Fase1.posibleOutcomesYES=Fase1.posibleOutcomesYES.concat(arrayOutcome);
                var arrayOutcome2= [1, 0, 0, 0, 0, 0, 0, 0];
                arrayOutcome2=shuffle(arrayOutcome2);
                Fase1.posibleOutcomesNO=Fase1.posibleOutcomesNO.concat(arrayOutcome2);
                
                var arrayOutcome3= [1, 1, 1, 1, 1, 1, 0, 0];
                arrayOutcome3=shuffle(arrayOutcome3);
                Fase2.posibleOutcomesYES=Fase2.posibleOutcomesYES.concat(arrayOutcome3);
                var arrayOutcome4= [1, 1, 1, 1, 1, 1, 0, 0];
                arrayOutcome4=shuffle(arrayOutcome4);
                Fase2.posibleOutcomesNO=Fase2.posibleOutcomesNO.concat(arrayOutcome4);
                
            }             
    }
    
    
    if(group=="control"){
        siguienteTexto();    
    }
    else if(group=="Experimental"){
        pregInduccion();
    }
	
    
    alert("Pulsa F11 para verme a pantalla completa.");
}


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//GENERACION DE ENSAYOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

//var ordenContingencias = shuffle(["ContNula", "ContPositiva"]); //decide al azar el orden de las fases
var ordenContingencias = shuffle(["ContNula", "ContNula"]); // No decided nada. 

var Fase1 = {
  	nombreClave: "Batatrim",
	nombreSindrome: "Síndrome de Lindsay",
	ImagenClave: "img/BatatrimBoton.png",
	ImagenNOClave: "img/noBatatrimBoton.png",
	ImagenSindrome: "img/Nooutcome.png",
	ImagenSano: "img/outcome.png",
    numTrials: 2,
    posibleOutcomesYES: [],
    posibleOutcomesNO: [],
    secuenciaCells: [],
    secuenciaResps: [],
    Contingencia: ordenContingencias[0],
    Juicio: 0,
    Confianza: 0,
	Riesgo: 0,
	PR: 0
}

var Fase2 = {
	nombreClave: "recalibrado",
	nombreSindrome: "Comportamientos erráticos de los sensores",
	ImagenClave: "img/RecalibradoSi.png",
	ImagenNOClave: "img/RecalibradoNo.png",
	ImagenSindrome: "img/outcomeNoAvion.png",
	ImagenSano: "img/outcomeAvion.png",
    numTrials: 2,
    posibleOutcomesYES: [],
    posibleOutcomesNO: [],    
    secuenciaCells: [],
    secuenciaResps: [],
    Contingencia: ordenContingencias[1],
    Juicio: 0,
    Confianza: 0,
	Riesgo: 0,
    PR: 0
}

// EXPERIMENTAL
var training=[Fase2, Fase1];

// EXPERIMENTAL Contrabalanceo
//var training=[Fase1, Fase2];

function RandomString(length){
    var mask = 'ABCDEFGHIJKLMNOPQRSTUVW';
//    var mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}


function showCue(){
    ocultar(divTextos);
    ocultar(divEleccion);
    ocultar(divOutcome);
    ocultar(divBoton);
    
    document.getElementById("divPreStatus").classList.remove('FadeOut');
    
    mostrar(divContingencia);
    
	if(training[fase] == Fase2){ 
		pintarHTML("divPreStatus", "<img src=\""+Fase2.ImagenSindrome+"\" width=250px>"+
				"<br><br><br><p class=\"mensaje\">El piloto de esta aeronave ha informado de de comportamientos erráticos de los sensores de ángulo de ataque.</p><p class=\"mensaje\">¿Quieres recalibrar el sensor?</p>");
    
		pintarHTML("divRegistro", "<h3>Aeronave EC-"+RandomString(3)+"</h3>");
    }
	else if(training[fase] == Fase1){
		pintarHTML("divPreStatus", "<img src=\""+Fase1.ImagenSindrome+"\" width=250px>"+
              "<br><br><br><p class=\"mensaje\">Este paciente tiene el "+Fase1.nombreSindrome+".</p><p class=\"mensaje\">¿Quieres administrarle "+ Fase1.nombreClave+"?</p>");
    
		pintarHTML("divRegistro", "<h3>Paciente "+RandomString(4)+"</h3>");
	}
	
	
    mostrar(divRegistro);
    mostrar(divPreStatus);
    setTimeout('mostrarEleccion()', 500);
    
    //mostrar(divEleccion);
    //setTimeout('mostrar(divEleccion)', 500); 
}

function mostrarEleccion(){

	if(training[fase] == Fase1){ 

		if(BalPanel==1){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
				   );
		}
		else if(BalPanel==2){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
				   );

		}

		mostrar(divEleccion);
    }
	else if(training[fase] == Fase2){

		if(BalPanel==1){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
				   );
		}
		else if(BalPanel==2){
				pintarHTML('divEleccion',
				   "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
				   );

		}

		mostrar(divEleccion);
	}
	
    if(BalPanel==1){
            pintarHTML('divEleccion',
               "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
               );
    }
    else if(BalPanel==2){
            pintarHTML('divEleccion',
               "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
               );

    }

    mostrar(divEleccion);
}

// La función original, por si nos cargamos la otra... TFK
function mostrarEleccionTFKBU(){

	
    if(BalPanel==1){
            pintarHTML('divEleccion',
               "<div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div id=\"mensajeCue\"></div>"
               );
    }
    else if(BalPanel==2){
            pintarHTML('divEleccion',
               "<div ><button id=\"botonNO\" value=\"NO\" class=\"botonEleccion\" onclick='respuestaNO()'><img src=\""+training[fase].ImagenNOClave+"\" width=150px  class=\"icon icon_hover\" id=\"imagenNO\"></button></div><div ><button id=\"botonYES\" value=\"YES\" class=\"botonEleccion\" onclick='respuestaYES()'><img src=\""+training[fase].ImagenClave+"\" width=150px class=\"icon icon_hover\" id=\"imagenYES\"></button></div><div id=\"mensajeCue\"></div>"
               );

    }

    mostrar(divEleccion);
}

function respuestaYES(){
	
	document.getElementById("botonNO").classList.add('unselected');
    training[fase].secuenciaResps.push(1);
    document.getElementById("imagenYES").classList.remove('icon_hover');
    document.getElementById("imagenYES").classList.remove('icon');
    document.getElementById("imagenNO").classList.remove('icon');
    document.getElementById("imagenYES").classList.add('iconselected');
    
    document.getElementById("botonYES").disabled = true;
    document.getElementById("botonNO").disabled = true;

    document.getElementById("divPreStatus").classList.add('FadeOut');
    mostrar(divPreStatus);
    
	if(training[fase] == Fase2){ 

		pintarHTML("mensajeCue", "<p class=\"mensaje\">Has recalibrado el sensor</p>");
	}
	else if(training[fase] == Fase1){

		pintarHTML("mensajeCue", "<p class=\"mensaje\">Has usado "+training[fase].nombreClave+"</p>");
	}
    
    setTimeout('showOutcome()', 500);
}

function respuestaNO(){
    document.getElementById("botonYES").classList.add('unselected');
    training[fase].secuenciaResps.push(0);
    document.getElementById("imagenNO").classList.remove('icon_hover');
    document.getElementById("imagenYES").classList.remove('icon');
    document.getElementById("imagenNO").classList.remove('icon');
    document.getElementById("imagenNO").classList.add('iconselected');       
    
    document.getElementById("botonYES").disabled = true;
    document.getElementById("botonNO").disabled = true;
    
    document.getElementById("divPreStatus").classList.add('FadeOut');
    mostrar(divPreStatus);
    
	if(training[fase] == Fase2){ 
		
		pintarHTML("mensajeCue", "<p class=\"mensaje\">No has recalibrado el sensor</p>");
	}
	else if(training[fase] == Fase1){

		pintarHTML("mensajeCue", "<p class=\"mensaje\">No has usado "+training[fase].nombreClave+"</p>");		
	}
    
    setTimeout('showOutcome()', 500);
}


function showOutcome(){

    var imgOutcome = "";
    var textoOutcome = "";
    
    switch(training[fase].secuenciaResps[state]){
        case 1: //si ha respondido 1:
            if(training[fase].posibleOutcomesYES[state]==1) {
                imgOutcome = training[fase].ImagenSano;
				if(training[fase] == Fase2){ 
				
					textoOutcome = "<br><p class=\"mensaje\">¡El problema ha sido resuelto!</p>";
				}
				else if(training[fase] == Fase1){
			
					textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>";
				}		
				training[fase].secuenciaCells.push("a");
                console.log(" debug: cell a");
            }
                
            else if(training[fase].posibleOutcomesYES[state]==0){
                imgOutcome = training[fase].ImagenSindrome;
				if(training[fase] == Fase2){ 
				
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El problema NO ha sido resuelto!</p>";
				}
				else if(training[fase] == Fase1){
			
	                textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";
				}		
    
                training[fase].secuenciaCells.push("b");
                console.log(" debug: cell b");
            }
     
            break;
        case 0: //si ha respondido 0:
            if(training[fase].posibleOutcomesYES[state]==1) {
                imgOutcome = training[fase].ImagenSano;
				if(training[fase] == Fase2){ 
					textoOutcome = "<br><p class=\"mensaje\">¡El problema ha sido resuelto!</p>";
				
				}
				else if(training[fase] == Fase1){
					textoOutcome = "<br><p class=\"mensaje\">¡El paciente ha superado la crisis!</p>";

				}
				training[fase].secuenciaCells.push("c");   
                console.log(" debug: cell c");
            }
                
            else if(training[fase].posibleOutcomesYES[state]==0){
                imgOutcome = training[fase].ImagenSindrome;
               	if(training[fase] == Fase2){ 
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El problema NO ha sido resuelto!</p>";
				
				}
				else if(training[fase] == Fase1){
					textoOutcome = "<br><p class=\"mensajeMALO\">¡El paciente NO ha superado la crisis!</p>";

				}  
                training[fase].secuenciaCells.push("d"); 
                console.log(" debug: cell d");
            }            
            
    }
        

    pintarHTML('divOutcome', "<img src=\""+imgOutcome+"\" width=250px><br><br>"+textoOutcome);
    if(training[fase] == Fase2){ 
		pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='ITI()' value='Siguiente aeronave'/>")	
	}
	else if(training[fase] == Fase1){
		pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='ITI()' value='Siguiente paciente'/>")	

	}
    mostrar(divOutcome);
    setTimeout('mostrar(divBoton)', 500);
    
    
}


function ITI(){
    
    ocultar(divOutcome);
    ocultar(divContingencia);
	ocultar(divBoton);	
        
    document.getElementById("botonNO").classList.remove('unselected');
    document.getElementById("botonYES").classList.remove('unselected');
    document.getElementById("imagenNO").classList.remove('iconselected');
    document.getElementById("imagenYES").classList.remove('iconselected');

    document.getElementById("imagenNO").classList.add('icon_hover');
    document.getElementById("imagenNO").classList.add('icon');
    document.getElementById("imagenYES").classList.add('icon_hover');
    document.getElementById("imagenYES").classList.add('icon');    
    
    document.getElementById("botonYES").disabled = false;
    document.getElementById("botonNO").disabled = false;
    
    document.getElementById("divPreStatus").classList.remove('FadeOut');
    
    if(state<training[fase].numTrials-1){
        state++;
        setTimeout("showCue()", 500);
    }
     else if(state==training[fase].numTrials-1){

// TFK         showJuicio();
		showJuicio();
		juiciorealizado++;
	
     }
}

function showJuicio(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == Fase2){ 
		textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el recalibrado es efectivo para resolver los comportamientos erráticos de los sensores de ángulo de ataque?</p>";
	}
	else if(training[fase] == Fase1){
		textoJuicio= "<p class=\"pregunta\">¿Hasta qué punto crees que el "+
			training[fase].nombreClave+" es efectivo para curar las crisis del "+training[fase].nombreSindrome+"?</p>";
	}
		
	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: Nada efectivo.</li><li>100: Completamente efectivo.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoJuicio = textoJuicio.concat(textoInstrucciones);
	
	pintarHTML('divPregunta', textoJuicio);
		
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);

}

function showConfianza(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == Fase2){ 
		textoConfianza= "<p class=\"pregunta\">¿Hasta qué punto estás seguro de tu respuesta sobre la efectividad del recalibrado?</p>";
	}
	else if(training[fase] == Fase1){
		textoConfianza= "<p class=\"pregunta\">¿Hasta qué punto estás seguro de tu respuesta sobre la efectividad del "+training[fase].nombreClave+"?</p>";
	}

	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: He respondido al azar.</li><li>100: Completamente seguro.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoConfianza = textoConfianza.concat(textoInstrucciones);
	pintarHTML('divPregunta', textoConfianza);
    
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);    
}

function showRiesgo(){
    ocultar(divContingencia);
    ocultar(divTextos);
    
    if(training[fase] == Fase2){ 
		textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la seguridad de la aeronave?</p>";
	}
	else if(training[fase] == Fase1){
		textoRiesgo= "<p class=\"pregunta\">¿Qué nivel de riesgo has considerado que tenían tus decisiones para la salud de los pacientes?</p>";
	}
	textoInstrucciones="<p>Responde usando la siguiente escala, donde los números se interpretan así:</p><ul><li>0: Ningún riesgo.</li><li>100: Riesgo catastrófico.</li></ul><p>Puedes hacer clic dentro de la escala tantas veces como desees hasta marcar el valor que consideres más adecuado. Cualquier valor entre 0 y 100 es válido.</p><br><br>";
	textoRiesgo = textoRiesgo.concat(textoInstrucciones);

	pintarHTML('divPregunta', textoRiesgo);
    
    document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');

    ReseteoJuicios();
    
    document.getElementById("textInput").disabled = true;
    document.getElementById("textInput").value = "";

    
    textoBoton="<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaJuicio()' value='Confirmar'/>";
    pintarHTML('divBoton', textoBoton);
    
    mostrar(divJuicio);
    setTimeout('mostrar(divBoton)', 500);
    

}


function updateTextInput(val) {
	document.getElementById('textInput').value=val; 
}

function validaJuicio(){
    if (document.getElementById('textInput').value!=""){
		training[fase].Juicio=document.getElementById('textInput').value;
        document.getElementById("sliderJuicio").classList.remove('sliderCONTPrimero');
        
		// TFK modificado para añadir preguntas de Confianza y riesgo
//        cambiafase();
		if(confianzaevaluada==0){
			showConfianza();
			confianzaevaluada++;
		}
		else if(riesgoevaluado==0){
			showRiesgo();
			riesgoevaluado++;
		}	
		else if(riesgoevaluado==1){
			cambiafase();
		}
        
	}
	else {
        alert("Contesta la pregunta");
        document.getElementById("sliderJuicio").classList.add('sliderCONTPrimero');
        document.getElementById("textInput").value = "";
         }   
}

function cambiafase(){
    if(fase==0) {
        fase++;
        state=0; 
        
		// TFK añadido
		juiciorealizado=0;
		confianzaevaluada=0;
		riesgoevaluado=0;
     }
    
    siguienteTexto();
}

function ReseteoJuicios(){
	document.getElementById('sliderJuicio').value=-10000;
    
	document.getElementById('textInput').value="";
}


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE CONTROL DE TEXTOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++


function siguienteTexto(){
	
	mostrar(divTextos);
	mostrar(divBoton);
    ocultar(divContingencia);
    ocultar(divJuicio);
    ocultar(divCuestionariosEdad);
	
    htmlContenido=arrayInstruc[stateTexto];
	htmlBotones=arrayBoton[stateTexto];
	
	pintarHTML("divTextos",htmlContenido);
    pintarHTML("divBoton",htmlBotones);

    stateTexto++;	
}

function previoTexto(){
	stateTexto=stateTexto-2;
    siguienteTexto();
}


//GRUPO EXPERIMENTAL
var arrayInstruc=[
    //0: (portada) //edad genero curso
    "<h2 class=\"titulo\">TAREA DE INVESTIGACIÓN</h2><p>Bienvenido/a. Sigue las instrucciones que encontrarás a continuación.</p><br><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"img/stetoscope.png\" width=\"200px\">",
    

    //1: (ética)
    //"<h3>Tu participación es voluntaria y anónima</h3><p align=\"left\"><p>Antes de nada queremos agradecer tu participación en este experimento, ya que sin la colaboración de personas como tú no sería posible esta investigación.</p><p>Debes saber que en esta tarea no hay respuestas buenas ni malas. Lo que queremos estudiar son los mecanismos psicológicos básicos que se dan en todas las personas. Para ello, necesitamos que, si deseas participar, lo hagas con el mayor interés. No tienes que identificarte, y los datos que nos aportes se unirán a los del total del grupo y serán analizados estadísticamente. Tu participación es voluntaria y anónima.</p><p>Si tras haber leído el mensaje deseas continuar, pulsa en el botón 'Continuar'.</p><br>",
    
	// EXPERIMENTAL!!! Instrucciones modificadas para la tarea AERONÁUTICA, falta un IF al comienzo de esta fase... cuando decida cómo diferenciar una fase u otra TFK  
	//2: Instrucciones 1
    "<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un ingeniero que trabaja para una aerolínea. Eres especialista en sistemas de navegación y mandos de vuelo,  trabajas resolviendo problemas que hay que tratar muy rápido durante el día a día para poder operar con normalidad. <br><br>Los pilotos de un cierto modelo de la aerolínea están informando de comportamientos erráticos de los sensores de ángulo de ataque, necesarios para calcular la posición y actitud del avión.</p>",
    
    //3: Instrucciones 2.a
    "<h3 class=\"titulo\">Instrucciones</h3><p>A pesar de no producir registros de fallos y los comportamientos no ser reproducidos en tierra, se sospecha que estos problemas pueden deberse a una calibración incorrecta del sensor no detectable, que se soluciona realizando una nueva calibración del sensor. La causa raíz de este problema está aún en fase de investigación, por lo que todavía no se ha comprobado claramente su efectividad.<br><br> Además, debes saber que esta re-calibración es una tarea larga y complicada con consecuencias que pueden ser graves, por lo que no siempre es posible realizarla.</p>",
    
    //4: Instrucciones 2.b
    "<h3 class=\"titulo\">Instrucciones</h3><p>Te vamos a presentar una serie de informes de pilotos de aeronaves en servicio que sufren este fallo. <br><br>El procedimiento será el siguiente: para cada nueva aeronave, debes decidir si quieres recalibrar el sensor o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Recalibrar el sensor</td><td>No recalibrar el sensor</td></tr></table><br><br>",
    
    //5: Instrucciones 2.c
    "<p><h3 class=\"titulo\">Instrucciones</h3>Después te informaremos de si efectivamente el problema fue resuelto. A continuación se te presentará la siguiente aeronave.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Problema no resuelto</td><td>Problema resuelto</td></tr></table><p>Intenta averiguar si el recalibrado es realmente efectivo. Cuando hayas revisado a un buen número de aeronaves te haremos algunas preguntas.</p>"
    ,
    //6: Instrucciones 1 Phase 2:
    //"<p><h3 class=\"titulo\">Instrucciones</h3>Ya has terminado de estudiar el "+Fase1.nombreClave+ " y su influencia en el "+Fase1.nombreSindrome+ ". Muchas gracias por tu colaboración.</p><p>Ahora te vamos a pedir que evalúes una segunda medicina en relación a otra enfermedad totalmente distinta llamada “"+Fase2.nombreSindrome+ "”, que también es muy rara y peligrosa y que hay que tratar muy rápido en urgencias. De nuevo, las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada “"+Fase2.nombreClave+ "”, pero la medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table>",
    
    //7: Instrucciones 2 Phase 2
    //"<h3 class=\"titulo\">Instrucciones</h3><p>Tal y como hemos hecho en la fase anterior, te vamos a presentar una serie de fichas médicas de pacientes, que en este caso están sufriendo una crisis del "+Fase2.nombreSindrome+ ". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+Fase2.nombreClave+ ". A continuación observarás si efectivamente el paciente superó la crisis. Intenta averiguar hasta qué punto es efectivo el "+Fase2.nombreClave+ ". Cuando hayas observado a un buen número de pacientes te haremos algunas preguntas.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table>",
 	
	
    // EXPERIMENTAL!!! Instrucciones modificadas para la tarea AERONÁUTICA, falta un IF al comienzo de esta fase... cuando decida cómo diferenciar una fase u otra TFK  
    //6: Instrucciones 1a Phase 2:
    "<p><h3 class=\"titulo\">Instrucciones</h3><p>Ya has terminado de estudiar el problema de comportamientos erráticos de los sensores de ángulo de ataque. Muchas gracias por tu colaboración.</p><p>Ahora imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada "+ Fase1.nombreSindrome+", que hay que tratar muy rápido en urgencias. </p>",

    //6: Instrucciones 1b Phase 2:
    "<p><h3 class=\"titulo\">Instrucciones</h3><p>Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ Fase1.nombreClave+", pero esta medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.<br><br>Te vamos a presentar una serie de fichas médicas de pacientes están sufriendo una crisis del "+Fase1.nombreSindrome+". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+Fase1.nombreClave+".</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase1.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase1.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table>",
    
    //7: Instrucciones 2 Phase 2
	"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación observarás si efectivamente el paciente superó la crisis. </p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase1.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase1.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><br><p>Intenta averiguar hasta qué punto es efectivo el "+Fase1.nombreClave+ ". Cuando hayas tratado a un buen número de pacientes te haremos algunas preguntas.</p>",
    
    
    
    //8: PREGUNTA 1 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p>1.	En una investigación se ha explorado hasta qué punto una nueva terapia es útil contra el insomnio. Para ello se ha entrevistado a un grupo de personas que han recibido la terapia un mes después de recibirla. 7 de cada 10 de estas personas dicen que sus problemas de insomnio han mejorado en el último mes. Basándote en esta información, ¿te parece que la nueva terapia es efectiva contra el insomnio?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta1\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta1\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta1\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta1\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta1\" value=\"4\"><span class=\"checkmark\"></span></label><br>",
    
    //9: PREGUNTA 2 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p>2.	Se acaba de proponer que existe una sustancia que tiene la capacidad de hacer que disminuya la sensación de hambre en personas con problemas de sobrepeso. Los datos de los que disponemos muestran que el 40% de las personas con sobrepeso que toman esta sustancia dicen que su sensación de hambre ha disminuido en las últimas semanas. Por otro lado, entre las personas con sobrepeso que NO toman la sustancia, el 20% dice que su sensación de hambre ha disminuido en las últimas semanas. Basándote en esta información, ¿te parece que la sustancia hace que disminuya la sensación de hambre?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta2\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta2\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta2\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta2\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta2\" value=\"4\"><span class=\"checkmark\"></span></label><br>",    
    
    
    //10: PREGUNTA 3 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p syle=\"font-size: 19;\">3.	Hace tiempo que se dice que las personas que viven en ciudades británicas (como Manchester) son más felices que las personas que viven en ciudades alemanas (como Munich). Para comprobarlo hemos decidido preguntar a 1.000 personas de Manchester y a 1.000 personas de Munich por cómo de felices se sienten. Aprovechamos que había mucha gente en la calle en ambas ciudades porque había sido la Champions League y el Manchester City acababa de ganar contra el Bayern de Munich. Encontramos que 750 de las 1.000 personas de Manchester decían sentirse muy felices, mientras que en Munich sólo 250 de las 1.000 personas decían sentirse muy felices. Basándote en esta información, ¿crees que las personas que viven en Manchester son más felices?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta3\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta3\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta3\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta3\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta3\" value=\"4\"><span class=\"checkmark\"></span></label><br>",
    
    //11: PREGUNTA 4 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p>4.	Parece ser que hacer deporte es bueno para evitar tener dolores de cabeza. Los datos que tenemos muestran que el 20% de las personas que NO hacen ningún deporte tienen dolores de cabeza con frecuencia. Además, sabemos que el 20% de las personas que practican deporte tienen dolores de cabeza con frecuencia. Basándote en esta información, ¿crees que hacer deporte ayuda a evitar los dolores de cabeza?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta4\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta4\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta4\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta4\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta4\" value=\"4\"><span class=\"checkmark\"></span></label><br>",
    
    //12: PREGUNTA 5 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p>5.	Un estudio realizado en una prestigiosa universidad indica  que los niveles altos de contaminación hacen que el pelo de las personas se vuelva liso. Los datos que tenemos muestran que 8 de cada 10 personas que viven en ciudades con niveles altos de contaminación tienen el pelo liso. Basándote en esta información, ¿crees que la contaminación puede hacer que nuestro pelo se vuelva liso?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta5\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta5\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta5\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta5\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta5\" value=\"4\"><span class=\"checkmark\"></span></label><br>",    
    
    
    // TFK A guardar datos!! Hay que ver ese Firebase... 
    //13: Save Data...
    //"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
    
    //13:
    "<h3 class=\"titulo\">Ya has terminado. <br><br> ¡Muchas gracias por tu colaboración!</h3>"
    
];

//GRUPO EXPERIMENTAL Contrabalanceo
//TFK//var arrayInstruc=[
    //0: (portada) //edad genero curso
    //TFK//"<h2 class=\"titulo\">TAREA DE INVESTIGACIÓN</h2><p>Bienvenido/a. Sigue las instrucciones que encontrarás a continuación.</p><br><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"img/stetoscope.png\" width=\"200px\">",
    

    //1: (ética)
    //"<h3>Tu participación es voluntaria y anónima</h3><p align=\"left\"><p>Antes de nada queremos agradecer tu participación en este experimento, ya que sin la colaboración de personas como tú no sería posible esta investigación.</p><p>Debes saber que en esta tarea no hay respuestas buenas ni malas. Lo que queremos estudiar son los mecanismos psicológicos básicos que se dan en todas las personas. Para ello, necesitamos que, si deseas participar, lo hagas con el mayor interés. No tienes que identificarte, y los datos que nos aportes se unirán a los del total del grupo y serán analizados estadísticamente. Tu participación es voluntaria y anónima.</p><p>Si tras haber leído el mensaje deseas continuar, pulsa en el botón 'Continuar'.</p><br>",
    
    
    //2: Instrucciones 1
    //TFK//"<h3 class=\"titulo\">Instrucciones</h3><p align=\"left\">Imagina que eres un médico que trabaja en el laboratorio de investigación de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada "+ Fase1.nombreSindrome+", que hay que tratar muy rápido en urgencias. Las crisis que provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada "+ Fase1.nombreClave+", pero esta medicina aún está en fase experimental, por lo que todavía no se ha comprobado claramente su efectividad.</p><br>",
    
    //3: Instrucciones 2.a
    //TFK//"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación, te vamos a presentar una serie de fichas médicas de pacientes que están sufriendo una crisis del "+Fase1.nombreSindrome +". En cada ficha verás un paciente y se te dará la oportunidad de administrarle o no el "+Fase1.nombreClave+ ".</p>",
    
    //4: Instrucciones 2.b
    //TFK//"<h3 class=\"titulo\">Instrucciones</h3><p>El procedimiento será el siguiente: para cada nuevo paciente, debes decidir si quieres administrar el "+Fase1.nombreClave+ " o no, pulsando la imagen correspondiente de las dos siguientes.</p><br><br><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase1.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase1.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Administrar la medicina</td><td>No administrar la medicina</td></tr></table><br><br>",
    
    //5: Instrucciones 2.c
    //TFK//"<p><h3 class=\"titulo\">Instrucciones</h3>Después te informaremos de si efectivamente el paciente superó la crisis. A continuación observarás el siguiente paciente.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase1.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase1.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Paciente enfermo</td><td>Paciente curado</td></tr></table><p>Intenta averiguar hasta qué punto es efectivo el "+Fase1.nombreClave+ ". Cuando hayas observado a un buen número de pacientes te haremos algunas preguntas.</p>"
    //TFK//,
 		
    // EXPERIMENTAL Contrabalanceo!!! Instrucciones modificadas para la tarea AERONÁUTICA TFK  
    //6: Instrucciones 1a Phase 2:
    //TFK//"<p><h3 class=\"titulo\">Instrucciones</h3>Ya has terminado de estudiar el "+Fase1.nombreSindrome +". Muchas gracias por tu colaboración.</p><p>Ahora imagina que eres un ingeniero que trabaja para una aerolínea. Eres especialista en sistemas de navegación y mandos de vuelo,  trabajas resolviendo problemas que hay que tratar muy rápido durante el día a día para poder operar con normalidad. </p>",

    //6: Instrucciones 1b Phase 2:
    //TFK//"<p><h3 class=\"titulo\">Instrucciones</h3><p>Los pilotos de un cierto modelo de la aerolínea están informando de comportamientos erráticos de los sensores de ángulo de ataque, necesarios para calcular la posición y actitud del avión. A pesar de no producir registros de fallos y los comportamientos no ser reproducidos en tierra, se sospecha que estos problemas pueden deberse a una calibración incorrecta del sensor no detectable, que se soluciona realizando una nueva calibración del sensor. La causa raíz de este problema está aún en fase de investigación, por lo que todavía no se ha comprobado claramente su efectividad. <br><br>Además, debes saber que esta re-calibración es una tarea larga y complicada con consecuencias que pueden ser graves, por lo que no siempre es posible realizarla.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenClave+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenNOClave+"\" width=\"150px\"></td></tr><tr><td>Recalibrar el sensor</td><td>No recalibrar el sensor</td></tr></table>",
    
    //7: Instrucciones 2 Phase 2
    //TFK//"<h3 class=\"titulo\">Instrucciones</h3><p>A continuación, te vamos a presentar una serie de informes de pilotos de aeronaves en servicio que sufren este fallo. <br><br>El procedimiento será el siguiente: para cada nueva aeronave, debes decidir si quieres recalibrar el sensor o no, pulsando la imagen correspondiente de las dos siguientes.<br><br>A continuación, te informaremos de si efectivamente el problema fue resuelto. Intenta averiguar hasta qué punto el recalibrado es efectivo. Cuando hayas observado a un buen número de aeronaves te haremos algunas preguntas.</p><table style=\"text-align: center; align-content: center; border: 0px; width: 100%;\"><tr><td><img src=\""+Fase2.ImagenSindrome+"\" width=\"150px\"></td><td><img src=\""+Fase2.ImagenSano+"\" width=\"150px\"></td></tr><tr><td>Problema no resuelto</td><td>Problema resuelto</td></tr></table>",
    
    
    
    //8: PREGUNTA 1 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p>1.	En una investigación se ha explorado hasta qué punto una nueva terapia es útil contra el insomnio. Para ello se ha entrevistado a un grupo de personas que han recibido la terapia un mes después de recibirla. 7 de cada 10 de estas personas dicen que sus problemas de insomnio han mejorado en el último mes. Basándote en esta información, ¿te parece que la nueva terapia es efectiva contra el insomnio?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta1\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta1\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta1\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta1\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta1\" value=\"4\"><span class=\"checkmark\"></span></label><br>",
    
    //9: PREGUNTA 2 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p>2.	Se acaba de proponer que existe una sustancia que tiene la capacidad de hacer que disminuya la sensación de hambre en personas con problemas de sobrepeso. Los datos de los que disponemos muestran que el 40% de las personas con sobrepeso que toman esta sustancia dicen que su sensación de hambre ha disminuido en las últimas semanas. Por otro lado, entre las personas con sobrepeso que NO toman la sustancia, el 20% dice que su sensación de hambre ha disminuido en las últimas semanas. Basándote en esta información, ¿te parece que la sustancia hace que disminuya la sensación de hambre?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta2\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta2\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta2\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta2\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta2\" value=\"4\"><span class=\"checkmark\"></span></label><br>",    
    
    
    //10: PREGUNTA 3 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p syle=\"font-size: 19;\">3.	Hace tiempo que se dice que las personas que viven en ciudades británicas (como Manchester) son más felices que las personas que viven en ciudades alemanas (como Munich). Para comprobarlo hemos decidido preguntar a 1.000 personas de Manchester y a 1.000 personas de Munich por cómo de felices se sienten. Aprovechamos que había mucha gente en la calle en ambas ciudades porque había sido la Champions League y el Manchester City acababa de ganar contra el Bayern de Munich. Encontramos que 750 de las 1.000 personas de Manchester decían sentirse muy felices, mientras que en Munich sólo 250 de las 1.000 personas decían sentirse muy felices. Basándote en esta información, ¿crees que las personas que viven en Manchester son más felices?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta3\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta3\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta3\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta3\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta3\" value=\"4\"><span class=\"checkmark\"></span></label><br>",
    
    //11: PREGUNTA 4 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p>4.	Parece ser que hacer deporte es bueno para evitar tener dolores de cabeza. Los datos que tenemos muestran que el 20% de las personas que NO hacen ningún deporte tienen dolores de cabeza con frecuencia. Además, sabemos que el 20% de las personas que practican deporte tienen dolores de cabeza con frecuencia. Basándote en esta información, ¿crees que hacer deporte ayuda a evitar los dolores de cabeza?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta4\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta4\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta4\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta4\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta4\" value=\"4\"><span class=\"checkmark\"></span></label><br>",
    
    //12: PREGUNTA 5 CUESTIONARIO:
    //"<h3 class=\"titulo\">Responde la pregunta: </h3><p>5.	Un estudio realizado en una prestigiosa universidad indica  que los niveles altos de contaminación hacen que el pelo de las personas se vuelva liso. Los datos que tenemos muestran que 8 de cada 10 personas que viven en ciudades con niveles altos de contaminación tienen el pelo liso. Basándote en esta información, ¿crees que la contaminación puede hacer que nuestro pelo se vuelva liso?</p><label class=containerRadios>Definitivamente NO<input type=radio name=\"Pregunta5\" value=\"0\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente NO<input type=radio name=\"Pregunta5\" value=\"1\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Me faltan datos para contestar<input type=radio name=\"Pregunta5\" value=\"2\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Probablemente SÍ<input type=radio name=\"Pregunta5\" value=\"3\"><span class=\"checkmark\"></span></label><br><label class=containerRadios>Definitivamente SÍ<input type=radio name=\"Pregunta5\" value=\"4\"><span class=\"checkmark\"></span></label><br>",    
    
    
    // TFK A guardar datos!! Hay que ver ese Firebase... 
    //13: Save Data...
    //"<h3 class=\"titulo\">Envío de datos</h3><p>A continuación podrás enviar los resultados para que se incluyan en nuestro estudio. Los datos que nos aportes se unirán a los del grupo y serán analizados estadísticamente.</p><p align=\"left\"> Para hacerlo, haz click en el botón \"Enviar\".</p>",
    
    //13:
    //TFK//"<h3 class=\"titulo\">Ya has terminado. <br><br> ¡Muchas gracias por tu colaboración!</h3>"
    
//TFK//];


var arrayBoton = [
    //0:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Empezar'/>",
    
    //1:
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='cuestionarioEdad()' value='Continuar'/>",
    
    //2:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
    //3:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    //4:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",
    
    //5:
	"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
    
	
    //6a:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    //6b:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='siguienteTexto()' value='Continuar'/>",

    
    //7:
    "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='previoTexto()' value='Atrás'/>   <input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='showCue()' value='Comenzar'/>",
    
    //8: pregunta 1
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaPregunta()' value='Confirmar'/>",
    
     //9: pregunta 2
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaPregunta()' value='Confirmar'/>",
    
    //10: pregunta 3
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaPregunta()' value='Confirmar'/>",
    
    //11: pregunta 4
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaPregunta()' value='Confirmar'/>",
    
    //12: pregunta 5
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaPregunta()' value='Confirmar'/>",
    
    
    // TFK A guardar datos!! Hay que ver ese Firebase... 
    //13:
    //"<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='saveData()' value='Enviar'/>",
    
    //14:
    ""
    
];


//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE CUESTTIONARIOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

function cuestionarioEdad(){
    ocultar(divTextos);
    mostrar(divCuestionariosEdad);
    
    document.querySelector('input[name="edad"]').value="";
    
    var HTMLboton = "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaEdad()' value='Continuar'/>";
    pintarHTML('divBoton', HTMLboton);

}

function validaEdad(){
    if(
        // (document.querySelector('input[name="curso"]:checked')==null) || (document.querySelector('input[name="edad"]').value=="")
        (document.querySelector('input[name="experiencia"]').value=="") || (document.querySelector('input[name="edad"]').value=="")
		//(document.querySelector('input[name="edad"]').value=="")
      ) {
        alert("Contesta las preguntas, por favor");
    }
    
	else { //el género se puede dejar sin marcar. ¿No es mejor que haya una categoría de "otros/no contesto"?
        
        if (document.querySelector('input[name="gender"]:checked')==null) 
            Gender = "noescoge";
        else Gender = document.querySelector('input[name="gender"]:checked').value;	
		
        Age = document.querySelector('input[name="edad"]').value
		Experience = document.querySelector('input[name="experiencia"]').value;
    	// Curso = document.querySelector('input[name="curso"]:checked').value;
        siguienteTexto();
	}
}


function validaPregunta(){
    if(document.querySelector('input[name="Pregunta'+stateQuest+'"]:checked')==null) alert("Contesta la pregunta, por favor");
    else {
        Cuestionario.push(document.querySelector('input[name="Pregunta'+stateQuest+'"]:checked').value);
        console.log(Cuestionario);
        stateQuest++;
        siguienteTexto();
    } 
}


function pregInduccion(){
    ocultar(divTextos);
    // mostrar(divPregInduccion);
    
	//TFK Aquí puedo meter un texto de ética o algo así con un "pintarHTML"... 
	
    //document.querySelector('input[name="induccion1"]:checked')=null;
    //document.querySelector('input[name="induccion2"]:checked')=null;
    
    pintarHTML('divBoton', "<input type='button' class = \"botonFlow\" style=\"font-size:100%\" onclick='validaInduccion()' value='Empezar'/>");
    
    
}


function validaInduccion(){
    if(
        // (document.querySelector('input[name="induccion1"]:checked')==null) || (document.querySelector('input[name="induccion2"]:checked')==null)
      // ) {
        // alert("Contesta las preguntas, por favor");
        (document.querySelector('input[name="induccion1"]:checked')==null) || (document.querySelector('input[name="induccion2"]:checked')==null)
      ) {
        // ocultar(divPregInduccion);
        siguienteTexto();;    }
    
    else{
        PregInduccion = document.querySelector('input[name="induccion1"]').value;
        PregInduccionPrecio = document.querySelector('input[name="induccion2"]').value;
        ocultar(divPregInduccion);
        siguienteTexto();
    }
    
}

//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++
//FUNCIONES DE SALIDA DE DATOS:
//++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++

function stringDate() {
  fecha = new(Date);
  return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() + "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
}


function saveData(){
    
    stringDate();
    
    Fase1.PR=(Fase1.secuenciaResps.reduce((a,b) => a + b, 0))/Fase1.numTrials;
    Fase2.PR=(Fase2.secuenciaResps.reduce((a,b) => a + b, 0))/Fase2.numTrials;
    
    var Fase1countCells = new Map([...new Set(Fase1.secuenciaCells)].map(
    x => [x, Fase1.secuenciaCells.filter(y => y === x).length]));
    var Fase2countCells = new Map([...new Set(Fase2.secuenciaCells)].map(
    x => [x, Fase2.secuenciaCells.filter(y => y === x).length]));
    
    var BalanceoContingencia = Fase1.Contingencia+"-"+Fase2.Contingencia;
    
        
    var ContingenciaNula={
        Juicio: 999,
        PR: 999,
        secuenciaCells: [],
        secuenciaResps: [],
        deltaP: 999
    };
    
    var ContingenciaPositiva={
        Juicio: 999,
        PR: 999,
        secuenciaCells: [],
        secuenciaResps: [],
        deltaP: 999
    };

    if(BalanceoContingencia=="ContNula-ContPositiva"){
        ContingenciaNula={
            Juicio: Fase1.Juicio,
            PR: Fase1.PR,
            secuenciaCells: Fase1.secuenciaCells,
            secuenciaResps: Fase1.secuenciaResps,
            deltaP: (Fase1countCells.get("a")/(Fase1countCells.get("a")+Fase1countCells.get("b")))-(Fase1countCells.get("c")/(Fase1countCells.get("c")+Fase1countCells.get("d")))   
        };
        
        ContingenciaPositiva={
            Juicio: Fase2.Juicio,
            PR: Fase2.PR,
            secuenciaCells: Fase2.secuenciaCells,
            secuenciaResps: Fase2.secuenciaResps,
            deltaP: (Fase2countCells.get("a")/(Fase2countCells.get("a")+Fase2countCells.get("b")))-(Fase2countCells.get("c")/(Fase2countCells.get("c")+Fase2countCells.get("d")))     
        };
        
    }
    else if(BalanceoContingencia=="ContPositiva-ContNula"){
        ContingenciaNula={
            Juicio: Fase2.Juicio,
            PR: Fase2.PR,
            secuenciaCells: Fase2.secuenciaCells,
            secuenciaResps: Fase2.secuenciaResps,
            deltaP: (Fase2countCells.get("a")/(Fase2countCells.get("a")+Fase2countCells.get("b")))-(Fase2countCells.get("c")/(Fase2countCells.get("c")+Fase2countCells.get("d")))   
        };
        
        ContingenciaPositiva={
            Juicio: Fase1.Juicio,
            PR: Fase1.PR,
            secuenciaCells: Fase1.secuenciaCells,
            secuenciaResps: Fase1.secuenciaResps,
            deltaP: (Fase1countCells.get("a")/(Fase1countCells.get("a")+Fase1countCells.get("b")))-(Fase1countCells.get("c")/(Fase1countCells.get("c")+Fase1countCells.get("d")))    
        };
    }
    
    
    data = 
        "x180a" + "," + 
        personId + "," +                //ID aleatorio
        fecha + "," + 
        Age + "," +         
        Gender + "," +
		Experience + "," +
        // Curso + "," +
        group + "," +                   //grupo: experimental / control
        BalPanel + "," +                //balanceo de panel botones
        BalanceoContingencia + "," +    //orden de las contingencias
        ContingenciaNula.Juicio + "," + //Juicio cont nula
        ContingenciaPositiva.Juicio + "," +     //Juicio cont positiva
        ContingenciaNula.PR.toFixed(3)  + "," + //PR cont nula
        ContingenciaPositiva.PR.toFixed(3)  + "," + //PR cont positiva
        ContingenciaNula.deltaP.toFixed(3)  + "," + //deltaP cont nula
        ContingenciaPositiva.deltaP.toFixed(3)  + "," + //deltaP cont positiva
        Cuestionario + "," +            //Las cinco respuestas al cuestionario
        PregInduccion  + "," +          //pregunta de induccion 1 (vacía en el control)
        PregInduccionPrecio  + "," +    //pregunta de induccion 2 (precio) (vacía en el control)
        ContingenciaNula.secuenciaCells + ",," + //secuencia de celdas cont nula
        ContingenciaPositiva.secuenciaCells + "," + //secuencia de celdas cont positiva
        ContingenciaNula.secuenciaResps + ",," + //secuencia de respuestas cont nula
        ContingenciaPositiva.secuenciaResps  //secuencia de respuestas cont positiva
    ;
    
    console.log(data);      //por si acaso, saca los datos por la consola.
    
    guardaFirebase();
	
    siguienteTexto();
}

function guardaFirebase(){

	var expdata={
		expName:"tallerFEcyt",
		datos:data
	}

    firebase.database().ref('tallerFEcyt/').push(data);
	console.log("¡Datos guardados!");
}




