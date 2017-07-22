//ver
//https://github.com/Automattic/mongoose/blob/master/test/model.querying.test.js#L1931
//$.noConflict();
jQuery( document ).ready(function( $ ) {

	
//////// VERTICAL MENU //////////////////////////////////////
////////////////////////////////////////////////////////////
//https://stackoverflow.com/questions/14186565/jquery-hide-and-show-toggle-div-with-plus-and-minus-icon

//////////////////////////////////////
//////////////////////////////////////
	
/////////////////////////////////////////////////////////////////////////////////////////////////////
//// MAPAS Y CAPAS ##########///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//DEFINIR MAPA BASE ##########///////////////////////////////////////////////////////////////////////

initlat = 42.994603451901334;
initlng = -2.4238586425781254;
initzoom = 9;
	
mymap = L.map('mapid', { zoomControl: false} ).setView([initlat, initlng], initzoom);

L.control.zoom({
    position:'bottomright'
}).addTo(mymap);

initialLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
});

initialLayer.addTo(mymap);

//EXTENDER GEOJSON

//NOTI:
// metodo addData belongs to layer which is added to map, ie: 
	//	var myLayer = L.geoJSON().addTo(map);
	//	myLayer.addData(geojsonFeature);
// ¿¿ Entonces es en la propia layer que metemos los style, onEachFeature, ...???
L.TopoJSON = L.GeoJSON.extend({  
	  addData: function(jsonData) {    
	    if (jsonData.type === "Topology") {
	      for (key in jsonData.objects) {
	        geojson = topojson.feature(jsonData, jsonData.objects[key]);
	        L.GeoJSON.prototype.addData.call(this, geojson);
	      }
	    }    
	    else {
	      L.GeoJSON.prototype.addData.call(this, jsonData);
	    }
	  }  
	});

//////////////### TOPO JSON ##### ///////////////////////////
var topoLayer = new L.TopoJSON(null,{
	style: function(feature) {
		var lat = feature.geometry.coordinates[0];
		var lng = feature.geometry.coordinates[1];
		var id = feature.properties.id;
		 switch (id) {	
		 case 'XXXXX':  marker = L.marker([lat, lng],{icon: icon_PanSolar_NEGRO}).addTo(mymap); markerArr.push(marker); return;//{color: "#ff0000"};
		 case 'YYYYY':	marker = L.marker([lat, lng],{icon: icon_PanSolar_BLUE}).bindTooltip(id).addTo(mymap); markerArr.push(marker); return;//{color: "#0000ff"};
		 }}
}),
//$countryName = $('.center-map'),
colorScale = chroma
	.scale(['#D5E3FF', '#003171'])
	.domain([0,1]);

/////////########## AUTO AJAX ##########////////////////////////////////////

var topoData;
var interval=0;

//setInterval(ajaxCall, 7500);

$("#btn_topos").on("click", function() {
	
	interval++;
	
	topoData = "resources/topojson/periodo." + interval + ".periodoFEATCOL.topo.json";
	console.log(topoData);
	
//	$.getJSON(topoData).done(addTopoData);
	$.getJSON(topoData, function( data ) {
		  var items = [];
		//  var data = "data.objects.periodo.1.periodoFEATCOL.geometries";
		  for (var arr in data.objects) {
			  console.log(arr);
			    break;
			}
		  
		  
		  $.each( data.objects, function(  ) {
			//  var arr = [Object(data.objects)];
		
		 console.log(data.objects);
		 
		  });
		 
		
		});
	
	function addTopoData(topoData){  
	  topoLayer.addData(topoData);
	  topoLayer.addTo(mymap);
	};
})

function addTopoData(topoData){  
  topoLayer.addData(topoData);
  topoLayer.addTo(mymap);
};

function ajaxCall(){
	
};




