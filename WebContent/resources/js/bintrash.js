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
	

	
	//console.log(checkboxArr[0]);
	var checkboxArr = [];
	for (var x in companias.length ) {
		var checkbox = "node-0-0-0" + companias.indexOf(companias[x]);
		checkboxArr.push(checkbox);	
	}

			//var checkboxItem =  $('#' + checkboxArr[0]);
			var checkboxItem =  checkboxArr[0];

console.log(checkboxItem);

$(document).on('change', 'input[type="checkbox"]',function(e,t){
	if (document.getElementById(checkboxItem).checked) {
		console.log("CHECKED!!!");
	}  else {
		console.log("not checked!!!");
	}
});

$(checkboxItem).on('click',function(e,t){
				console.log("CLICKED!!!");
				if (this.checked) {
				     // $(e).find('input').attr('disabled', true);
					console.log("CHECKED!!!");
				    } else {
				    //  $(e).find('input').removeAttr('disabled');
				    	console.log("not checked!!!");
				    }
			});
			 var visibleLayer = $("input[name='visiblelayer']:checked").val();