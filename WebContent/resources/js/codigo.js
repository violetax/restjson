$.noConflict();

jQuery( document ).ready(function( $ ) {
	
	$('#ocultar').hide();

//DIBUJAR MAPA//////////////////////////
var mymap = L.map('mapid').setView([43.264432, -2.92686], 15);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 12,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);
L.marker([43.264432, -2.92686]).addTo(mymap);

/*
var popup = L.popup();
function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
}
mymap.on('click', onMapClick); */


//DIBUJAR UN PUNTO///////////////////////////////////////////
var lat, lng; 
var jsonCoords = "";
var clickCircle;
var clickCircle2;

function getCoordinates(ev) {
   lat = ev.latlng.lat.toString();
   lng = ev.latlng.lng.toString();

   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
   jsonCoords =  JSON.stringify({ "Latitud": lat , "Longitud": lng }); //"{\"Latitud\": " + lat + ", \"Longitud\": " + lng + "}"; 
   
   
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

///************************-PENDIENTE-********************************//////////
//EXTRAER COORDENADAS DE VARIOS PUNTOS//////////////////////////////////////////
/*
 * <p>Recoger coordenadas de varios punto</p>
		<button id="boton_recoger" type="button">RECOGER</button>
 * 
var arr = [];
function getCoordinatesBunch(ev) {
	   lat = ev.latlng.lat.toString();
	   lng = ev.latlng.lng.toString();
	   jsonCoords =  JSON.stringify({ "Latitud": lat , "Longitud": lng }); //"{\"Latitud\": " + lat + ", \"Longitud\": " + lng + "}"; 
	   
		    clickCircle2 = L.circle([lat, lng], 500, {
		       	color: 'green',
		       	fillColor: '#f01',
		       	fillOpacity: 0.5
		       }).addTo(mymap);
	}

mymap.on('click', getCoordinatesBunch);
//MOSTRAR LAS COORDENADAS TODOS LOS PUNTOS///////////////
$("#boton_recoger").on("click",function(e){		    
    i = 0;
    $('#boton_recoger').each(function()
    {
            arr[i++] = jsonCoords;
    });
    
	$.each(arr, function(index, val) {
	    console.log(val.Latitud);
	});
 });
 */
///**********************************************************************************//////////


//MOSTRAR LAS COORDENADAS DEL PUNTO EN PANTALLA///////////////
	$("#boton_jcoord").on("click",function(e){	
		$('#ocultar').show();
		$('#ocultar').html(jsonCoords);	
	 });


//MOSTRAR TODOS LOS PUNTOS PREDEFINIDOS///////////////////////////
	var myIcon = L.icon({
	    iconUrl: 'resources/images/solarpanel.png',
	    iconSize: [20, 48],
	    iconAnchor: [22, 94],
	    popupAnchor: [-3, -76],
	});
	
$("#boton_cargartodos").on("click",function(e){
	
	$('#ocultar').show();
	
	
	//REST PATH
	var path = "cargartodos";
	
	url='http://localhost:8080/aRESTJSON/rest/' + path;
    //console.log(url);

	$.ajax({
	    type: 'POST',
	    url: url,
	 //   contentType: 'application/json; charset=utf-8',
	    dataType: 'json',
	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	function AjaxSucceeded(result) {
		console.log(result);		
		
		for (var x = 0; x < result.length; x++) {	
			 L.marker([result[x].Latitud, result[x].Longitud], {icon: myIcon}).addTo(mymap);
			 //console.log(result[x].Latitud);
			 //console.log(result[x].Longitud);
         }
		
/*		
 	
 			success: function (data) {
            alert(data);
            for (var x = 0; x < data.length; x++) {
                content = data[x].Id;
                content += "<br>";
                content += data[x].Name;
                content += "<br>";
                $(content).appendTo("#ProductList");
               // updateListing(data[x]);
            }
        }
		;
*/
		
	//	$('#ocultar').html(result);
	}
	function AjaxFailed(result) {
		console.log(result);
		//console.log(result.status + ' ' + result.statusText);
	}
       
    });


//POST:POST MOSTRAR INFORMACION DEL PUNTO SELECCIONADO ///////////////////////////
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
	 */
	
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


//POST:POSTED*** MOSTRAR INFORMACION DEL PUNTO SELECCIONADO ///////////////////////////
$("#boton_cargarporpunto").on("click",function(e){
	
	//hmmm... Se supone que al pinchar el btn del porst se calculan jsonCoords que es una String
	//SÍ! LAS LEE: console.log(jsonCoords);
	//Envio las jcoord como string
	//Devuelvo el mismo string
	
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
		//console.log(result.status + ' ' + result.statusText);
	//	var res2 = JSON.parse(result);
		//console.log(res2);
		$('#ocultar').html(result);
	}
	function AjaxFailed(result) {
		console.log("Fail" + result);
		//console.log(result.status + ' ' + result.statusText);
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


});