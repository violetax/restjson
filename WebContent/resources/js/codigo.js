$.noConflict();

jQuery( function( $ ) {
	
	
////////FUNCIONAMIENTO VERTICAL MENU //////////////////////////////////////


	$(".acidjs-css3-treeview").delegate("label input:checkbox", "change", function() {
	    var
	        checkbox = $(this),
	        nestedList = checkbox.parent().next().next(),
	        selectNestedListCheckbox = nestedList.find("label:not([for]) input:checkbox");
	 
	    if(checkbox.is(":checked")) {
	        return selectNestedListCheckbox.prop("checked", true);
	    }
	    selectNestedListCheckbox.prop("checked", false);
	});
	
	


//DEFINIR MAPA BASE ##########///////////////////////////////////////////////////////////////////////

initlat = 42.994603451901334;
initlng = -2.4238586425781254;
initzoom = 9;
	
mymap = L.map('mapid', { zoomControl: false} ).setView([initlat, initlng], initzoom);

L.control.zoom({
    position:'bottomright'
}).addTo(mymap);

initialLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
});

initialLayer.addTo(mymap);


//MOSTRAR LAS COORDENADAS DEL PUNTO EN PANTALLA ##########///////////////////////////////////////////////////////////////////////
mymap.on('click', getCoordinates);


/// CARGAR DATOS 
var topoData ;

topoData = "resources/topojson/muestra.featureCollection.topo.json";


//////////////////////////////////////////////////////////////////
//////###### RECOGER NOMBRES DE LAS COMPANIAS DE LAS CHECKBOXES ####### ///////////	

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
		} else {
			todasCHECK = false;
			if (checkedCompaniesArr.length > 1) {
				emptyArr(checkedCompaniesArr);
			}; 			
		}
		return checkedCompaniesArr;
	}); // end $todasCompaniasCheckBox.clic */
	
	$grupoPequenasCheckBox.click(function() {
		if(grupoPequenasCheckBoxCHECK === false) {
			grupoPequenasCheckBoxCHECK = true;	  
		    if (!isInArray(companiasPequenas[0], checkedCompaniesArr)) {
				console.log(checkedCompaniesArr);
				traspasarArr(companiasPequenas, checkedCompaniesArr)		
			}
		} else {
			grupoPequenasCheckBoxCHECK = false;
			if (isInArray(companiasPequenas[0], checkedCompaniesArr)) {
				for (var i =0 ; i < companiasPequenas.length; i++) {
					removeArrElementByVal(checkedCompaniesArr, companiasPequenas[i]);
				} 
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
			} else {
				removeArrElementByVal(checkedCompaniesArr, checkedCo);
			} ;
				
				if(unaCHECK === false) {
					unaCHECK = true;
				} else {
					unaCHECK = false; 
				}
			}); // end unaCompaniaCheckBox.click
		return checkedCompaniesArr;
	};
	


////////////BOTONES
//LIMPIEZA
//VER PANELES
//BOTON BUSCADOR
//INFORMACION

/////////// BTON LIMPIEZA
$("#boton_limpiar").on("click",function(e){	
limpiarMarkers();
});



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
	

