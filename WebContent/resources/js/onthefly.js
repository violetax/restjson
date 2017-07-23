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
	
	var topoLayerCompanias = new L.TopoJSON(null,{
	    'style': function (feature) {
	    	console.log(feature.properties)
	    	//console.log(feature.properties.panelId.compania);
	    },
	    pointToLayer: function (feature, latlng) {
	    	switch (feature.properties.panelId.compania) {	
			 case companias[0]:  marker = L.marker(latlng,{icon: icon_co_20}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[1]:  marker = L.marker(latlng,{icon: icon_co_1}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[2]:  marker = L.marker(latlng,{icon: icon_co_2}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[3]:  marker = L.marker(latlng,{icon: icon_co_3}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[4]:  marker = L.marker(latlng,{icon: icon_co_4}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[5]:  marker = L.marker(latlng,{icon: icon_co_5}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[6]:  marker = L.marker(latlng,{icon: icon_co_6}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[7]:  marker = L.marker(latlng,{icon: icon_co_7}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[8]:  marker = L.marker(latlng,{icon: icon_co_8}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[9]:  marker = L.marker(latlng,{icon: icon_co_9}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[10]:  marker = L.marker(latlng,{icon: icon_co_10}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[11]:  marker = L.marker(latlng,{icon: icon_co_11}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[12]:  marker = L.marker(latlng,{icon: icon_co_12}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[13]:  marker = L.marker(latlng,{icon: icon_co_13}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[14]:  marker = L.marker(latlng,{icon: icon_co_14}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[15]:  marker = L.marker(latlng,{icon: icon_co_15}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[16]:  marker = L.marker(latlng,{icon: icon_co_16}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[17]:  marker = L.marker(latlng,{icon: icon_co_17}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[18]:  marker = L.marker(latlng,{icon: icon_co_18}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 case companias[19]:  marker = L.marker(latlng,{icon: icon_co_19}).bindTooltip(feature.properties.panelId.compania + " " + feature.properties.panelId.id).addTo(mymap); markerArr.push(marker); return;
			 } }});
	
	var topoLayerEnergia = new L.TopoJSON(null,{
	    'style': function (feature) {
	    	console.log(feature.properties)
	    	//console.log(feature.properties.panelId.compania);
	    },
	    pointToLayer: function (feature, latlng) {
	    		var energia = feature.properties.energia;
	    		if (energia < rangoEnergia1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoEnergia2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoEnergia3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoEnergia4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoEnergia5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoEnergia6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.energia + "W").addTo(mymap); markerArr.push(marker); return;
	    		}}});
	
	var topoLayerTemperatura = new L.TopoJSON(null,{
	    'style': function (feature) {
	    	console.log(feature.properties)
	    	//console.log(feature.properties.panelId.compania);
	    },
	    pointToLayer: function (feature, latlng) {
	    		var temperatura = feature.properties.temperatura;
	    		if (temperatura < rangoTemperatura1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArr.push(marker); return;
	    		} else if (temperatura < rangoTemperatura2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArr.push(marker); return;
	    		} else if (temperatura < rangoTemperatura3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArr.push(marker); return;
	    		} else if (temperatura < rangoTemperatura4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArr.push(marker); return;
	    		} else if (temperatura < rangoTemperatura5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArr.push(marker); return;
	    		} else if (temperatura < rangoTemperatura6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.temperatura + "C").addTo(mymap); markerArr.push(marker); return;
	    		}}});
	
	var topoLayerViento = new L.TopoJSON(null,{
	    'style': function (feature) {
	    	console.log(feature.properties)
	    	//console.log(feature.properties.panelId.compania);
	    },
	    pointToLayer: function (feature, latlng) {
	    		var velocidadviento = feature.properties.velocidadviento;
	    		if (velocidadviento < rangoViento1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArr.push(marker); return;
	    		} else if (velocidadviento < rangoViento2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArr.push(marker); return;
	    		} else if (velocidadviento < rangoViento3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArr.push(marker); return;
	    		} else if (velocidadviento < rangoViento4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArr.push(marker); return;
	    		} else if (velocidadviento < rangoViento5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArr.push(marker); return;
	    		} else if (velocidadviento < rangoViento6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.velocidadviento + "Km/h").addTo(mymap); markerArr.push(marker); return;
	    		}}});

//////////////////////////////////////////////////////////////////
//if not exists at start: $(document).on('change', 'input[type="checkbox"]',function(e,t){
	/// SHOW SOME COMPANIES ONLY

	
	var checkboxArr = [];
	for (var x in companias.length ) {
		var checkbox = "node-0-0-0" + companias.indexOf(companias[x]);
		checkboxArr.push(checkbox);	
	}
	var checkboxItem =  $('#' + checkboxArr[0]);
	
	$('.ctrlCB').change( function(){        
	      if ( ! this.checked) {
	    	  console.log("NOT");
	    	  $this = $(this);
	    	   $label = $('label[for="'+ checkboxItem.attr('id') +'"]');
	    	   console.log(checkboxItem.attr('id'));
	    	   if ($label.length > 0 ) {
	    		   console.log("i'm here");
	    		   $label.html("Eureka!!!");
	    	   } else {
	    		   console.log("not here");
	    	   }
	     } else {
	    	 console.log("CHECKED");
	           	console.log(this);
         }
	  });

	
/////////////////////////////////////////////////////////////////////////			


	/////////########## AUTO AJAX ##########////////////////////////////////////

	var topoData;
	var interval=0;		
	//for (var i=1; i<97; i++) {setInterval(ajaxCall, 3500); if (i=96) {console.log("Day done!")}}
		
	function ajaxCall(){
		$.getJSON(topoData).done(addTopoData);
		interval++;
		topoData = "resources/topojson/periodo." + interval + ".periodoFEATCOL.topo.json";
		console.log(topoData);
	};	
	
	//EN ADDTOPODATA SELECTIONO LA LAYER
	function addTopoData(topoData){  
		var topoLayer = "";
		 var visibleLayer = $("input[name='visiblelayer']:checked").val();
		 console.log(visibleLayer);
         switch (visibleLayer){
         case "energia": topoLayer = topoLayerEnergia;  break;
         case "temperatura": topoLayer = topoLayerTemperatura; break;
         case "viento": topoLayer = topoLayerViento; break;
         case "companias": topoLayer = topoLayerCompanias; break;
         } 
    	 topoLayer.addData(topoData);
		 topoLayer.addTo(mymap);
		};
	
	$("#btn_topos").on("click", function() {
		
		interval++;
		topoData = "resources/topojson/periodo." + interval + ".periodoFEATCOL.topo.json";
		console.log(topoData);		
		
		$("#coelectricas").html(treelis);
		
		$.getJSON(topoData).done(addTopoData);
		$.getJSON(topoData, function( data ) {
			
			$.each( data.objects, function(  ) {	
			 console.log(data.objects);		 
			  });
			});
		
	})

	
//END OF JQUERY FUNCTION
});