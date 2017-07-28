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
	

//DEFINIR MAPA BASE CON  openstreetmap ##########///////////////////////////////////////////////////////////////////////

// COORDENADAS CENTRO PAIS VASCO
initlat = 42.994603451901334;
initlng = -2.4238586425781254;
initzoom = 9;
	
mymap = L.map('mapid', { zoomControl: false} ).setView([initlat, initlng], initzoom);

L.control.zoom({
    position:'bottomright'
}).addTo(mymap);

var initialLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
});

initialLayer.addTo(mymap);


//MOSTRAR LAS COORDENADAS DEL PUNTO EN PANTALLA ##########///////////////////////////////////////////////////////////////////////
mymap.on('click', getCoordinates);


/// CARGAR DATOS: una FEATURE COLLECTION TOPO-JSON CON 240 FEATURES


var topoData ;
topoData = "resources/topojson/muestra.featureCollection.topo.json";


// ESQUEMA DE LOS FEATURES/PANELES:
/*
 {
    type:                   FeatureCollection
    features:
    {[
        type:               Feature
        geometry:
        {
            type:           Point
            coordinates:    [lat,lng]
        },
        properties:
        {
            panelId:    {[
                compania:   String
                id:         String
            ]},
            parametroMedida1:    Number,
            parametroMedida2:    Number,
            parametroMedida3:    Number,
            parametroMedida1:    Number,
        },
    ]}
}
 */


// DECLARAR UN 'OBJETO LAYER GEOJOSON' DE LEAFLET, COMO UN 'OBJETO L.TopoJSON'. 
//SE USA UNA EXTENSION DEL FORMATO GEOJSON QUE COMPRIME LOS DATOS --> TOPOJSON

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


////////// RECOGER TEXTO DE LAS CHECKBOXES (para comparar con feature.properties.panelId.compania)

//Nombres companias
var companias = ["ACCE","AUPN","EEPN","ENDS","EONE","EOPN","FLPN","GDFS","GEPN","GNFE","HCEN","HLPN","IBDR","IMPN","NTRG","NXPN","PEPN","SHEL","SYPN","VMPN"];
var companiasGrandes = ["ACCE","ENDS","EONE","GDFS","GNFE","HCEN","IBDR","NTRG","SHEL"];
var companiasPequenas = ["AUPN","EEPN","EOPN","FLPN","GEPN","HLPN","IMPN","NXPN","PEPN","SYPN","VMPN"];
//ARRAYS OF CHECKBOXES 
var squareCheckBox_Arr_of_ids = [];
var flechaCheckBox_Arr_of_ids = [];
// ARRAYS OF COMPANIAS CHECKED-NOT-CHECKED 
var checkedCompaniesArr = [];

// BOOLEANS OF CHECKS
var unaCHECK = false;
var todasCHECK = false;
var grupoPequenasCheckBoxCHECK = false;

//SELECTORS
var $todasCompaniasCheckBox = $('#inputTodas');
var $grupoPequenasCheckBox = $('#inputid9');

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
	
/// FIN CHECKBOXES ////////////////////////////////


///////////// DECLARAR FUNCIONES GENERALES 'pointToLayer' Y 'onEachFeature' DE TODAS LAS TOPOJSON LAYER (SE USAN TRES LAYERS)   //////////////


//pointToLayer
var pointToLayerAUX = function(parameter, fpParameter, latlng) {
var parameter = $("input[name='visiblelayer']:checked").val();
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
	}; //END pointToLayerPanelesFILTERED

	var pointToLayerPanelesGENERAL = function (feature, latlng) {	
		var parameter = $("input[name='visiblelayer']:checked").val();	 
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

		
		var marker = pointToLayerAUX(parameter, fpParameter, latlng);
		return marker;
	};// END filterPanelesFILTERED

/////////////////////////////////////

//onEachFeature
var onEachFeaturePanelesGENERAL = function(feature, layer) {
	var parameter = $("input[name='visiblelayer']:checked").val();
		var fpValId = feature.properties.panelId.id;
		var fpValCompany = feature.properties.panelId.compania;	
		var fpparametroMedida1 = feature.properties.parametroMedida1;
		var fpparametroMedida2 = feature.properties.parametroMedida2;
		var fpparametroMedida3 = feature.properties.parametroMedida3;
		
		htmlComun = "<b>Panel Id:</b> " +  fpValCompany + " " + fpValId +"<br /> "
			
		htmlParametro1 =  htmlComun + "<b>Parametro 1</b>: " + fpparametroMedida1 + "&micro;";
		htmlParametro2 = htmlComun +  "<b>Parametro 2</b>: " + fpparametroMedida2 + "%";
		htmlParametro3 = htmlComun + "<b>Parametro 3</b>: " + fpparametroMedida3  + "%";
		
		switch (parameter){
			case "parametroMedida1": layer.bindTooltip(htmlParametro1); break;
			case "parametroMedida2": layer.bindTooltip(htmlParametro2); break;
			case "parametroMedida3": layer.bindTooltip(htmlParametro3); break;
		} 
	}; //END onEachFeatureBUSQ

