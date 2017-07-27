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
	for (var x = 0; x < squareCheckBox_Arr_of_ids.length - 1; x++ ) {
		getCompanyName(x);
	}

///////////////////////////////////////////////////////////////////	
/////////########## MOSTRAR POR COMPAÑIA ##########///////////

var checkedCompaniesArr = [];
//emptyArr(checkedCompaniesArr);
/// RECOGER NOMBRE COMPANIA
	var unaCHECK = false;
	var todasCHECK = false;
	var grupoPequenasCheckBoxCHECK = false;	


	var $todasCompaniasCheckBox = $('#inputTodas');
	var $grupoPequenasCheckBox = $('#inputid9');
	
	
	$todasCompaniasCheckBox.click(function() {
		if(todasCHECK === false) {
			todasCHECK = true;	
			grupoPequenasCheckBoxCHECK = true
			if (checkedCompaniesArr.length > 1) {
				emptyArr(checkedCompaniesArr);
			}; 
			traspasarArr(companias, checkedCompaniesArr)	
			console.log(checkedCompaniesArr);
		} else {
			todasCHECK = false;
			if (checkedCompaniesArr.length > 1) {
				emptyArr(checkedCompaniesArr);
			}; console.log(checkedCompaniesArr);			
		}
		return checkedCompaniesArr;
	}); // end $todasCompaniasCheckBox.clic */
	
	$grupoPequenasCheckBox.click(function() {
		if(grupoPequenasCheckBoxCHECK === false) {
			grupoPequenasCheckBoxCHECK = true;	  
		    if (!isInArray(companiasPequenas[0], checkedCompaniesArr)) {
				console.log(checkedCompaniesArr);
				traspasarArr(companiasPequenas, checkedCompaniesArr)		
			} console.log(checkedCompaniesArr);
		} else {
			grupoPequenasCheckBoxCHECK = false;
			if (isInArray(companiasPequenas[0], checkedCompaniesArr)) {
				for (var i =0 ; i < companiasPequenas.length; i++) {
					removeArrElementByVal(checkedCompaniesArr, companiasPequenas[i]);
				} console.log(checkedCompaniesArr);
			}	
		};
		return checkedCompaniesArr;
	}); // end $todasCompaniasCheckBox.clic */

	function getCompanyName(x) {
		
		var $unaCompaniaCheckBox =  $('#' + squareCheckBox_Arr_of_ids[x]);	
		$unaCompaniaCheckBox.click(function() {			
			$label = $('label[for="' + flechaCheckBox_Arr_of_ids[x] + '"]');  
			var checkedCo = $.trim($label.text());
			console.log(checkedCo);
			
			if(!isInArray(checkedCo, checkedCompaniesArr)) {
				checkedCompaniesArr.push(checkedCo);
				console.log(checkedCompaniesArr);
			} else {
				removeArrElementByVal(checkedCompaniesArr, checkedCo);
				console.log(checkedCompaniesArr);
			} ;
					
				if(unaCHECK === false) {
					unaCHECK = true;
				} else {
					unaCHECK = false; 
				}
	
			}); // end unaCompaniaCheckBox.click
		return checkedCompaniesArr;
	};
	

$("#btn_topos_companias").on("click", function() {	
	
limpiarMarkers();

var parameter = $("input[name='visiblelayer']:checked").val();

// FUNCIONES DE LA TOPOJSON LAYER	

//var marker = L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker);
//return marker;


var pointToLayerGRAL = function(parameter, fpParameter, latlng) {
	var rangosArr = 		[];
	var rangosEnergia = 	[1,2,3,4,5,6];
	var rangosTemperatura = [10,15,20,30,40,50];
	var rangosViento = 		[2,5,10,20,50,80];
	
	marker1 = L.marker(latlng,{icon: blueIcon}); 
	marker2 = L.marker(latlng,{icon: greenIcon}); 
	marker3 = L.marker(latlng,{icon: yellowIcon}); 
	marker4 = L.marker(latlng,{icon: redIcon}); 
	marker5 = L.marker(latlng,{icon: orangeIcon}); 
	marker6 = L.marker(latlng,{icon: violetIcon}); 
	var markerArrParameter = [marker1,marker2,marker3,marker4,marker5,marker6];
	
	switch (parameter){
    case "energia": 
    	traspasarArr(rangosEnergia, rangosArr);
    	break;
    case "temperatura": 
    	traspasarArr(rangosTemperatura, rangosArr);
    	break;
    case "viento": 
    	traspasarArr(rangosViento, rangosArr);
    	break;
	}; //end of switch (parameter)
	console.log(parameter);
		var numberOfCorrelatedItems = 6;
		for (var i = numberOfCorrelatedItems; i>= 2; i--) {
			var ctrlParameter = parseInt(fpParameter);
			var ctrlRangoMAX = parseInt(rangosArr[i-1]); 
			var ctrlRangoMIN = parseInt(rangosArr[i-2]);
			console.log(ctrlRangoMAX);
			console.log(ctrlParameter);
			console.log(ctrlRangoMIN);
			if ((ctrlParameter < ctrlRangoMAX) && (ctrlParameter >= ctrlRangoMIN)) {
				marker =  markerArrParameter[i];
				return marker;
			}; //end if
		}; //end for
		//return marker;
		//console.log(marker);
}; //END pointToLayerPanelesFILTERED

var pointToLayerPanelesFILTERED = function (feature, latlng) {	
	//var fpParameter = feature.properties.energia;
	var fpParameter;
	
	switch (parameter){
    case "energia": 
    	fpParameter = feature.properties.energia;
    	break;
    case "temperatura": 
    	fpParameter = feature.properties.temperatura;
    	break;
    case "viento": 
    	fpParameter = feature.properties.velocidadviento;
    	break;
	}; //end of switch (parameter)
	
	var marker = pointToLayerGRAL(parameter, fpParameter, latlng);
	return marker;
};// END filterPanelesFILTERED


var filterPanelesFILTERED = function(feature, latlng) {
	var fpCompanyName = feature.properties.panelId.compania;
	if (isInArray(fpCompanyName, checkedCompaniesArr)) {	
		return true;	  
	};
}
			
	var onEachFeaturePanelesFILTERED = function(feature, layer) {

		var fpValId = feature.properties.panelId.id;
		var fpValCompany = feature.properties.panelId.compania;	
		var fpenergia = feature.properties.energia;
		var fptemperatura = feature.properties.temperatura;
		var fpviento = feature.properties.velocidadviento;
		
		htmlComun = "Panel Id: " +  fpValCompany + " " + fpValId +"<br /> "
			
		htmlEnergia =  htmlComun + "Energia: " + fpenergia;
		htmlTemperatura = htmlComun +  "Temperatura: " + fptemperatura;
		htmlViento = htmlComun + "Viento: " + fpviento;
		
		switch (parameter){
			case "energia": layer.bindTooltip(htmlEnergia); break;
			case "temperatura": layer.bindTooltip(htmlTemperatura); break;
			case "viento": layer.bindTooltip(htmlViento); break;
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


//////////////////////////////////////////////////////////////////
//////###### BUSCADOR ##################///////////////////////
	function buscarPanel() {
		
//		limpiarMarkers();
			
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

            
	
});//END OF JQUERY FUNCTION