/////////########## BOTONES ##########////////////////////////////////////
//CAPA CON TODOS LOS PANELES ##########/////////////////////////////////

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
					 case 'XXXXX':  marker = L.marker([lat, lng],{icon: icon_PanSolar_NEGRO}).addTo(mymap); markerArr.push(marker); return;//{color: "#ff0000"};
					 case 'YYYYY':	marker = L.marker([lat, lng],{icon: icon_PanSolar_BLUE}).bindTooltip(id).addTo(mymap); markerArr.push(marker); return;//{color: "#0000ff"};
					 }}
			});
		
		}	
		/////////END OF AJAX FUNC ////////////////////////////
		function AjaxFailed(result) {
			console.log(result);
		}      
	   
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
		addLayer(result);
		
		/*for (var x = 0; x < result.length; x++) {
			lng = result[x].geometry.coordinates[0];
			lat = result[x].geometry.coordinates[1];
		}
		*/
	});
	
});

$("#boton_query3").click(function(){
	
	url='http://localhost:3000/api/query';
	
	for (var i=0; i < markerArr.length; i++) {
		mymap.removeLayer(markerArr[i]);
	};
	
	mymap.removeLayer(panelesLayer);
	
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
	
	//url='http://localhost:3000/api/getallPanelesOnePeriod';
	var topoData = "resources/topojson/periodo.1.periodoFEATCOL.topo.json";
	
	$.getJSON(topoData) 
		 .done(addTopoData);
		console.log(topoData);
	});

/* console.log(topoLayer
 * options: ? unknow lenght Object
 * _layers: 57 a 297 Object: each is a 
 * 		## feature === geojson === panel: 
 * 			has geometry.coordinates[lng,lat], properties. ##
 * 	 
 */
/* addTopoData DEFINIDA ARRIBA ***
	function addTopoData(topoData){  
	  topoLayer.addData(topoData);
	  topoLayer.addTo(mymap);
	  topoLayer.eachLayer(handleLayer);
	};
*/	  
	 function onEachFeature(feature, layer) {
	        layer.on({
	            mouseover: highlightFeature,
	            mouseout: resetHighlight,
	            click: zoomToFeature
	        });
	    }
	    function resetHighlight(e) {
	        polska.resetStyle(e.target);
	        info.update();
	    }
	    function zoomToFeature(e) {
	        map.fitBounds(e.target.getBounds());
	    }
	
	/////COPY TOPO_MAP_EX
//NOT GO 
	 function handleLayer(layer){
	        var randomValue = Math.random(),
	          fillColor = colorScale(randomValue).hex();

	        layer.on({
	          mouseover : enterLayer,
	          mouseout: leaveLayer
	        });
	    }
	    
	 function enterLayer(){
	      var countryName = this.feature.properties.name;
	      //$('#ocultar').html("holahola").show();
	      
	      
	      
	      /* NOT FUNCTIONS:" 
	      this.bringToFront();
	      this.setStyle({
	        weight:2,
	        opacity: 1
	      });*/
	    }
	 
	    function leaveLayer(){
	    	 //$('#ocultar').hide();
	    	
	    	/* NOT FUNCTIONS:" 
	      this.bringToBack();
	      this.setStyle({
	        weight:1,
	        opacity:.5
	      });*/
};
	
///////// END OF COPY //////////////////////


	/*
 ###
L.TopoJSON = L.GeoJSON.extend({  
	  addData: function(jsonData) {    
	    if (jsonData.type === "Topology") {
	      for (key in jsonData.objects) {
	        geojson = topojson.feature(jsonData, jsonData.objects[key]);
	        L.GeoJSON.prototype.addData.call(this, geojson);
	      }
	    }    
	    else {
	      L.GeoJSON.prototype.addData.call(this, jsonData);
	    }
	  }  
	});*/

	

///////////////////////////////////////////////////////////////	
///*** CREAR UN GEOJPUNTO ****/////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////////
//// FUNCIONALIDADES BASICAS ##########///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//MOSTRAR LAS COORDENADAS DEL PUNTO EN PANTALLA ##########///////////////////////////////////////////////////////////////////////
mymap.on('click', getCoordinates);

//MARCAR VARIOS PUNTOS EN PANTALLA ##########///////////////////////////////////////////////////////////////////////
//mymap.on('contextmenu', getCoordinatesBunch);

//LIMPIAR TODOS LOS MARKERS ##########///////////////////////////////////////////////////////////////////////

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

});	
