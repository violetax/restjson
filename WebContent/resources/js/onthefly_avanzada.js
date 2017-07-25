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


	//////////////### TOPO JSON ##### ///////////////////////////
	
	//VARIABLE FEATURE COLLECTIONS
	//7: energia, humedad, inclinacion, insolacion, orientacion,temperatura, viento
	//1: company
	
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

	var byCompany = function (feature, layer) {
		var companyName = feature.properties.panelId.compania;
		console.log(companyName);
		return companyName;
		   
	};	
	
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

		
	///////////
		
		var topoLayerEnergia = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerEnergia,
		    filter: byCompany });
		
		var topoLayerTemperatura = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerTemperatura,
		    filter: byCompany });
		
		var topoLayerViento = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerviento,
		    filter: byCompany });
		
//////////////////////////////////////////////////////////////////
//if not exists at start: $(document).on('change', 'input[type="checkbox"]',function(e,t){
	/// SHOW SOME COMPANIES ONLY

	
	var squareCheckBox_Arr_of_ids = [];
	var flechaCheckBox_Arr_of_ids = [];
	//flechaCheckBox_ID == label[for=id] == company name
	//squareCheckBox es lo que el user controla
	//flechaCheckBox contiene lo que el user quiere
	for (var x = 0; x<companias.length; x++ ) {
		
		flechaCheckBox = "node-0-0-0-" + x;
		squareCheckBox =  "inputid" + x;
		
		flechaCheckBox_Arr_of_ids.push(flechaCheckBox);
		squareCheckBox_Arr_of_ids.push(squareCheckBox);	
		
	}
	
	
	for (var x = 0; x< squareCheckBox_Arr_of_ids.length; x++ ) {	
		getCompanyName(x);		
	}
	
	
	function getCompanyName(x) {
		var isChecked = false;
		
		squareCheckBoxItem =  $('#' + squareCheckBox_Arr_of_ids[x]);
		flechaCheckBoxItemID =  flechaCheckBox_Arr_of_ids[x]; 		
		squareCheckBoxItem.click(function() {	
			//input = $('input[id="inputid' + x + '"]' ) ;
			$label = $('label[for="' + flechaCheckBox_Arr_of_ids[x] + '"]');  
		if(isChecked === false) {
			console.log($label.text());
		 	isChecked = true;
		} else {
			isChecked = false;
		}	 	   
			});
		
	}


	
/////////////////////////////////////////////////////////////////////////			
/////////########## AUTO AJAX ##########////////////////////////////////////

	var topoData;
	var interval=0;		
	
	//var intervalFunc = setInterval(ajaxCall, 3500); 
	function ajaxCall(){
		interval++;
		topoData = "resources/topojson/periodo." + interval + ".periodoFEATCOL.topo.json";
		$.getJSON(topoData).done(addTopoData);
		if (interval>= 10) {
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
         
         for (var i=0; i < arr.length; i++) {
 			//mymap.removeLayer(arr[i]);
 		}
    	 topoLayer.addData(topoData);
		 topoLayer.addTo(mymap);	
		 console.log(topoData);
		 
		};
	

		var pointToLayerviento = function (feature, latlng) {
			var velocidadviento = feature.properties.velocidadviento;
			if (velocidadviento < rangoViento1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); 
			} else if (velocidadviento < rangoViento2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); 
			} else if (velocidadviento < rangoViento3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); 
			} else if (velocidadviento < rangoViento4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker);
			} else if (velocidadviento < rangoViento5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); 
			} else if (velocidadviento < rangoViento6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker);
			}
			console.log(feature);	
		};
	
	$("#btn_topos").on("click", function() {		
		// GEOJSON FILTER
		//https://stackoverflow.com/questions/16148598/leaflet-update-geojson-filter
		//array to store layers for each feature type
		var mapLayerGroups = [];			
		//draw **TOPOJSON not GEOJSON - don't add the GEOJSON layer to the map here
		//var topoLayerFiltered = 
		geoData = "resources/geojson/periodo.1.periodoFEATCOL.geojson";
		$.getJSON(geoData, function(data) {
			 L.geoJson(data, {
			onEachFeature: onEachFeature2,
			pointToLayer: pointToLayerviento			
			});
		});	
		/*
		 *for all features:
		 *for each feature type create a layerGroup  
		 *and add each feature to the respective layerGroup
		*/
		function onEachFeature2(feature, layer) {
			//console.log(feature.properties.panelId.compania);
			console.log(layer);
		}
		
		function onEachFeature(feature, featureLayer) {
			// esta funcion hace 19 lg - uno por compania_id (de las 20 en este dataset solo hay 19 -- comprobado :)!
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
		
		
		
	})//END OF TOPOS

});//END OF JQUERY FUNCTION