///// FIN FUNCIONESGENERALES TOPOJSON /////////////////////
	
	
	
////CONSTRUIR UNA TOPOJSON LAYER  PARA LAS FUNCIONES DE BUSQUEDA

//arays y objects para recoger la informacion
	var parametrosObject = {};
	var parametros_nombre_Array = [];
	var parametros_id_Array = [];
	
	var availableTags = [];
	var availableTags_tmp = [];
	var panelIdCompaniaTags = [];
	var panelIdIdTags = [];

//FUNCIONES PARTICULARES DE ESTA LAYER
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
		
		
// DECLARAR, Y CARGAR DATOS
		var topoLayerBUSQUEDA = new L.TopoJSON(null, { 
			onEachFeature: onEachFeatureBUSQUEDA});
			
		$.getJSON(topoData).done(addTopoData);
		function addTopoData(topoData){ 	
				topoLayerBUSQUEDA.addData(topoData);
		};
/////////////////////////////////////////////////////////
	
	
	
//////////// CUATRO BOTONES
//LIMPIEZA
//VER PANELES
//BOTON BUSCADOR
//INFORMACION

/////////// BOTON LIMPIEZA
$("#boton_limpiar").on("click",function(e){	
	limpiarMarkers();
});


/////////// BTON VER PANELES	
$("#btn_topos_companias").on("click", function() {	

//tooltip informativo onhover 
	$("#btn_topos_companias").tooltip();

//despejar el mapa con limpiarMarkers();
	limpiarMarkers();

//Funcion particular de la layer: filtrar de acuerdo con las companias seleccionadas en las checkbox
var filterPanelesVERPANELES = function(feature, latlng) {
	var fpCompanyName = feature.properties.panelId.compania;
	if (isInArray(fpCompanyName, checkedCompaniesArr)) {	
		return true;	  
	};
}

//declarar layer
	var topoLayerPanelesVERPANELES = new L.TopoJSON(null, { pointToLayer: pointToLayerPanelesGENERAL,
		filter: filterPanelesVERPANELES,
		onEachFeature: onEachFeaturePanelesGENERAL});

//cargar los datos y desplegar en el mapa
	$.getJSON(topoData).done(addTopoData);

	function addTopoData(topoData){ 	
			topoLayerPanelesVERPANELES.addData(topoData);
			markersCG_VERPANELES.addLayer(topoLayerPanelesVERPANELES);
			mymap.addLayer(markersCG_VERPANELES);
	}	

}); //END OF btn_topos_companias
//////////////////////////////////////////////////////////////////


/// ELEMENTO-CLICK BUSQUEDA
var filterVAL;
$("#busqueda").on("click",function(){
	
//vaciar los arrays con los campos de autocomplete del input busqueda
	emptyArr(availableTags);
	emptyArr(availableTags_tmp);
	emptyArr(panelIdCompaniaTags);
	emptyArr(panelIdIdTags);

//rellenar los autocomplete con los campos de la topojson layer hecha parala busqueda
	traspasarArr(parametrosObject.panelIdCompania, availableTags_tmp);
	traspasarArr(parametrosObject.panelIdId, availableTags_tmp);
	
//borrar valores duplicados (para el nombre de las companias)
	removeDuplicatesArr(availableTags_tmp, availableTags);
	
//recoger el valor autocomplete, y pasarlo a string si es numerico
	$( "#tags" ).autocomplete({
	   // source: availableTags
		 source: availableTags.map(function(a){
			 if(typeof(a) === "number"){
				 return a.toString()
			 } else {
				 return a;
			 }
	         
	     }),
	     select: function(event, ui) {
	    	 filterVAL=ui.item.value;   	    
	    	 }
	
	  });


});//END OF input busqueda

$("#btn_buscar").on("click",function(){
	
	
// despejar mapa
limpiarMarkers();


//Funcion particular de la layer: filtrar de acuerdo con el parametro de busqueda
	var filterPanelesRESBUSQUEDA = function(feature, latlng) {
		var fpCompanyName = feature.properties.panelId.compania;
		var fpPanelId_ = feature.properties.panelId.id;	
		var fpPanelId = fpPanelId_.toString();
		
		if ((fpCompanyName === filterVAL) || (fpPanelId === filterVAL)) {	
			return true;	  
		};
	}

//declarar lyer, cargar datos y mostrar
	var topoLayerRESBUSQUEDA = new L.TopoJSON(null, { pointToLayer: pointToLayerPanelesGENERAL,
		filter: filterPanelesRESBUSQUEDA, onEachFeature: onEachFeaturePanelesGENERAL});		
	$.getJSON(topoData).done(addTopoData);
	
	function addTopoData(topoData){ 	
			topoLayerRESBUSQUEDA.addData(topoData);
			topoLayerRESBUSQUEDA.addTo(mymap);
			markersCG_RESBUSQUEDA.addLayer(topoLayerRESBUSQUEDA);
			mymap.addLayer(markersCG_RESBUSQUEDA);
	};

}); // end of btn_buscar


//BOTON INFORMACION
$("#boton_ayuda").on("click",function(){
	$('#myModal').modal('show')
});
    
});//END OF JQUERY FUNCTION























