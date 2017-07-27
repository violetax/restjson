$.noConflict();

jQuery( document ).ready(function( $ ) {
	
	$('#ocultar2').hide();	

/////////////	CUT	/////////////////////////////////
	
	//LEAFLET VARS
		
		var myIcon2 = L.icon({
		    iconUrl: 'resources/images/solarpanel.png',
		    iconSize: [20, 48],
		    iconAnchor: [22, 94],
		    popupAnchor: [-3, -76],
		});
	//DIBUJAR MAPA//////////////////////////
	var mymap2 = L.map('mapid').setView([42.994603451901334, -2.4238586425781254], 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 9,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap2);


	//DIBUJAR UN PUNTO///////////////////////////////////////////
	var lat2, lng2; 
	var nuevoPunto2 = "";
	var jsonCoords2 = "";
	var clickCircleA;
	var clickCircleB;

	//Recoger las coordenadas de un punto/////////////////////////////////////
	//Crear variable string con forma de json con las coordenadas de un punto
	function getCoordinates2(ev) {
	   lat2 = ev.latlng.lat.toString();
	   lng2 = ev.latlng.lng.toString();
	   
	  
	   nuevoPunto2 = "{\"latitud\": " + lat2 + ", \"longitud\": " + lng2 + "}";  //JSON.stringify({ "Latitud": lat2 , "Longitud": lng2 });     
	   jsonCoords2 =  JSON.stringify({ "Latitud": lat2 , "Longitud": lng2 });
		   //{"_id":"596deeef41490fb015f72ed4","id":3,"latitud":41.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7"};
		   //
	   //
	   
	   if (clickCircleA != undefined) {
		   mymap2.removeLayer(clickCircleA);
		    };
		    clickCircleA = L.circle([lat2, lng2], 500, {
		       	color: 'red',
		       	fillColor: '#f03',
		       	fillOpacity: 0.5
		       }).addTo(mymap2);
	}
	mymap2.on('click', getCoordinates2);
	//MOSTRAR LAS COORDENADAS DEL PUNTO EN PANTALLA///////////////
	$("#boton_jcoord").on("click",function(e){	
		$('#ocultar2').show();
		$('#ocultar2').html(nuevoPunto2);
		//$('#ocultar2').append(nuevoPunto2);	
	 });

	//LIMPIAR TODOS LOS MARKERS//////////////////////

	/////*****!!!!!!!!PENDIENTE QUE SOLO LIMPIE LOS PUNTOS *********!!!!!!!!!!!!!!

	$("#boton_limpiar").on("click",function(e){	
	mymap2.removeLayer(clickCircleB);
	$(".leaflet-interactive").remove();
	$('#ocultar2').hide();	
	});

	//Recoger las coordenadas de varios puntos//////////////////
	//Crear variable string con forma de json con las coordenadas de varios puntos

	var arr2 = [];

	function getCoordinates2Bunch(ev) {
		   lat2 = ev.latlng.lat2.toString();
		   lng2 = ev.latlng.lng2.toString();
		   jsonCoords2 =  JSON.stringify({ "Latitud": lat2 , "Longitud": lng2 }); 
		   
			    clickCircleB = L.circle([lat2, lng2], 500, {
			       	color: 'green',
			       	fillColor: '#f01',
			       	fillOpacity: 0.5
			       }).addTo(mymap2);
		}

	mymap2.on('contextmenu', function(ev){
		   lat2 = ev.latlng.lat2.toString();
		   lng2 = ev.latlng.lng2.toString();
		   jsonCoords2 =  JSON.stringify({ "Latitud": lat2 , "Longitud": lng2 }); 
		   
			    clickCircleB = L.circle([lat2, lng2], 500, {
			       	color: 'green',
			       	fillColor: '#f01',
			       	fillOpacity: 0.5
			       }).addTo(mymap2);
		
			    arr2.push(jsonCoords2);
		
	});
	/////////////////////////////////////////////////////////////////////////////

$("#boton_cargarTodosDesdeBDD").on("click",function(e){
	
	//REST PATH
	url='http://localhost:3000/api/paneles';
	//url='http://192.168.4.31:3000/api/paneles';
	var path = "cargarTodosDesdeBDD";	
	//url='http://localhost:8888/aRESTJSON/rest/' + path;
	
	
	$.ajax({
	//	type: 'POST',
	    url: url,
	//    dataType: 'json',
	//    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	function AjaxSucceeded(result) {
		//console.log(result);		
for (var x = 0; x < result.length; x++) {
	//console.log([result[x].latitud, result[x].longitud]);

/*	L.marker
			([result[x].latitud, result[x].longitud], 
			{icon: myIcon2}
			).addTo(mymap2);
			*/
		}

// [{"_id":"59631fddc1de6312c03dcf9e","id":1,"latitud":43.30425689192164,"longitud":-2.7301025390625004,"CP":"","capacidad":""},{"_id":"59631fddc1de6312c03dcf9f","id":2,"latitud":43.39213817046079,"longitud":-2.6477050781250004,"CP":"","capacidad":""},{"_id":"59631fddc1de6312c03dcfa0","id":3,"latitud":43.260268541404855,"longitud":-1.9747924804687502,"CP":"","capacidad":""},{"_id":"59631fddc1de6312c03dcfa1","id":4,"latitud":43.22825703776174,"longitud":-2.0764160156250004,"CP":"","capacidad":""},{"_id":"59631fddc1de6312c03dcfa2","id":5,"latitud":43.29626137570081,"longitud":-1.9857788085937502,"CP":"","capacidad":""}]
///////////////****************************************************************************************
//Object.keys(result[x]);
//delete result["_id"];
	
	if (1==1) {
		var jsonString = createGeoJson2(result);
        var my_geoJSON = JSON.stringify(jsonString);
       // console.log(my_geoJSON);
       // subirABdd(my_geoJSON);
        console.log(result);
        
        $.ajax({
    		type: 'POST',
    		url: "http://localhost:8080/aRESTJSON/rest/guardarenGjmongoBdd",
    	    dataType: 'json',
    	    cache: false,
            data: my_geoJSON,
            success: function (geodata) {
            	console.log(geodata);
            }
        });
        
	}
}	
	function AjaxFailed(result) {
		console.log(result);
	}      
    });

/*
var url_bdd = 'http://localhost:8080/aRESTJSON/rest/pruebas'
function subirABdd(url_bdd,callback,geoData) {
	var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url_bdd, true);
    xmlhttp.send();
}
*/


var geojsonFeature2;
var geoJArr2 = [];
function createGeoJson2(geoData) {

	for (var x = 0; x < geoData.length; x++) {	
		geojsonFeature2 = {
			    "type": "Feature",
			    "properties": {
			        "id": geoData[x].id,
			        "CP": geoData[x].CP,
			        "capacidad": geoData[x].capacidad
			    },
			    "geometry": {
			        "type": "Point",
			        "coordinates": [geoData[x].latitud, geoData[x].longitud]
			    }
			};
		geoJArr2.push(geojsonFeature2);
	}
	//console.log(geoJArr2);
	
	return geoJArr2;
}

///////////////////////////////////////////////////////////////
$("#boton_crearPuntoBDD").on("click",function(e){
	
	$('#ocultar2').show();
	$('#ocultar2').html(jsonCoords2);
	
	var nuevoPunto2 = {"id":10,"latitud":lat2,"longitud":lng2,"CP":"","capacidad":""};
	  
	
	//ERROR 500
	
	//REST PATH
	url='http://localhost:3000/api/paneles';

	$.ajax({
		type: 'POST',
	    url: url,
	    dataType: 'json',
	    data: nuevoPunto2,
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
	
	$('#ocultar2').show();	
	
	//REST PATH
	var path = "cargartodos";	
	url='http://localhost:8888/aRESTJSON/rest/' + path;

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
		//	 L.marker([result[x].Latitud, result[x].Longitud], {icon: myIcon2}).addTo(mymap2);
         }
	}
	function AjaxFailed(result) {
		console.log(result);
	}      
    });

//////////////POST ******** CARGAR VARIOS PUNTOS *******/////////////////
$("#boton_registrarPuntos").on("click",function(e){
		
	$('#ocultar2').show();	
	var variosPuntos = JSON.stringify(arr2);
	
	//REST PATH
	var path = "registrarpuntos";	
	url='http://localhost:8888/aRESTJSON/rest/' + path;

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
		
		//for (var x = 0; x < result.length; x++) {L.marker([result[x].Latitud, result[x].Longitud], {icon: myIcon2}).addTo(mymap2);}
	//	$('#ocultar2').html(result);
	}
	function AjaxFailed(variosPuntos) {
		console.log(variosPuntos);
	}      
    });
    

//POST*** CARGAR UN PUNTO  ///////////////////////////
$("#boton_cargarPorPunto").on("click",function(e){
	
	$('#ocultar2').show();

	//REST PATH
	var path = "cargarporpunto";
	
	url='http://localhost:8888/aRESTJSON/rest/' + path;
	

	$.ajax({
	    type: 'POST',
	    url: url,
	    contentType: 'application/json; charset=utf-8',
	    data: jsonCoords2,
	    dataType: 'json',
	    cache: false,
	    success: AjaxSucceeded,
	    error: AjaxFailed
	});
	
	function AjaxSucceeded(result) {
		console.log(result.Latitud);
		console.log(result);
		$('#ocultar2').html(result);
	}
	function AjaxFailed(result) {
		console.log("Fail" + result);
	}
	
    });


///FUNCIONS/////////////////////////////////////////////////////////

function contains(arr2, obj) {
    for (var i = 0; i < arr2.length; i++) {
        if (arr2[i] === obj) {
            return true;
        }
    }
    return false;
}

///////////////////////////////////////////////////////////////////////////


    /*
    L.circle([51.508, -0.11], 500, {
    	color: 'red',
    	fillColor: '#f03',
    	fillOpacity: 0.5
    }).addTo(mymap2).bindPopup("I am a circle.");

    L.polygon([
    	[51.509, -0.08],
    	[51.503, -0.06],
    	[51.51, -0.047]
    ]).addTo(mymap2).bindPopup("I am a polygon.");
    */
/*
 * 			<input type="button" value="CARGARfromWS" id="boton_cargarfromWS">
$("#boton_cargarfromWS").on("click",function(e){
	
	$('#ocultar2').show();	
	
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
			 L.marker([result[x].Latitud, result[x].Longitud], {icon: myIcon2}).addTo(mymap2);
         }
	//	$('#ocultar2').html(result);
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
	
	$('#ocultar2').show();
	
	//REST PARAM
	var radio = $("#radio").val();
	//calculo limites ...
	var limites = "{\"p1\":{\"x\":37.4228642,\"y\":-122.0851557},\"p2\":{\"x\":37.4221145,\"y\":-122.0859841},\"p3\":{\"x\":37.4238383302915,\"y\":-122.0842209197085},\"p4\":{\"x\":37.4211403697085,\"y\":-122.0869188802915}";
	
	/* El post pasa la info en el campo data: // radio es la var con la que calculo un circulo, NO lo que le paso.
	 ******** Paso el conjunto de las coordenadas del borde del circulo ****************
	 * En el servidor se aplica funcion que compara coordenadas y devuelve las de los puntos dentro del circulo dado

	
	//REST PATH
	var path = "cargarporarea";
	
	url='http://localhost:8888/aRESTJSON/rest/' + path;

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
		$('#ocultar2').html(result);
	}
	function AjaxFailed(result) {
		console.log("Fail" + result);
		//console.log(result.status + ' ' + result.statusText);
	}
       
    });

*/
//FUNC ABOUT GETTING ARRKEYS IF NOT JS ECMA 5//////////////////
/*
		if (typeof result.s !== "function") {
		    (function() {
		        var hasOwn = result.prototype.hasOwnProperty;
		        result.keys = Object_keys;
		        function Object_keys(obj) {
		            var keys = [], name;
		            for (name in obj) {
		                if (hasOwn.call(obj, name)) {
		                    keys.push(name);
		                }
		            }
		            console.log("keys NaF");
		            console.log(keys);	
		            return keys;
		        }
		    })();
*/

///////////////--- PENDIENTE ---- /////////////////////////////////
/* COMPROBAR KEYS
 * 
var gjpro_id;
var gjpro_CP;
var gjpro_capacidad;
var gjpro_latitud;
var gjpro_longitud;
var check_ifHas_property;
var keysArray = [];



for (var i; i < result[x].length; i++) {
	keysArray.push(result[x][i]);
	 console.log(Object.keys(result[0]));
}
check_ifHas_property = contains(keysArray, "id");
console.log(check_ifHas_property)
	

function contains(arr2, obj) {
    for (var i = 0; i < arr2.length; i++) {
    	console.log(arr2[i]);
        if (arr2[i] === obj) {
            return true;
        }
    }
    return false;
}

 * 
 */


});