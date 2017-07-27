//FUNCIONES GENERALES ////////////////////////

////BUSCAR EN ARRAY ////////////////////////////
// return boolean
function isInArray(el, arr) {
	for (var i=0 ; i < arr.length; i++) {
		if (el === arr[i]) {
			return true;
		} 
	}; return false;
};

////////////////////////////////////////////////
// REMOVE DUPLICATES IN ARRAY
function removeDuplicatesArr(dupArr, uniqueArr) {
	if (dupArr.length > 0) {
		for (var i=0; i < dupArr.length; i++) {
			if(!isInArray(dupArr[i], uniqueArr)) {
				uniqueArr.push(dupArr[i]);
			} else {
				break;
			}
		};	
	}
}; //end of removeDuplicatesArr(arr)

////////////////////////////////////////////////////
/// VACIAR ARRAY
function emptyArr(array) {
	  while (array.length) {
	    array.pop();
	  }
	};//end function emptyArr(checkedCompaniesArr)
	
//////////////////////////////////////////////////////
// COPIAR 
function traspasarArr(sourceArr, targetArr) {
	if (sourceArr.length > 0) {
		for (var i=0; i<sourceArr.length; i++) {
			targetArr.push(sourceArr[i]);
		}
	}
}; //end of fillUpArr(sourceArr, targetArr)

//////////////////////////////////////////////////////
/// BORRAR ELEMENTO DE ARRAY BY VAL
function removeArrElementByVal(arr, itemToRemove) {
	var indexItemToRemove = arr.indexOf(itemToRemove);
	if (indexItemToRemove > -1) {
		arr.splice(indexItemToRemove, 1);
	}
}; //end of removeArrElementByVal(arr, itemToRemove)


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

