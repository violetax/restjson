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