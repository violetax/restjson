/// HTML FUNCTIONS //////////////////////////////////////
function myFunction() {
    var arbol = document.getElementById('vertical-menu');
    var mevesnomeves = document.getElementById('mevesnomeves');

    if (arbol.style.display === 'none') {
    	arbol.style.display = 'block';
    	document.getElementById('mevesnomeves').textContent="Ocultar árbol";
    } else {
    	arbol.style.display = 'none';
    	document.getElementById('mevesnomeves').textContent="Mostrar árbol";
    }
}

////////////////////////////////////////////////////////


//FUNCIONES ########## TOPO ## JSON ##############////////////////////////////////////////////// 
//ANADIR CAPA/////////////////////////////////////


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

//FUNCIONES GENERALES ////////////////////////
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

};