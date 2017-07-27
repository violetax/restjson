//FUNCIONES GENERALES ////////////////////////

////BUSCAR EN ARRAY ////////////////////////////
function isInArray(el, arr) {
	for (var i=0 ; i < arr.length; i++) {
		if (el === arr[i]) {
			return true;
		} else {
			return false;
		};
	};
};




////////////////////////////////////////////////

function consoleLogArr(arr) {	
	for (var i=0; i<arr.length; i++) {
		console.log(arr[i]);
	}
}; //end function consoleLogArr



/*
function emptyArr(arr) {
	console.log(arr);
if (arr.length > 0) {
	for (var i=arr.length; i<=0; i--) {
			var eachItem = arr[i];
			console.log(eachItem);
				arr.splice(i, 1);
		}
};
}; */

function emptyArr(array) {
	  while (array.length) {
	    array.pop();
	  }
	};//end function emptyArr(checkedCompaniesArr)


function fillUpArr(sourceArr, targetArr) {
	if (sourceArr.length > 0) {
		for (var i=0; i<sourceArr.length; i++) {
			targetArr.push(sourceArr[i]);
		}
	}
}; //end of fillUpArr(sourceArr, targetArr)

function removeArrElementByVal(arr, itemToRemove) {
	var indexItemToRemove = arr.indexOf(itemToRemove);
	if (indexItemToRemove > -1) {
		arr.splice(indexItemToRemove, 1);
	}
}; //end of removeArrElementByVal(arr, itemToRemove)


// function removeDuplicatesArr(arr) : USA JQUERY - DEFINIDA CON EL CODIGO GENERAL




/// BOTON COMPANIES FUNCS



/* Variables selectIcon:
 * fpParameter	- local que se construye con argumento parameter + string
 * rangoX		- locales que se defines con otra funcion ****PENDIENTE
 * markersX		- locales que se RETURN
 * markerArrParameter - local
 * latlng		- argumento
 * icons		- globales
 */
function selectIcon(parameter, latlng) {		

	//var parameter = $("input[name='visiblelayer']:checked").val();
	var fpParameter = "feature.properties." + parameter;	
	
	var rangosArr = [];
	var rangosEnergia = [1,2,3,4,5,6];
	var rangosTemperatura = [5,10,15,20,30,40,50];
	var rangosViento = [2,5,10,20,50,80];
	
	marker1 = L.marker(latlng,{icon: blueIcon}); 
	marker2 = L.marker(latlng,{icon: greenIcon}); 
	marker3 = L.marker(latlng,{icon: yellowIcon}); 
	marker4 = L.marker(latlng,{icon: redIcon}); 
	marker5 = L.marker(latlng,{icon: orangeIcon}); 
	marker6 = L.marker(latlng,{icon: violetIcon}); 
	var markerArrParameter = [marker1,marker2,marker3,marker4,marker5,marker6];
	
	switch (parameter){
    case "energia": 
    	fillUpArr(rangosEnergia, rangosArr);
    	break;
    case "temperatura": 
    	fillUpArr(rangosTemperatura, rangosArr);
    	break;
    case "viento": 
    	fillUpArr(rangosViento, rangosArr);
    	break;
	}; //end of switch (parameter)
	
	function returnMarker(fpParameter) {
		var numberOfCorrelatedItems = 6;
		for (var i=0; i < numberOfCorrelatedItems; i++) {
			if (fpParameter < rangosArr[i]) {
				return markerArrParameter[i];
			} //end if
		}; //end for
	}; //end of function returnMarker(fpParameter)

};// end of selectIcon(parameter) 

function selectToolTip(parameter, layer) {
/* Variables:
 * parameter	- argumento
 * layer		- argumento
 * htmlX		- locales ****PENDIENTE
 */

}



/*
  		var fpValId = feature.properties.panelId.id;
		var fpValCompany = feature.properties.panelId.compania;	
		var fpenergia = feature.properties.energia;
		var fptemperatura = feature.properties.temperatura;
		var fpviento = feature.properties.velocidadviento;
 */




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
if (markersCG_PanelesFILTERED) {
	//Caulquiera de los dos metodos: mymap.removeLayer(markersCG_busqueda);
	markersCG_PanelesFILTERED.clearLayers();
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