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
	
	for (var x = 0; x<companias.length; x++ ) {		
		flechaCheckBox = "node-0-0-0-" + x;
		squareCheckBox =  "inputid" + x;		
		flechaCheckBox_Arr_of_ids.push(flechaCheckBox);
		squareCheckBox_Arr_of_ids.push(squareCheckBox);			
	}	
	for (var x = 0; x< squareCheckBox_Arr_of_ids.length; x++ ) {	
		getCompanyName(x);		
	}	
	
	function printArr(arr) {for (var i=0; i<arr.length; i++) {console.log(arr[i]);}}
	
	//STRIP OF WHITESPACES:
	//https://stackoverflow.com/questions/360491/how-do-i-strip-white-space-when-grabbing-text-with-jquery
	
	function getCompanyName(x) {
		
		var isChecked = false;
		var squareCheckBoxItem =  $('#' + squareCheckBox_Arr_of_ids[x]);
		var flechaCheckBoxItemID =  flechaCheckBox_Arr_of_ids[x]; 		
		
		squareCheckBoxItem.click(function() {	
		$label = $('label[for="' + flechaCheckBox_Arr_of_ids[x] + '"]');  
		var checkedCo = $.trim($label.text());
		
		if(isChecked === false) {			
			checkedCompaniesArr.push(checkedCo);
		 	isChecked = true;
		 	//printArr(checkedCompaniesArr);
		} else {
			//https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
			var indexCheckedCo = checkedCompaniesArr.indexOf(checkedCo);
			if (indexCheckedCo > -1) {			
				checkedCompaniesArr.splice(indexCheckedCo, 1);
				//printArr(checkedCompaniesArr);
			}
			isChecked = false;
		}	 	   
			});
		
	}
//////////////////////////////////////////////////////////////////
////////////////## FUNCIONES LAYERS ###///////////////////////////

	var pointToLayerCompania = function (feature, latlng) {
		var compania = feature.properties.panelId.compania;
		var energia = feature.properties.energia;
		if ( isInArray(compania, checkedCompaniesArr) ) {	
			if (energia < rangoEnergia1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(compania +": "+ energia + "W").addTo(mymap); markerArrEN.push(marker); return;
			} else if (energia < rangoEnergia2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(compania +": "+ energia + "W").addTo(mymap); markerArrEN.push(marker); return;
			} else if (energia < rangoEnergia3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(compania +": "+ energia + "W").addTo(mymap); markerArrEN.push(marker); return;
			} else if (energia < rangoEnergia4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(compania +": "+ energia + "W").addTo(mymap); markerArrEN.push(marker); return;
			} else if (energia < rangoEnergia5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(compania +": "+ energia + "W").addTo(mymap); markerArrEN.push(marker); return;
			} else if (energia < rangoEnergia6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(compania +": "+ energia + "W").addTo(mymap); markerArrEN.push(marker); return;
			}
		}
		};
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

		var topoLayerCompaniaEnergia = new L.TopoJSON(null,{
		    pointToLayer: pointToLayerCompania});
	

//////////////////////////////////////////////////////////////////
//////////////### BOTONES ##### //////////////////////////////////	
		
//////////////////////////////////////////////////////////////////
//////###### BUSCADOR ##################///////////////////////
	function buscarPanel() {
		
		limpiarMarkers();
		
		//  topoData = "resources/geojson/pruebas.1.topo.json";
			
				var $valId_ =  $('input[id="identificador"]').val();
				var $valId = parseInt($valId_);
				var $valCompany = $('#compania option:selected').text();   		
						
				var pointToLayerBUSQ = function (feature, latlng) {
					return L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker)				  
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
				limpiarMarkers();
				
				function addTopoData(topoData){ 				
						topoLayerBusqueda.addData(topoData);
						topoLayerBusqueda.addTo(mymap);						
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
		$.getJSON(topoData).done(addTopoData);
		
	function addTopoData(topoData){ 
		
		 var topoLayer = "";
		 topoLayer = topoLayerCompaniaEnergia;    
    	 topoLayer.addData(topoData);		 
		};			
	
	
	
	
}); //END OF btn_topos_companias

//////////////////////////////////////////////////////////////////
//////###### PRUEBAS ##################///////////////////////

$("#boton_pruebas").on("click",function(){
	

//array to store layers for each feature type
var mapLayerGroups = [];
/*
 *for all features:
 *for each feature type create a layerGroup  
 *and add each feature to the respective layerGroup
*/
function onEachFeature(feature, featureLayer) {
    //does layerGroup already exist? if not create it and add to map	
	var lg = mapLayerGroups[feature.properties.panelId.compania];
	
    if (lg === undefined) {
        lg = new L.layerGroup();
        //add the layer to the map
        lg.addTo(mymap);
        //store layer
        mapLayerGroups[feature.properties.panelId.compania] = lg;	      
        //add the feature to the layer
        lg.addLayer(featureLayer); 
        console.log(feature.properties.panelId.compania);		    
    }
	};
	
});//END OF PRUEBAS
            
	
});//END OF JQUERY FUNCTION