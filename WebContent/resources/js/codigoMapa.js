//ver
//https://github.com/Automattic/mongoose/blob/master/test/model.querying.test.js#L1931
//$.noConflict();
jQuery( document ).ready(function( $ ) {

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// MAPAS Y CAPAS ##########///////////////////////////////////////////////////////////////////////

initlat = 42.994603451901334;
initlng = -2.4238586425781254;
initzoom = 9;
	
mymap = L.map('mapid').setView([initlat, initlng], initzoom);

initialLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
});

initialLayer.addTo(mymap);

//lcontrol_general = L.control.layers(baseLayers, null, {collapsed: false}).addTo(mymap);


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
//////************** QUERIES ********##################//////////////////////
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

	lcontrol_query1 = L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(mymap);
});

$("#boton_query2").click(function(){
	
	url='http://localhost:3000/api/maplayers';
	
	$.getJSON(url, function(result) {
		console.log(result);
		//addLayer(result);
		lng = result[x].geometry.coordinates[0];
		lat = result[x].geometry.coordinates[1];
		
		
	});
	
});

$("#boton_query3").click(function(){
	
	url='http://localhost:3000/api/query';
	
	for (var i=0; i < markerArr.length; i++) {
		mymap.removeLayer(markerArr[i]);
	};
	
	$.getJSON(url, function(result) {
		for (var x = 0; x < result.length; x++) {				
			lng = result[x].geometry.coordinates[0];
			lat = result[x].geometry.coordinates[1];
			marker = new L.marker([lat, lng],{icon: icon_PanSolar_SOL}).addTo(mymap);
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
			for (var i=0; i < marker2Arr.length; i++) {
				mymap.removeLayer(marker2Arr[i]);
			};
		
			for (var x = 0; x < result.length; x++) {							
				var panel;
				var geojsonPanel = [];
				geojsonPanel = {
					id: result[x].properties.id, 
					CP: result[x].properties.CP, 
					capacidad:  result[x].properties.capacidad, 
					lat:  result[x].geometry.coordinates[0], 
					lng: result[x].geometry.coordinates[1]};
				panel = new GeoJSON.parse(geojsonPanel, {Point: ['lat', 'lng']});
				paneles.push(panel);				
			}
			for ( var p=0; p < paneles.length; p++) {
				latitud: paneles[p].geometry.coordinates[0];
				longitud: paneles[p].geometry.coordinates[1];
				console.log(paneles[p]);
			}
			//console.log(paneles[0]);
			panelesLayer = L.geoJSON(paneles
					, {
				style: function(feature) {
					var lat = feature.geometry.coordinates[0];
					var lng = feature.geometry.coordinates[1];
					var id = feature.properties.id;
					 switch (id) {	
					 case 'XXXXX':  return 	L.marker([lat, lng],{icon: icon_PanSolar_NEGRO}).addTo(mymap)	;//{color: "#ff0000"};
					 case 'YYYYY':	return L.marker([lat, lng],{icon: icon_PanSolar_BLUE}).bindTooltip(id).addTo(mymap)	;//{color: "#0000ff"};
					 }}
			});
		
		}	
		/////////END OF AJAX FUNC ////////////////////////////
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
		
		properties = [{
			id:"YYYYY", 
			CP: "YYYYY", 
			capacidad: "YYYYY", 
			lat: latx, 
			lng: lngx}];
		
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

});	