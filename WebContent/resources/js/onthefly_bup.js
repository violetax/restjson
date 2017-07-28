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
			for (var i=0; i < checkedCompaniesArr.length; i++) {
					var indexItemToRemove = checkedCompaniesArr.indexOf(checkedCompaniesArr[i]);
					if (indexItemToRemove > -1) {			
						checkedCompaniesArr.splice(indexItemToRemove, 1);
					}
				}
		};
	}; //end function cleanCheckedCompaniesArr
	
	//STRIP OF WHITESPACES:
	//https://stackoverflow.com/questions/360491/how-do-i-strip-white-space-when-grabbing-text-with-jquery
	var count= 0;
	function getCompanyName(x) { 
		
		var todasChecked = false;
		var pequenasChecked = false;
		var isChecked = false;
		var $squareCheckBoxItem =  $('#' + squareCheckBox_Arr_of_ids[x]);
		var flechaCheckBoxItemID =  flechaCheckBox_Arr_of_ids[x]; 	
		
	
		var $todasCompanias = $('#inputTodas');
		var $pequenas = $('#inputid9');
		
				
		$todasCompanias.click(function() {
			if(todasChecked === false) {
				while (count <10) {
					count++
					if (count=10) {
						for (var i = 0; i < companias.length; i++) {
							checkedCompaniesArr.push(companias[i]);
						}
						printArr(checkedCompaniesArr);
						}
					}; 
				// end while
				todasChecked = true;
			} else {
				cleanCheckedCompaniesArr();
				todasChecked = false;
				console.log(todasChecked);
			}
		}); // end $todasCompanias.clic */
		
		
		
		$pequenas.click(function() {
			if(pequenasChecked === false) {
				pequenasChecked = true;
			} else {			
				pequenasChecked = false;
			}
		}); // end $todasCompanias.clic */


		$squareCheckBoxItem.click(function() {	
					$label = $('label[for="' + flechaCheckBox_Arr_of_ids[x] + '"]');  
					var checkedCo = $.trim($label.text());
				
			if(pequenasChecked) {
				for (var i = 0; i < companiasPequenas.length; i++) {
					checkedCompaniesArr.push(companiasPequenas[i]);
				}
			} else {
				for (var i=0; i < companiasPequenas.length; i++) {
					if (isInArray(companiasPequenas[i], checkedCompaniesArr)) {
						var indexItemToRemove = checkedCompaniesArr.indexOf(companiasPequenas[i]);
						if (indexItemToRemove > -1) {			
							checkedCompaniesArr.splice(indexItemToRemove, 1);
						}
					}
			}}; //end check pequenas
			
		
			if (todasChecked) {			
				
			} else {
				if(isChecked === false) {			
					checkedCompaniesArr.push(checkedCo);
				 	isChecked = true;

				} else {
					var indexCheckedCo = checkedCompaniesArr.indexOf(checkedCo);
					if (indexCheckedCo > -1) {			
						checkedCompaniesArr.splice(indexCheckedCo, 1);
					}
					isChecked = false;
				}		
			}; //end check ALL
			
			
						 	   
			}); // end squareCheckBoxItem.click
		
	 	printArr(checkedCompaniesArr);
		
	}; // END OG GETCOMPANYNAME
//////////////////////////////////////////////////////////////////
////////////////## FUNCIONES LAYERS ###///////////////////////////

//////////////////////////////		
	var pointToLayerEnergia = function (feature, latlng) {
		var parametroMedida1 = feature.properties.parametroMedida1;
		if (parametroMedida1 < rangoEnergia1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.parametroMedida1 + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (parametroMedida1 < rangoEnergia2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.parametroMedida1 + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (parametroMedida1 < rangoEnergia3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.parametroMedida1 + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (parametroMedida1 < rangoEnergia4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.parametroMedida1 + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (parametroMedida1 < rangoEnergia5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.parametroMedida1 + "W").addTo(mymap); markerArrEN.push(marker); return;
		} else if (parametroMedida1 < rangoEnergia6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.parametroMedida1 + "W").addTo(mymap); markerArrEN.push(marker); return;
		}};
	var pointToLayerTemperatura = function (feature, latlng) {
		var parametroMedida2 = feature.properties.parametroMedida2;
		if (parametroMedida2 < rangoTemperatura1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.parametroMedida2 + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (parametroMedida2 < rangoTemperatura2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.parametroMedida2 + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (parametroMedida2 < rangoTemperatura3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.parametroMedida2 + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (parametroMedida2 < rangoTemperatura4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.parametroMedida2 + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (parametroMedida2 < rangoTemperatura5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.parametroMedida2 + "C").addTo(mymap); markerArrTE.push(marker); return;
		} else if (parametroMedida2 < rangoTemperatura6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.parametroMedida2 + "C").addTo(mymap); markerArrTE.push(marker); return;
		}};
	var pointToLayerparametroMedida3 = function (feature, latlng) {
		var parametroMedida3 = feature.properties.parametroMedida3;
		if (parametroMedida3 < rangoViento1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.parametroMedida3 + "Km/h").addTo(mymap); markerArrVI.push(marker); return; 
		} else if (parametroMedida3 < rangoViento2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.parametroMedida3 + "Km/h").addTo(mymap); markerArrVI.push(marker);  return;
		} else if (parametroMedida3 < rangoViento3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.parametroMedida3 + "Km/h").addTo(mymap); markerArrVI.push(marker);  return;
		} else if (parametroMedida3 < rangoViento4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.parametroMedida3 + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		} else if (parametroMedida3 < rangoViento5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.parametroMedida3 + "Km/h").addTo(mymap); markerArrVI.push(marker);  return;
		} else if (parametroMedida3 < rangoViento6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.parametroMedida3 + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
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
		    pointToLayer: pointToLayerparametroMedida3});


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

		
	});//END OF btn_topos_3paras

///////////////////////////////////////////////////////////////////	
/////////########## MOSTRAR POR COMPAÑIA ##########///////////

$("#btn_topos_companias").on("click", function() {	

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
		var fpparametroMedida1 = feature.properties.parametroMedida1;
		var fpparametroMedida2 = feature.properties.parametroMedida2;
		var fpparametroMedida3 = feature.properties.parametroMedida3;
		
		 var parameter = $("input[name='visiblelayer']:checked").val();
	     switch (parameter){
	     case "parametroMedida1": layer.bindTooltip("Panel: " + fpValCompany + " ID: " + fpValId + " ENERGIA: " + fpparametroMedida1 ); break;
	     case "parametroMedida2": layer.bindTooltip("Panel: " + fpValCompany + " ID: " + fpValId + " TEMPERATURA: " + fpparametroMedida1); break;
	     case "parametroMedida3": layer.bindTooltip("Panel: " + fpValCompany + " ID: " + fpValId+ " VIENTO: " + fpparametroMedida3 ); break;
	     } 
	
		//layer.bindTooltip("Energia: "+ feature.properties.parametroMedida1 + "W")
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


}); //END OF btn_topos_companias

//////////////////////////////////////////////////////////////////
//////###### PRUEBAS ##################///////////////////////
	
	
$("#boton_pruebas").on("click",function(){

});//END OF PRUEBAS

            
	
});//END OF JQUERY FUNCTION























