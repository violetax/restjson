$.noConflict();

jQuery( function( $ ) {
		
///// FLUJO DE INFO /////////
var flujoCount = 1;
var topoData ;
//var intervalFunc = setInterval(flowTopoData, 500); 
//TEMP TOPODATA:
//topoData = "resources/topojson/periodo.1.periodoFEATCOL.topo.json";
topoData = "resources/geojson/pruebas.1.topo.json";

$("#boton_limpiar").on("click",function(e){	
	limpiarMarkers();
});
		

function flowTopoData () {	
	topoData = "resources/topojson/periodo." + flujoCount + ".periodoFEATCOL.topo.json";
	flujoCount++
	if (flujoCount>= 96) {	
		flujoCount = 1
		//clearInterval(intervalFunc);
		console.log("¡Ciclo hecho!")
	}
}

	
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
	
	
//////////////////////////////////////////////////////////////////
//////###### RECOGER VALORES DE LAS CHECKBOXES ####### ///////////	
		//flechaCheckBox_ID == label[for=id] == company name
		//squareCheckBox es lo que el user controla
		//flechaCheckBox contiene lo que el user quiere
				
	// ARRAYS OF IDS
	var squareCheckBox_Arr_of_ids = [];
	var flechaCheckBox_Arr_of_ids = [];
	// ARRAYS OF CHECKED-NOT-CHECKED
	var checkedCompaniesArr = [];
	var uncheckedCompaniesArr = [];	
	var countCheckBoxes = companiasGrandes.length + 1;
	
	for (var x = 0; x < countCheckBoxes; x++ ) {		
		flechaCheckBox = "node-0-0-0-" + x;
		squareCheckBox =  "inputid" + x;		
		flechaCheckBox_Arr_of_ids.push(flechaCheckBox);
		squareCheckBox_Arr_of_ids.push(squareCheckBox);			
	}	
	for (var x = 0; x < squareCheckBox_Arr_of_ids.length; x++ ) {	
		getCompanyName(x);		// squareCheckBox_Arr_of_ids.length == 10 == 9 companias + grupo pequenas
	}	
	
	function printArr(arr) {for (var i=0; i<arr.length; i++) {console.log(arr[i]);}} //end function printArr
	function cleanCheckedCompaniesArr() {		
		if (checkedCompaniesArr.length > 0) {
			 for (var i = 0; i < checkedCompaniesArr.length; i++) { 
				 	delete checkedCompaniesArr[i];
			 }
		};
	}; //end function cleanCheckedCompaniesArr
	
	//STRIP OF WHITESPACES:
	//https://stackoverflow.com/questions/360491/how-do-i-strip-white-space-when-grabbing-text-with-jquery
	
	function getCompanyName(x) { 
		
		var todasChecked = false;
		var isChecked = false;
		var squareCheckBoxItem =  $('#' + squareCheckBox_Arr_of_ids[x]);
		var flechaCheckBoxItemID =  flechaCheckBox_Arr_of_ids[x]; 	
		
	
		var $todasCompanias = $('#inputTodas');
		
		$todasCompanias.click(function() {
			if(todasChecked === false) {
				todasChecked = true;
			} else {
				cleanCheckedCompaniesArr();
				todasChecked = false;
			}
		});
// end $todasCompanias.clic */

		squareCheckBoxItem.click(function() {	
					$label = $('label[for="' + flechaCheckBox_Arr_of_ids[x] + '"]');  
					var checkedCo = $.trim($label.text());
					
					if(isChecked === false) {			
						checkedCompaniesArr.push(checkedCo);
					 	isChecked = true;
					} else {
						//https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
						var indexCheckedCo = checkedCompaniesArr.indexOf(checkedCo);
						if (indexCheckedCo > -1) {			
							checkedCompaniesArr.splice(indexCheckedCo, 1);
						}
						isChecked = false;
					}	 	   
			}); // end squareCheckBoxItem.click
		
	}
//////////////////////////////////////////////////////////////////
////////////////## FUNCIONES LAYERS ###///////////////////////////

//////////////////////////////		
	var pointToLayerEnergia = function (feature, latlng) {
		var energia = feature.properties.energia;
		if (energia < rangoEnergia1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (energia < rangoEnergia2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (energia < rangoEnergia3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (energia < rangoEnergia4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (energia < rangoEnergia5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (energia < rangoEnergia6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArrEN.push(marker); return;
		}};
	var pointToLayerTemperatura = function (feature, latlng) {
		var temperatura = feature.properties.temperatura;
		if (temperatura < rangoTemperatura1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (temperatura < rangoTemperatura2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (temperatura < rangoTemperatura3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (temperatura < rangoTemperatura4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (temperatura < rangoTemperatura5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (temperatura < rangoTemperatura6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArrTE.push(marker); return;
		}};
	var pointToLayerviento = function (feature, latlng) {
		var velocidadviento = feature.properties.velocidadviento;
		if (velocidadviento < rangoViento1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return; 
		} else if (velocidadviento < rangoViento2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker);  return;
		} else if (velocidadviento < rangoViento3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker);  return;
		} else if (velocidadviento < rangoViento4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		} else if (velocidadviento < rangoViento5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker);  return;
		} else if (velocidadviento < rangoViento6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		}
	};
	
//////////////////////////////////////////////////////////////////
//////////////### DEFINIR LAYERS TOPO JSON ##### /////////////////
		
		var topoLayerEnergia = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerEnergia});
		
		var topoLayerTemperatura = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerTemperatura});
		
		var topoLayerViento = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerviento});


//////////////////////////////////////////////////////////////////
//////////////### BOTONES ##### //////////////////////////////////	
		
//////////////////////////////////////////////////////////////////
//////###### BUSCADOR ##################///////////////////////
		function buscarPanel() {
			
			limpiarMarkers();
				
					var $valId_ =  $('input[id="identificador"]').val();
					var $valId = parseInt($valId_);
					var $valCompany = $('#compania option:selected').text();   		
							
					var pointToLayerBUSQ = function (feature, latlng) {
						var marker = L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker);
						return marker;
					}; //END pointToLayerBUSQ
					
					function filterBUSQ(feature, latlng) {
						var fpValId = feature.properties.panelId.id;
						var fpValCompany = feature.properties.panelId.compania;				
						if (!$valId && fpValCompany === $valCompany) {
							 return true;
						} else if ($valId === fpValId && $valCompany === fpValCompany) {
							return true						
						} else if (!$valCompany && $valId === fpValId) { 
							 return true 			
						} else {
							return;			
						}
						  
						}; // END filterBUSQ
					
					var onEachFeatureBUSQ = function(feature, layer) {
						var fpValId = feature.properties.panelId.id;
						var fpValCompany = feature.properties.panelId.compania;	
						layer.bindPopup("Panel: " + fpValCompany + " ID: " + fpValId );
					}; //END onEachFeatureBUSQ
						
					var topoLayerBusqueda = new L.TopoJSON(null, { pointToLayer: pointToLayerBUSQ,
						filter: filterBUSQ,
						onEachFeature: onEachFeatureBUSQ});
						
					$.getJSON(topoData).done(addTopoData);
					
					function addTopoData(topoData){ 				
							topoLayerBusqueda.addData(topoData);
							markersCG_busqueda.addLayer(topoLayerBusqueda);
							mymap.addLayer(markersCG_busqueda);
							mymap.fitBounds(markersCG_busqueda.getBounds());
					//	console.log(topoData.features);
					}
		}; //END OF function for btn_BUSCADOR
		



	$("#modalBtnBuscarPanel").on("click", function() {		
		buscarPanel();
		$("#myModal").modal('hide');
	});

	
///////////////////////////////////////////////////////////////////	
/////////########## MOSTRAR CAPAS 3 PARAMETROS ##########///////////

	$("#btn_topos_3paras").on("click", function() {		

		limpiarMarkers();
			$.getJSON(topoData).done(addTopoData);			

		function addTopoData(topoData){ 
			
			 var topoLayer = "";
			 var visibleLayer = $("input[name='visiblelayer']:checked").val();
	         switch (visibleLayer){
	         case "energia": topoLayer = topoLayerEnergia;  arr = markerArrEN; break;
	         case "temperatura": topoLayer = topoLayerTemperatura; arr = markerArrTE; break;
	         case "viento": topoLayer = topoLayerViento; arr = markerArrVI; break;
	         } 

	    	 topoLayer.addData(topoData);
			 topoLayer.addTo(mymap);	

			};	
		
	});//END OF btn_topos_3paras

///////////////////////////////////////////////////////////////////	
/////////########## MOSTRAR POR COMPAÑIA ##########///////////

$("#btn_topos_companias").on("click", function() {	

	limpiarMarkers();

	//var companyName =  getCompanyName(XXXX);						
	var pointToLayerCOMPANIAS = function (feature, latlng) {
		var marker = L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker);
		return marker;
	}; //END pointToLayerCOMPANIAS
	
	function filterCOMPANIAS(feature, latlng) {
		var fpCompanyName = feature.properties.panelId.compania;					
		if (isInArray(fpCompanyName, checkedCompaniesArr)) {
			
		return true;
							  
		};
	};// END filterCOMPANIAS
				
	var onEachFeatureCOMPANIAS = function(feature, layer) {
		var fpValId = feature.properties.panelId.id;
		var fpValCompany = feature.properties.panelId.compania;	
		layer.bindPopup("Panel: " + fpValCompany + " ID: " + fpValId );
		//layer.bindTooltip("Energia: "+ feature.properties.energia + "W")
	}; //END onEachFeatureBUSQ
		
	var topoLayerCOMPANIAS = new L.TopoJSON(null, { pointToLayer: pointToLayerCOMPANIAS,
		filter: filterCOMPANIAS,
		onEachFeature: onEachFeatureCOMPANIAS});
		
	$.getJSON(topoData).done(addTopoData);
	
	function addTopoData(topoData){ 				
			topoLayerCOMPANIAS.addData(topoData);
			markersCG_COMPANIAS.addLayer(topoLayerCOMPANIAS);
			mymap.addLayer(markersCG_COMPANIAS);
	}	
	
}); //END OF btn_topos_companias

//////////////////////////////////////////////////////////////////
//////###### PRUEBAS ##################///////////////////////
	
	
$("#boton_pruebas").on("click",function(){

	limpiarMarkers();

	//var companyName =  getCompanyName(XXXX);						
	var pointToLayerPRUEBAS = function (feature, latlng) {
		var marker = L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker);
		return marker;
	
	
	}; //END pointToLayerPRUEBAS
	
	function filterPRUEBAS(feature, latlng) {
		var fpCompanyName = feature.properties.panelId.compania;					
		if (isInArray(fpCompanyName, checkedCompaniesArr)) {
			
		return true;
							  
		};
	};// END filterPRUEBAS
				
	var onEachFeaturePRUEBAS = function(feature, layer) {
		var fpValId = feature.properties.panelId.id;
		var fpValCompany = feature.properties.panelId.compania;	
		var fpenergia = feature.properties.energia;
		var fptemperatura = feature.properties.temperatura;
		var fpviento = feature.properties.velocidadviento;
		
		 var parameter = $("input[name='visiblelayer']:checked").val();
	     switch (parameter){
	     case "energia": layer.bindTooltip("Panel: " + fpValCompany + " ID: " + fpValId + " ENERGIA: " + fpenergia ); break;
	     case "temperatura": layer.bindTooltip("Panel: " + fpValCompany + " ID: " + fpValId + " TEMPERATURA: " + fpenergia); break;
	     case "viento": layer.bindTooltip("Panel: " + fpValCompany + " ID: " + fpValId+ " VIENTO: " + fpviento ); break;
	     } 
	
		//layer.bindTooltip("Energia: "+ feature.properties.energia + "W")
	}; //END onEachFeatureBUSQ
		
	var topoLayerPRUEBAS = new L.TopoJSON(null, { pointToLayer: pointToLayerPRUEBAS,
		filter: filterPRUEBAS,
		onEachFeature: onEachFeaturePRUEBAS});
		
	$.getJSON(topoData).done(addTopoData);
	
	function addTopoData(topoData){ 				
			topoLayerPRUEBAS.addData(topoData);
			markersCG_PRUEBAS.addLayer(topoLayerPRUEBAS);
			mymap.addLayer(markersCG_PRUEBAS);
	}	
	limpiarMarkers();
	$.getJSON(topoData).done(addTopoData);				

});//END OF PRUEBAS
            
	
});//END OF JQUERY FUNCTION























