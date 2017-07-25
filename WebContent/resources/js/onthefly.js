$.noConflict();

jQuery( function( $ ) {
	
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
//////////////### DEFINIR LAYERS TOPO JSON ##### /////////////////
	
	//VARIABLE FEATURE COLLECTIONS
	//7: energia, humedad, inclinacion, insolacion, orientacion,temperatura, viento
	//1: company
	
	var markerArrays = ["markerArrEN", "markerArrTE", "markerArrVI"]
	var markerArrEN = [];
	var markerArrTE = [];
	var markerArrVI = [];
	
	var companias = ["ACCE","AUPN","EEPN","ENDS","EONE","EOPN","FLPN","GDFS","GEPN","GNFE","HCEN","HLPN","IBDR","IMPN","NTRG","NXPN","PEPN","SHEL","SYPN","VMPN"];
//RANGO ENERGIA
	var rangoEnergia1 = 1;
	var rangoEnergia2 = 2;
	var rangoEnergia3 = 3;
	var rangoEnergia4 = 4;
	var rangoEnergia5 = 5;
	var rangoEnergia6 = 6;
//RANGO TEMPERATURA
	var rangoTemperatura1 = 5;
	var rangoTemperatura2 = 10;
	var rangoTemperatura3 = 20;
	var rangoTemperatura4 = 30;
	var rangoTemperatura5 = 40;
	var rangoTemperatura6 = 50;
//RANGO VIENTO
	var rangoViento1 = 2.5;
	var rangoViento2 = 5;
	var rangoViento3 = 10;
	var rangoViento4 = 20;
	var rangoViento5 = 50;
	var rangoViento6 = 80;

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
	
	//////////////////// COMPANIAS ////////////////////////
	
	///////////
		
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
//////////////////////////////////////////////////////////////////


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
//////////////////////////////////////////////////////////////////
	
///////////////////////////////////////////////////////////////////	
/////////########## MOSTRAR CAPAS COMPANIAS ##########///////////	


	//https://stackoverflow.com/questions/7378228/check-if-an-element-is-present-in-an-array
	//function isInArray(variable, array){ var count=array.length;for(var i=0;i<count;i++)
	//    {if(array[i]===variable){return true;}}return false;}
	
	function isInArray(value, array) {
		  return array.indexOf(value) > -1;
		}
	
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
		
	var topoLayerCompaniaEnergia = new L.TopoJSON(null,{
	    pointToLayer: pointToLayerCompania});
	
	
	
	$("#btn_topos_companias").on("click", function() {	
	
			for (var i=0; i < markerArrEN.length; i++) {
	 			mymap.removeLayer(markerArrEN[i]);
	 		}	
			for (var i=0; i < markerArrTE.length; i++) {
	 			mymap.removeLayer(markerArrTE[i]);
	 		}	
			for (var i=0; i < markerArrVI.length; i++) {
	 			mymap.removeLayer(markerArrVI[i]);
	 		}	

		var topoData;
		var interval=0;		
		
		var intervalFunc = setInterval(ajaxCall, 500); 
		function ajaxCall(){
			interval++;
			topoData = "resources/topojson/periodo." + interval + ".periodoFEATCOL.topo.json";
			$.getJSON(topoData).done(addTopoData);
			if (interval>= 1) {
				clearInterval(intervalFunc);
			}
		};	
		

		function addTopoData(topoData){ 
			
			 var topoLayer = "";
			 topoLayer = topoLayerCompaniaEnergia; 
			// console.log(topoLayer);
			 
			 arr = markerArrEN; 
	         for (var i=0; i < arr.length; i++) {
	 			mymap.removeLayer(arr[i]);
	 		}
	         
	    	 topoLayer.addData(topoData);
			 topoLayer.addTo(mymap);	
		//	 console.log(topoData);
			 
			};			
		
		
		
		
	}); //END OF btn_topos_companias
	
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////	
	
///////////////////////////////////////////////////////////////////	
/////////########## MOSTRAR CAPAS 3 PARAMETROS ##########///////////

	$("#btn_topos_3paras").on("click", function() {		

		var topoData;
		var interval=0;		
		
		var intervalFunc = setInterval(ajaxCall, 500); 
		function ajaxCall(){
			interval++;
			topoData = "resources/topojson/periodo." + interval + ".periodoFEATCOL.topo.json";
			$.getJSON(topoData).done(addTopoData);
			if (interval>= 1) {
				clearInterval(intervalFunc);
			}
		};	
		
		function addTopoData(topoData){ 
			
			 var topoLayer = "";
			 var visibleLayer = $("input[name='visiblelayer']:checked").val();
	         switch (visibleLayer){
	         case "energia": topoLayer = topoLayerEnergia;  arr = markerArrEN; break;
	         case "temperatura": topoLayer = topoLayerTemperatura; arr = markerArrTE; break;
	         case "viento": topoLayer = topoLayerViento; arr = markerArrVI; break;
	         } 
	         
	    	// console.log(topoLayer);
	         for (var i=0; i < arr.length; i++) {
	 			mymap.removeLayer(arr[i]);
	 		}
	    	 topoLayer.addData(topoData);
			 topoLayer.addTo(mymap);	
			// console.log(topoData);
			 
			};	
		
	});//END OF btn_topos_3paras

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
//////###### BUSCADOR ##################///////////////////////
function buscarPanel() {


  
}; //END OF function for btn_BUSCADOR


$("#btn_BUSCADOR").on("click", function() {		
	buscarPanel();
});
	

            
	
});//END OF JQUERY FUNCTION