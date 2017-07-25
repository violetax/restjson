
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
	
	var byCompany = function (feature) {
		
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
	var pointToLayerviento = function (feature, latlng) {
		var velocidadviento = feature.properties.velocidadviento;
		if (velocidadviento < rangoViento1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		} else if (velocidadviento < rangoViento2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		} else if (velocidadviento < rangoViento3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		} else if (velocidadviento < rangoViento4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		} else if (velocidadviento < rangoViento5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		} else if (velocidadviento < rangoViento6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArrVI.push(marker); return;
		}};
		
		var topoLayerEnergia = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerEnergia
		    });
		
		var topoLayerTemperatura = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerTemperatura});
		
		var topoLayerViento = new L.TopoJSON(null,{
		    'style': function (feature) {},
		    pointToLayer: pointToLayerviento });
		
//////////////////////////////////////////////////////////////////
//if not exists at start: $(document).on('change', 'input[type="checkbox"]',function(e,t){
	/// SHOW SOME COMPANIES ONLY

	
	var checkboxArr = [];
	var flechaArr = [];
	for (var x = 0; x<companias.length; x++ ) {
		flecha = "node-0-0-0-" + x;
		checkbox =  "inputid" + x;
		checkboxArr.push(checkbox);	
		flechaArr.push(flecha);
	}
	
	
	for (var x = 0; x< checkboxArr.length; x++ ) {	
		getCompany(x);		
	}
	
	
	function getCompany(x) {			
		checkboxItem =  $('#' + checkboxArr[x]);
		flechita =  flechaArr[x]; //$('#' + flechaArr[x]);			
		checkboxItem.click(function() {	
	
	 	    $label = $('label[for="' + flechaArr[x] + '"]');
	 	    console.log($label.text());
			});
		
	}
	

	
/////////////////////////////////////////////////////////////////////////			


	/////////########## AUTO AJAX ##########////////////////////////////////////

	var topoData;
	var interval=0;		
	setInterval(ajaxCall, 3500)
	
	
	function ajaxCall(){
		interval++;
		topoData = "resources/topojson/periodo." + interval + ".periodoFEATCOL.topo.json";
		$.getJSON(topoData).done(addTopoData);	
		console.log(topoData);
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
 			mymap.removeLayer(arr[i]);
 		}
    	 topoLayer.addData(topoData);
		 topoLayer.addTo(mymap);
		 
		console.log(visibleLayer);
		console.log(topoData);
		console.log(topoLayer);
			
			
		 
		};
	

	
	$("#btn_topos").on("click", function() {
		
	});
		
		
	})//END OF TOPOS