//FUNCIONES GENERALES ////////////////////////

////BUSCAR EN ARRAY ////////////////////////////
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
////////////////////////////////////////////////

/////LIMPIAR MARKERS//////////////////////////////
var limpiarMarkers = function() {
	
if (markersCG_busqueda) {
	//Caulquiera de los dos metodos: mymap.removeLayer(markersCG_busqueda);
	markersCG_busqueda.clearLayers();
}
if (markersCG_COMPANIAS) {
	//Caulquiera de los dos metodos: mymap.removeLayer(markersCG_busqueda);
	markersCG_COMPANIAS.clearLayers();
}
if (markersCG_PRUEBAS) {
	//Caulquiera de los dos metodos: mymap.removeLayer(markersCG_busqueda);
	markersCG_PRUEBAS.clearLayers();
}

for (var i=0; i < markerArrEN.length; i++) {
		mymap.removeLayer(markerArrEN[i]);
	}	
for (var i=0; i < markerArrTE.length; i++) {
		mymap.removeLayer(markerArrTE[i]);
	}	
for (var i=0; i < markerArrVI.length; i++) {
		mymap.removeLayer(markerArrVI[i]);
	}	
}
////////////////////////////////////////////////

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
		    document.getElementById("ocultar").style.display = 'block'; //'none'
		    document.getElementById("ocultar").textContent = nuevoPunto;
};

//FUNCIONES ########## GEO ## JSON ##############////////////////////////////////////////////// 
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
      		 /*		
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
            };}}
     */
      		switch (feature.properties.name) {
            case 'Parque Alava': 
          	  console.log("Alava");
            return {
                fillColor: "#e9bc3b",
                color: "#ac8613",
                opacity: 1,
                fillOpacity: 0.8 
            };
            case 'Parque Bizkaia': 
          	  console.log("Bizkaia");
          	  return {
                fillColor: "#0099ff",
                color: "#005f9d",
                opacity: 1,
                fillOpacity: 0.8 
            };
            case 'Parque Gipuzkoa': 
          	  console.log("Gipuzkoa");
          	  return {
                fillColor: "#0099ff",
                color: "#005f9d",
                opacity: 1,
                fillOpacity: 0.8 
            };}}
   
          
      		
      }).addTo(mymap);
      layerArr.push(leaf_layer);
 }

}