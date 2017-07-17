//ver
//https://github.com/Automattic/mongoose/blob/master/test/model.querying.test.js#L1931
//$.noConflict();

jQuery( document ).ready(function( $ ) {
	
	
//LEAFLET VARS
	var icon_PanSolar_1 = L.icon({
	    iconUrl: 'resources/images/solarpanel.png',
	    iconSize: [20, 48],
	    });
	var icon_PanSolar_2 = L.icon({
	    iconUrl: 'resources/images/solar2.png',
	    iconSize: [20, 48],
	    });
	
//var mymapLayersGroup1 = L.layerGroup();
//var basemaps = {mapabase: var_L.tileLayer };
//var mymapLayers = { "panelesMarkers": mymapLayersGroup1};
//L.control.layers(baseMaps, mymapLayers).addTo(mymap);
//L.control.layers(mymapLayers).addTo(mymap);
	
//DIBUJAR MAPA//////////////////////////
var mymap = L.map('mapid').setView([42.994603451901334, -2.4238586425781254], 9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);

//DIBUJAR UN PUNTO/////////////////////////////////////////////////////////////////////////////
var latx, lngx;			//las coordenadas del ultimo punto seleccionado por el cursor
var nuevoPunto = "";	//string tipeada manualmente con latx, lngx 
var jsonCoords = "";	//igual que nuevoPunto, pero con JSON.stringify
var clickCircle;		//marcador L.circle - rojo
var clickCircle2;		//marcador L.circle - verde
var marker;				//new L.marker pushed to markerArr, marker2Arr
var markerArr = [];		//todos los marker-paneles de la bdd
var marker2Arr = [];	//grupo de marker-paneles de la bdd
var layerArr = [];		//layers pushed en funcion addLayer
var jcoorsArr = [];		//array con latx, lngx 
var carreterasLayer;	//L.tileLayer.provider('OpenTopoMap'
var baseLayers = {};	//para anadir a L.control.layers
var overlayLayers = {};	//para anadir a L.control.layers
var lcontrol;			//L.control.layers


//MOSTRAR LAS COORDENADAS DEL PUNTO EN PANTALLA///////////////
mymap.on('click', getCoordinates);

//MARCAR VARIOS PUNTOS EN PANTALLA
mymap.on('contextmenu', getCoordinatesBunch);

//LIMPIAR TODOS LOS MARKERS//////////////////////
$("#boton_limpiar").on("click",function(e){
	
	for (var i=0; i < markerArr.length; i++) {
		mymap.removeLayer(markerArr[i]);
	};
	for (var i=0; i < marker2Arr.length; i++) {
		mymap.removeLayer(marker2Arr[i]);
	};
	for (var i=0; i < layerArr.length; i++) {
		mymap.removeLayer(layerArr[i]);
	};
	for (var i=0; i < jcoorsArr.length; i++) {
		mymap.removeLayer(jcoorsArr[i]);
	};
	
});


/////////////////////////////////////////////////////////////////////////////
//////************** QUERIES *************///////////////////////////////////
$("#boton_query1").click(function(){
	
		//PLUG&PLAY 
		// https://github.com/leaflet-extras/leaflet-providers/blob/master/index.html 
		var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
				maxZoom: 17,
		});
		
		//'http://{s}.tile.openweathermap.org/map/{variant}/{z}/{x}/{y}.png',
		carreterasLayer = L.tileLayer.provider('OpenTopoMap').addTo(mymap);
		seaPointsLayer = L.tileLayer.provider('OpenSeaMap').addTo(mymap);
		overlayLayers = {
				//'OpenWeatherMap Precipitation': L.tileLayer.provider('OpenWeatherMap.Precipitation'),
				'OpenTopoMap': carreterasLayer,
				'OpenSeaMap': seaPointsLayer};

	lcontrol = L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(mymap);
});

$("#boton_query2").click(function(){
	
	url='http://localhost:3000/api/maplayers';
	
	$.getJSON(url, function(result) {
		console.log(result);
		addLayer(result);
	});
	
});

$("#boton_query3").click(function(){
	
	url='http://localhost:3000/api/query';
	
	$.getJSON(url, function(result) {
		for (var x = 0; x < result.length; x++) {		
			for (var i=0; i < markerArr.length; i++) {
				mymap.removeLayer(markerArr[i]);
			};
			
			lng = result[x].geometry.coordinates[0];
			lat = result[x].geometry.coordinates[1];
			marker = new L.marker([lat, lng],{icon: icon_PanSolar_2}).addTo(mymap);
			marker2Arr.push(marker);
		}
		console.log(result);
	});
	
});




$("#boton_query4").click(function(){
	
	

});

