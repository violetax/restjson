var topoLayerTemperatura = new L.TopoJSON(null,{
	    'style': function (feature) {
	    	console.log(feature.properties)
	    	//console.log(feature.properties.panelId.compania);
	    },
	    pointToLayer: function (feature, latlng) {
	    		var energia = feature.properties.temperatura;
	    		if (energia < rangoTemperatura1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.temperatura + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoTemperatura2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.temperatura + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoTemperatura3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.temperatura + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoTemperatura4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.temperatura + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoTemperatura5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.temperatura + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (energia < rangoTemperatura6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.temperatura + "W").addTo(mymap); markerArr.push(marker); return;
	    		}}});
