$.noConflict();

jQuery( document ).ready(function( $ ) {
	
	$('#ocultar').hide();	
//LEAFLET VARS
	
	var myIcon = L.icon({
	    iconUrl: 'resources/images/solarpanel.png',
	    iconSize: [20, 48],
	    iconAnchor: [22, 94],
	    popupAnchor: [-3, -76],
	});
//DIBUJAR MAPA//////////////////////////
var mymap = L.map('mapid').setView([42.994603451901334, -2.4238586425781254], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 9,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);


//////////////PRUEBAS VARIAS/////////////////////////////////



///////////////////////////////////////////////////////////////


//DIBUJAR UN PUNTO///////////////////////////////////////////
var lat, lng; 
var nuevoPunto = "";
var clickCircle;
var clickCircle2;

//Recoger las coordenadas de un punto/////////////////////////////////////
//Crear variable string con forma de json con las coordenadas de un punto
function getCoordinates(ev) {
   lat = ev.latlng.lat.toString();
   lng = ev.latlng.lng.toString();
   
   //unos los cogió, el resto no
   nuevoPunto = {"_id":"596deeef41490fb015f72ed4","id":3,"latitud":41.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7"};
	   //"{\"latitud\": " + lat + ", \"longitud\": " + lng + "}";  //JSON.stringify({ "Latitud": lat , "Longitud": lng }); 
   
   //
   
   if (clickCircle != undefined) {
	   mymap.removeLayer(clickCircle);
	    };
	    clickCircle = L.circle([lat, lng], 500, {
	       	color: 'red',
	       	fillColor: '#f03',
	       	fillOpacity: 0.5
	       }).addTo(mymap);
}
mymap.on('click', getCoordinates);
//MOSTRAR LAS COORDENADAS DEL PUNTO EN PANTALLA///////////////
$("#boton_jcoord").on("click",function(e){	
	$('#ocultar').show();
	$('#ocultar').html(nuevoPunto);	
 });
/////////////////////////////////////////////////////////////////////////////


//Recoger las coordenadas de varios puntos//////////////////
//Crear variable string con forma de json con las coordenadas de varios puntos

var arr = [];

function getCoordinatesBunch(ev) {
	   lat = ev.latlng.lat.toString();
	   lng = ev.latlng.lng.toString();
	   var jsonCoords =  JSON.stringify({ "Latitud": lat , "Longitud": lng }); 
	   
		    clickCircle2 = L.circle([lat, lng], 500, {
		       	color: 'green',
		       	fillColor: '#f01',
		       	fillOpacity: 0.5
		       }).addTo(mymap);
	}

mymap.on('contextmenu', function(ev){
	   lat = ev.latlng.lat.toString();
	   lng = ev.latlng.lng.toString();
	   jsonCoords =  JSON.stringify({ "Latitud": lat , "Longitud": lng }); 
	   
		    clickCircle2 = L.circle([lat, lng], 500, {
		       	color: 'green',
		       	fillColor: '#f01',
		       	fillOpacity: 0.5
		       }).addTo(mymap);
	
		    arr.push(jsonCoords);
	
});

/////*****!!!!!!!!PENDIENTE PASAR ESTE ARR A UN REST*********!!!!!!!!!!!!!!


//LIMPIAR TODOS LOS MARKERS//////////////////////

/////*****!!!!!!!!PENDIENTE QUE SOLO LIMPIE LOS PUNTOS *********!!!!!!!!!!!!!!

$("#boton_limpiar").on("click",function(e){	
	mymap.removeLayer(clickCircle2);
	$(".leaflet-interactive").remove();
	$('#ocultar').hide();	
 });


//mymap.on('contextmenu', getCoordinatesBunch);
/////////////////////////////////////////////////////////////////////////////

///**************************************************************//////////

$("#boton_cargarTodosDesdeBDD").on("click",function(e){
	
	//REST PATH
	//url='http://192.168.4.31:3000/api/paneles';
	var path = "cargarTodosDesdeBDD";	
	url='http://localhost:8080/aRESTJSON/rest/' + path;
	
	
	$.ajax({
	    type: 'POST',
	    url: url,
	    dataType: 'json',
	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	function AjaxSucceeded(result) {
		console.log(result);		
for (var x = 0; x < result.length; x++) {L.marker([result[x].latitud, result[x].longitud], {icon: myIcon}).addTo(mymap);}
	}
	
	
	function AjaxFailed(result) {
		console.log(result);
	}      
    });


///////////////////////////////////////////////////////////////
$("#boton_crearPuntoBDD").on("click",function(e){
	
	$('#ocultar').show();
	$('#ocultar').html(nuevoPunto);
	
	
	//ERROR 500
	
	//REST PATH
	url='http://192.168.4.31:3000/api/paneles';

	$.ajax({
		type: 'POST',
	    url: url,
	    dataType: 'json',
	    data: nuevoPunto,
	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	function AjaxSucceeded(result) {
		console.log(result);			
	}
	function AjaxFailed(result) {
		console.log(result);
	}      
    });

////////////////////////////////////////////////////////////////////


//MOSTRAR TODOS LOS PUNTOS PREDEFINIDOS///////////////////////////
$("#boton_cargarTodos").on("click",function(e){
	
	$('#ocultar').show();	
	
	//REST PATH
	var path = "cargartodos";	
	url='http://localhost:8080/aRESTJSON/rest/' + path;

	$.ajax({
	    type: 'POST',
	    url: url,
	    dataType: 'json',
	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	function AjaxSucceeded(result) {
		console.log(result);		
		
		for (var x = 0; x < result.length; x++) {	
			 L.marker([result[x].Latitud, result[x].Longitud], {icon: myIcon}).addTo(mymap);
         }
	}
	function AjaxFailed(result) {
		console.log(result);
	}      
    });

//////////////POST ******** CARGAR VARIOS PUNTOS *******/////////////////
$("#boton_registrarPuntos").on("click",function(e){
		
	$('#ocultar').show();	
	var variosPuntos = JSON.stringify(arr);
	
	//REST PATH
	var path = "registrarpuntos";	
	url='http://localhost:8080/aRESTJSON/rest/' + path;

	$.ajax({
	    type: 'POST',
	    url: url,
	    dataType: 'json',
	    data: variosPuntos,
	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	function AjaxSucceeded(variosPuntos) {
		console.log(variosPuntos);		
		
		//for (var x = 0; x < result.length; x++) {L.marker([result[x].Latitud, result[x].Longitud], {icon: myIcon}).addTo(mymap);}
	//	$('#ocultar').html(result);
	}
	function AjaxFailed(variosPuntos) {
		console.log(variosPuntos);
	}      
    });
    

//POST*** CARGAR UN PUNTO  ///////////////////////////
$("#boton_cargarPorPunto").on("click",function(e){
	
	$('#ocultar').show();

	//REST PATH
	var path = "cargarporpunto";
	
	url='http://localhost:8080/aRESTJSON/rest/' + path;
	

	$.ajax({
	    type: 'POST',
	    url: url,
	    contentType: 'application/json; charset=utf-8',
	    data: jsonCoords,
	    dataType: 'json',
	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	
	function AjaxSucceeded(result) {
		console.log(result.Latitud);
		console.log(result);
		$('#ocultar').html(result);
	}
	function AjaxFailed(result) {
		console.log("Fail" + result);
	}
	
    });


    /*
    L.circle([51.508, -0.11], 500, {
    	color: 'red',
    	fillColor: '#f03',
    	fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");

    L.polygon([
    	[51.509, -0.08],
    	[51.503, -0.06],
    	[51.51, -0.047]
    ]).addTo(mymap).bindPopup("I am a polygon.");
    */
/*
 * 			<input type="button" value="CARGARfromWS" id="boton_cargarfromWS">
$("#boton_cargarfromWS").on("click",function(e){
	
	$('#ocultar').show();	
	
	//REST PATH
	url='http://192.168.4.31:3000/api/paneles';

	$.ajax({
	    type: 'POST',
	    url: url,
	    dataType: 'json',
	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	function AjaxSucceeded(result) {
		console.log(result);		
		
		for (var x = 0; x < result.length; x++) {	
			 L.marker([result[x].Latitud, result[x].Longitud], {icon: myIcon}).addTo(mymap);
         }
	//	$('#ocultar').html(result);
	}
	function AjaxFailed(result) {
		console.log(result);
		//console.log(result.status + ' ' + result.statusText);
	}      
    });
*/

//POST:POST MOSTRAR INFORMACION DEL PUNTO SELECCIONADO ///////////////////////////

/*
 * <p>Mostrar alrededor de un punto:</p>
   <form name="formBuscar" action="#">
			<input type="button" value="CARGAR COORDS. UN PUNTO" id="boton_cargarporpunto">
			<input type="number" name="radio" id="radio" placeholder="Radio">
			<input type="button" value="CARGARxAREA" id="boton_cargarporarea">
   </form>


$("#boton_cargarporarea").on("click",function(e){
	
	//Envio un string en imitacion de un JSON con varios ptos
	//Devuelvo el mismo string
	
	$('#ocultar').show();
	
	//REST PARAM
	var radio = $("#radio").val();
	//calculo limites ...
	var limites = "{\"p1\":{\"x\":37.4228642,\"y\":-122.0851557},\"p2\":{\"x\":37.4221145,\"y\":-122.0859841},\"p3\":{\"x\":37.4238383302915,\"y\":-122.0842209197085},\"p4\":{\"x\":37.4211403697085,\"y\":-122.0869188802915}";
	
	/* El post pasa la info en el campo data: // radio es la var con la que calculo un circulo, NO lo que le paso.
	 ******** Paso el conjunto de las coordenadas del borde del circulo ****************
	 * En el servidor se aplica funcion que compara coordenadas y devuelve las de los puntos dentro del circulo dado

	
	//REST PATH
	var path = "cargarporarea";
	
	url='http://localhost:8080/aRESTJSON/rest/' + path;

	$.ajax({
	    type: 'POST',
	    url: url,
//	    contentType: 'application/json; charset=utf-8',
	    data: limites,
//	    dataType: 'json',
//	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	function AjaxSucceeded(result) {
		console.log("Exito " + result);
		//console.log(result.status + ' ' + result.statusText);
		$('#ocultar').html(result);
	}
	function AjaxFailed(result) {
		console.log("Fail" + result);
		//console.log(result.status + ' ' + result.statusText);
	}
       
    });

*/


});