////////////////////////////////////////////////////
/////////// BASIC GET - POST///////////////////////////////////////
///////////////////////////////////////////////////////////////	
///*** MOSTRAR TODOS GEOJPUNTOS ****///////////////////////////
///////////////////////////////////////////////////////////////

	$("#boton_cargarTodosGeoJPoint").on("click",function(e){
		
		//REST PATH
		url='http://localhost:3000/api/paneles';
		var xlat,xlng;
		
		$.ajax({
		    url: url,
		    success: AjaxSucceeded,
		    error: AjaxFailed
		});
			
		function AjaxSucceeded(result) {
			//console.log(result[0].geometry.coordinates[0]);		

			for (var x = 0; x < result.length; x++) {
				
				for (var i=0; i < marker2Arr.length; i++) {
					mymap.removeLayer(marker2Arr[i]);
				};
				
				lng = result[x].geometry.coordinates[0];
				lat = result[x].geometry.coordinates[1];
				marker = new L.marker([lat, lng],{icon: icon_PanSolar_1}).addTo(mymap);
				markerArr.push(marker);	
				console.log(marker._leaflet_id);
			}
	
			}	
		function AjaxFailed(result) {
			console.log(result);
		}      
	   
	 });

///////////////////////////////////////////////////////////////	
///*** CREAR UN GEOJPUNTO ****/////////////////////////////////
////////************PENDIENTE DESRIZAR EL POSTDATA ****////////
///////////////////////////////////////////////////////////////

	$("#boton_crearGeoJPoint").on("click",function(e){

		$('#ocultar').show();
		$('#ocultar').html(jsonCoords);
		var panel;
		var properties = [];
		properties = [{id:"XXXXX", CP: "XXXXX", capacidad: "XXXXX", lat: latx, lng: lngx}];
		panel = GeoJSON.parse(properties[0], {Point: ['lat', 'lng']});
		console.log(panel);


		//REST PATH
		url='http://localhost:3000/api/paneles';

		$.ajax({
			type: 'POST',
		    url: url,
		    dataType: 'json',
		    data: panel,
		    cache: false,
		    success: AjaxSucceeded,
		    error: AjaxFailed
		});
		function AjaxSucceeded(result) {		
			console.log(result);
		}
		function AjaxFailed(result) {
			console.log("AjaxFailed" + result);
		}      
	});

		
		

///////////////////////////////////////////////////////////////	
///*** FUNCIONES ****//////////////////////////////////////////
///////////////////////////////////////////////////////////////

//Recoger las coordenadas de un punto/////////////////////////////////////
//Crear variable string con forma de json con las coordenadas de un punto
function getCoordinates(ev) {
	latx = ev.latlng.lat.toString();
	lngx = ev.latlng.lng.toString();
	
	nuevoPunto = "{\"latitud\": " + latx + ", \"longitud\": " + lngx + "}";  //JSON.stringify({ "Latitud": lat , "Longitud": lng });     
	jsonCoords =  JSON.stringify({ "Latitud": latx , "Longitud": lngx });
	
	if (clickCircle != undefined) {
		   mymap.removeLayer(clickCircle);
		    };
		    clickCircle = L.circle([latx, lngx], 500, {
		       	color: 'red',
		       	fillColor: '#f03',
		       	fillOpacity: 0.5
		       }).addTo(mymap);
	
		    $('#ocultar').show();
			$('#ocultar').html(nuevoPunto);
};


//Recoger las coordenadas de varios puntos/////////////////////////////////////
//Crear variable string con forma de json con las coordenadas de un punto
function getCoordinatesBunch(ev) {
	   latx = ev.latlng.lat.toString();
	   lngx = ev.latlng.lng.toString();
	   jsonCoords =  JSON.stringify({ "Latitud": latx , "Longitud": lngx }); 
	   
		    clickCircle2 = new L.circle([latx, lngx], 500, {
		       	color: 'green',
		       	fillColor: '#f01',
		       	fillOpacity: 0.5
		       }).addTo(mymap);
		  
		jcoorsArr.push(clickCircle2);		    
		  //  $('#ocultar').show();
		  //  $('#ocultar').append(jsonCoords);

};

//ANADIR CAPA/////////////////////////////////////
function addLayer(layer) {
  var leaf_layer;
  if (layer.type == "MultiPoint") {
      leaf_layer = L.geoJson(layer, { pointToLayer: function (feature, latlng) {return L.circleMarker(latlng, layer.style); }})
      leaf_layer.bindPopup(layer.type);
  } else if (layer.type == "MultiLineString") {
      leaf_layer = L.geoJson(layer, {style: layer.style });
      leaf_layer.bindPopup(layer.type);
  } else  {
  	for (var i=0; i< layer.features.length; i++) {
  		feature = layer.features[0];
  	}
      leaf_layer = L.geoJson(layer, {
      	style: function(feature) {
              switch (feature.properties.style) {
              case 'Orange': return {
                  fillColor: "#e9bc3b",
                  color: "#ac8613",
                  opacity: 1,
                  fillOpacity: 0.8 
              };
              case 'Blue': return {
                  fillColor: "#0099ff",
                  color: "#005f9d",
                  opacity: 1,
                  fillOpacity: 0.8 
              };
          }
          }
      }).addTo(mymap);
      layerArr.push(leaf_layer);
 }

}

});	
