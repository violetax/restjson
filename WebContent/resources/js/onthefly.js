$.noConflict();

jQuery( function( $ ) {
	
	
console.log("Funcionan mis funciones?");

//console.log("isInArray(el, arr): returns boolean ok");
//console.log("emptyArr(array): does");
//console.log("fillUpArr(sourceArr, targetArr): does");
//console.log("removeArrElementByVal(arr, itemToRemove): does");
//console.log("removeDuplicatesArr(dupArr, uniqueArr): noooooooooo!");

var companias = ["ACCE","AUPN","EEPN","ENDS","EONE","EOPN","FLPN","GDFS","GEPN","GNFE","HCEN","HLPN","IBDR","IMPN","NTRG","NXPN","PEPN","SHEL","SYPN","VMPN"];
var dupArr =  ["ACCE","AUPN","EEPN","ENDS","EONE", "XXXX", "ACCE","AUPN","EEPN","ENDS","EONE","EOPN" ]
var uniqueArr = [];



//removeDuplicatesArr(pruebasArr, uniqueArr);





	
	
	
		
// FUNCIONES CON JQUERY ///


	
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
		//console.log("¡Ciclo hecho!")
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
		getCompanyName(x);		// 10 veces: squareCheckBox_Arr_of_ids.length == 10 == 9 companias + grupo grupoPequenasCheckBox
	}	

	var count= 0;
	function getCompanyName(x) { 

		var unaCHECK = false;
		var checkedCompaniesArrPREV = [];
		var $unaCompaniaCheckBox =  $('#' + squareCheckBox_Arr_of_ids[x]);		
		//var flechaCheckBoxItemID =  flechaCheckBox_Arr_of_ids[x]; 	
		$unaCompaniaCheckBox.click(function() {	
			
			$label = $('label[for="' + flechaCheckBox_Arr_of_ids[x] + '"]');  
			var checkedCo = $.trim($label.text());

				if(unaCHECK === false) {			
					checkedCompaniesArrPREV.push(checkedCo);
					removeDuplicatesArr(checkedCompaniesArrPREV, checkedCompaniesArr)
				 	unaCHECK = true;

				} else {
					removeArrElementByVal(checkedCompaniesArrPREV, checkedCo)
					removeDuplicatesArr(checkedCompaniesArrPREV, checkedCompaniesArr)
					unaCHECK = false;
				}		
		 	   
			}); // end unaCompaniaCheckBox.click
		
		
	}; // END OG GETCOMPANYNAME


//////////////////////////////////////////////////////////////////
//////////////### BOTONES ##### //////////////////////////////////	
		
//////////////////////////////////////////////////////////////////
//////###### BUSCADOR ##################///////////////////////
		function buscarPanel() {
			
//			limpiarMarkers();
				
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
	

/// ##################################################
$("#btn_topos_companias").on("click", function() {	
	
	limpiarMarkers();
	
//	emptyArr(checkedCompaniesArr);
/// RECOGER NOMBRE COMPANIA
	
	
	/// PENDIENTE QUE NO DOBLE
	for (var i=0; i < companias.length; i++) {			
		$checkBox = $('input[id="' + companias[i] + '"]');  
		$label = $('label[for="' + companias[i] + '"]');  
		var checkedCompany = $.trim($label.text());
		
		if ($checkBox.prop('checked')) {
			checkedCompaniesArr.push(checkedCompany);
		};		
	}; //console.log(checkedCompaniesArr);

	
var parameter = $("input[name='visiblelayer']:checked").val();

// FUNCIONES DE LA TOPOJSON LAYER	

//var marker = L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker);
//return marker;


var pointToLayerGRAL = function(parameter, fpParameter, latlng) {
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
    case "parametroMedida1": 
    	fillUpArr(rangosEnergia, rangosArr);
    	break;
    case "parametroMedida2": 
    	fillUpArr(rangosTemperatura, rangosArr);
    	break;
    case "parametroMedida3": 
    	fillUpArr(rangosViento, rangosArr);
    	break;
	}; //end of switch (parameter)
	
		var numberOfCorrelatedItems = 6;
		for (var i=0; i < numberOfCorrelatedItems; i++) {
			var ctrlParameter = parseInt(fpParameter);
			var ctrlRango = parseInt(rangosArr[i]);
			if (ctrlParameter < ctrlRango) {
				marker =  markerArrParameter[i];
			} //end if
		}; //end for
		return marker;
}; //END pointToLayerPanelesFILTERED

var pointToLayerPanelesFILTERED = function (feature, latlng) {	
	//var fpParameter = feature.properties.parametroMedida1;
	var fpParameter;
	
	switch (parameter){
    case "parametroMedida1": 
    	fpParameter = feature.properties.parametroMedida1;
    	break;
    case "parametroMedida2": 
    	fpParameter = feature.properties.parametroMedida2;
    	break;
    case "parametroMedida3": 
    	fpParameter = feature.properties.parametroMedida3;
    	break;
	}; //end of switch (parameter)
	
	//console.log(fpParameter);
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
	//	console.log("HERE");
		
		var fpValId = feature.properties.panelId.id;
		var fpValCompany = feature.properties.panelId.compania;	
		var fpparametroMedida1 = feature.properties.parametroMedida1;
		var fpparametroMedida2 = feature.properties.parametroMedida2;
		var fpparametroMedida3 = feature.properties.parametroMedida3;
		
		htmlComun = "Panel Id: " +  fpValCompany + " " + fpValId +"<br /> "
			
		htmlEnergia =  htmlComun + "Energia: " + fpparametroMedida1;
		htmlTemperatura = htmlComun +  "Temperatura: " + fpparametroMedida2;
		htmlViento = htmlComun + "Viento: " + fpparametroMedida3;
		
		switch (parameter){
		case "parametroMedida1": layer.bindTooltip(htmlEnergia); break;
		case "parametroMedida2": layer.bindTooltip(htmlTemperatura); break;
		case "parametroMedida3": layer.bindTooltip(htmlViento); break;
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























