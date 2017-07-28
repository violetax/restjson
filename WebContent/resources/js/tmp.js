var topoLayerTemperatura = new L.TopoJSON(null,{
	    'style': function (feature) {
	    	console.log(feature.properties)
	    	//console.log(feature.properties.panelId.compania);
	    },
	    pointToLayer: function (feature, latlng) {
	    		var parametroMedida1 = feature.properties.parametroMedida2;
	    		if (parametroMedida1 < rangoTemperatura1) { marker = L.marker(latlng,{icon: blueIcon}).bindTooltip(feature.properties.parametroMedida2 + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (parametroMedida1 < rangoTemperatura2) { marker = L.marker(latlng,{icon: greenIcon}).bindTooltip(feature.properties.parametroMedida2 + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (parametroMedida1 < rangoTemperatura3) { marker = L.marker(latlng,{icon: yellowIcon}).bindTooltip(feature.properties.parametroMedida2 + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (parametroMedida1 < rangoTemperatura4) { marker = L.marker(latlng,{icon: redIcon}).bindTooltip(feature.properties.parametroMedida2 + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (parametroMedida1 < rangoTemperatura5) { marker = L.marker(latlng,{icon: orangeIcon}).bindTooltip(feature.properties.parametroMedida2 + "W").addTo(mymap); markerArr.push(marker); return;
	    		} else if (parametroMedida1 < rangoTemperatura6) { marker = L.marker(latlng,{icon: violetIcon}).bindTooltip(feature.properties.parametroMedida2 + "W").addTo(mymap); markerArr.push(marker); return;
	    		}}});