/////////// BTON VER PANELES	
$("#btn_topos_companias").on("click", function() {	
	
	var parameter = $("input[name='visiblelayer']:checked").val();
	$("#btn_topos_companias").tooltip();

limpiarMarkers();

// FUNCIONES DE LA TOPOJSON LAYER	

var pointToLayerGRAL = function(parameter, fpParameter, latlng) {
	var rangosArr = 		[];
	var rangosEnergia = 	[0,2,3,4,5,6];
	var rangosTemperatura = [10,20,40,60,80,100];
	var rangosViento = 		[2,5,10,20,50,80];
	
	marker1 = L.marker(latlng,{icon: blueIcon}); 
	marker2 = L.marker(latlng,{icon: greenIcon}); 
	marker3 = L.marker(latlng,{icon: yellowIcon}); 
	marker4 = L.marker(latlng,{icon: redIcon}); 
	marker5 = L.marker(latlng,{icon: orangeIcon}); 
	marker6 = L.marker(latlng,{icon: violetIcon}); 
	var markerArrParameter = [marker1,marker2,marker3,marker4,marker5,marker6];
	
	switch (parameter){
    case "parametroMedida1": 
    	traspasarArr(rangosEnergia, rangosArr);
    	break;
    case "parametroMedida2": 
    	traspasarArr(rangosTemperatura, rangosArr);
    	break;
    case "parametroMedida3": 
    	traspasarArr(rangosViento, rangosArr);
    	break;
	}; //end of switch (parameter)
//	console.log(parameter);
//	console.log(fpParameter);
		var numberOfCorrelatedItems = 6;
		for (var i = numberOfCorrelatedItems; i>= 2; i--) {
			var ctrlParameter = parseInt(fpParameter);
			var ctrlRangoMAX = parseInt(rangosArr[i-1]); 
			var ctrlRangoMIN = parseInt(rangosArr[i-2]);
			if ((ctrlParameter < ctrlRangoMAX) && (ctrlParameter >= ctrlRangoMIN)) {
				marker =  markerArrParameter[i];
				return marker;
			}; //end if
		}; //end for
		//return marker;
		//console.log(marker);
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
	
	//console.log(parameter);
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

		var fpValId = feature.properties.panelId.id;
		var fpValCompany = feature.properties.panelId.compania;	
		var fpparametroMedida1 = feature.properties.parametroMedida1;
		var fpparametroMedida2 = feature.properties.parametroMedida2;
		var fpparametroMedida3 = feature.properties.parametroMedida3;
		
		htmlComun = "Panel Id: " +  fpValCompany + " " + fpValId +"<br /> "
			
		htmlParametro1 =  htmlComun + "Parametro1: " + fpparametroMedida1 + "&micro;";
		htmlParametro2 = htmlComun +  "Parametro2: " + fpparametroMedida2 + "%";
		htmlParametro3 = htmlComun + "Parametro3: " + fpparametroMedida3  + "%";
		
		switch (parameter){
			case "parametroMedida1": layer.bindTooltip(htmlParametro1); break;
			case "parametroMedida2": layer.bindTooltip(htmlParametro2); break;
			case "parametroMedida3": layer.bindTooltip(htmlParametro3); break;
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


//////////BOTON BUSCADOR


var parametrosObject = {};


var parametros_1_Array = [];
var parametros_nombre_Array = [];
var parametros_id_Array = [];

	var onEachFeatureBUSQUEDA = function(feature, layer) {
		var para2Nombre = feature.properties.panelId.compania;
		var para3Id = feature.properties.panelId.id;
		
		parametros_nombre_Array.push(para2Nombre);
		parametros_id_Array.push(para3Id);
		
		parametrosObject = {
				panelIdCompania : parametros_nombre_Array,
				panelIdId : parametros_id_Array
		}

		return parametrosObject;
	};
	
	// TOPOJSON LAYER
	var topoLayerBUSQUEDA = new L.TopoJSON(null, { 
		onEachFeature: onEachFeatureBUSQUEDA});
		
	$.getJSON(topoData).done(addTopoData);
	
	
	function addTopoData(topoData){ 	
			topoLayerBUSQUEDA.addData(topoData);
	};
/////////////////////////////////////////////////////////


var availableTags = [];
var availableTags_tmp = [];
var panelIdCompaniaTags = [];
var panelIdIdTags = [];
   

//BOTON INFORMACION

$("#boton_ayuda").on("click",function(){
	//$("#myModal").modal('hide');
	$('#myModal').modal('show')
});



$("#busqueda").on("click",function(){
	
	emptyArr(availableTags);
	emptyArr(availableTags_tmp);
	emptyArr(panelIdCompaniaTags);
	emptyArr(panelIdIdTags);

	
	traspasarArr(parametrosObject.panelIdCompania, availableTags_tmp);
	traspasarArr(parametrosObject.panelIdId, availableTags_tmp);

	removeDuplicatesArr(availableTags_tmp, availableTags);
	

	$( "#tags" ).autocomplete({
	   // source: availableTags
		 source: availableTags.map(function(a){
			 if(typeof(a) === "number"){
				 return a.toString()
			 } else {
				 return a;
			 }
	         
	     })
	  });



});//END OF boton_pruebas


    
});//END OF JQUERY FUNCTION























