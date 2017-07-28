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

	var countCheckBoxes = companiasGrandes.length + 1;
	
	for (var x = 0; x < countCheckBoxes; x++ ) {		
		flechaCheckBox = "node-0-0-0-" + x;
		squareCheckBox =  "inputid" + x;		
		flechaCheckBox_Arr_of_ids.push(flechaCheckBox);
		squareCheckBox_Arr_of_ids.push(squareCheckBox);			
	}	
	for (var x = 0; x < squareCheckBox_Arr_of_ids.length; x++ ) {	
		getCompanyName(x);		// 10 veces: squareCheckBox_Arr_of_ids.length == 10 == 9 companias + grupo grupoPequenasCheckBox
	}	

	var count= 0;
	function getCompanyName(x) { 

		var unaCHECK = false;
		var $unaCompaniaCheckBox =  $('#' + squareCheckBox_Arr_of_ids[x]);		
		//var flechaCheckBoxItemID =  flechaCheckBox_Arr_of_ids[x]; 	
		$unaCompaniaCheckBox.click(function() {	
			
			$label = $('label[for="' + flechaCheckBox_Arr_of_ids[x] + '"]');  
			var checkedCo = $.trim($label.text());

				if(unaCHECK === false) {			
					checkedCompaniesArr.push(checkedCo);
				 	unaCHECK = true;

				} else {
					removeArrElementByVal(checkedCompaniesArr, checkedCo)
					unaCHECK = false;
				}		
		 	   
			}); // end unaCompaniaCheckBox.click
		
	 	consoleLogArr(checkedCompaniesArr);
		
	}; // END OG GETCOMPANYNAME


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
	
//// CHECKS COMPANIAS SELECCIONADAS ///////////////////////////

	var todasCHECK = false;
	var grupoPequenasCheckBoxCHECK = false;		
	var $todasCompaniasCheckBox = $('#inputTodas');
	var $grupoPequenasCheckBox = $('#inputid9');
	
	$todasCompaniasCheckBox.click(function() {
		if(todasCHECK === false) {
			todasCHECK = true;
		} else {
			todasCHECK = false;
		}
	}); // end $todasCompaniasCheckBox.clic */
	
	$grupoPequenasCheckBox.click(function() {
		if(grupoPequenasCheckBoxCHECK === false) {
			grupoPequenasCheckBoxCHECK = true;
		} else {			
			grupoPequenasCheckBoxCHECK = false;
		}
	}); // end $todasCompaniasCheckBox.clic */
	

$("#btn_topos_companias").on("click", function() {	

// LIMPIAR MARCADORES Y LLAYERS PREVIAS
	limpiarMarkers();

// AJUSTAR checkedCompaniesArr
	if (todasCHECK) {
		emptyArr(checkedCompaniesArr);
		fillUpArr(companias, checkedCompaniesArr);
	} else {
		if (grupoPequenasCheckBoxCHECK) {
			fillUpArr(companiasPequenas, checkedCompaniesArr);
		} 
	}; // end check chekBoxes

// FUNCIONES DE LA TOPOJSON LAYER					
	var pointToLayerPanelesFILTERED = function (feature, latlng) {
		var marker = L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker);
		return marker;	
	}; //END pointToLayerPanelesFILTERED
	
	function filterPanelesFILTERED(feature, latlng) {
		var fpCompanyName = feature.properties.panelId.compania;					
		if (isInArray(fpCompanyName, checkedCompaniesArr)) {
			
		return true;
							  
		};
	};// END filterPanelesFILTERED
				
	var onEachFeaturePanelesFILTERED = function(feature, layer) {
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
	
	}; //END onEachFeatureBUSQ

// TOPOJSON LAYER
	var topoLayerPanelesFILTERED = new L.TopoJSON(null, { pointToLayer: pointToLayerPanelesFILTERED,
		filter: filterPanelesFILTERED,
		onEachFeature: onEachFeaturePanelesFILTERED});
		
	$.getJSON(topoData).done(addTopoData);
	
	function addTopoData(topoData){ 				
			topoLayerPanelesFILTERED.addData(topoData);
			markersCG_PanelesFILTERED.addLayer(topoLayerPanelesFILTERED);
			mymap.addLayer(markersCG_PanelesFILTERED);
	}	

}); //END OF btn_topos_companias

//////////////////////////////////////////////////////////////////
//////###### PanelesFILTERED ##################///////////////////////
	
	
$("#boton_pruebas").on("click",function(){

});//END OF PanelesFILTERED

            
	
});//END OF JQUERY FUNCTION























