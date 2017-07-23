var initlat, initlng, initzoom, mymap;

var icon_co_1 = L.icon({
	iconUrl: 'resources/images/companias/c1.png',
	iconSize: [10, 24],
	});
var icon_co_2 = L.icon({
	iconUrl: 'resources/images/companias/c2.png',
	iconSize: [10, 24],
	});
var icon_co_3 = L.icon({
	iconUrl: 'resources/images/companias/c3.png',
	iconSize: [10, 24],
	});
var icon_co_4 = L.icon({
	iconUrl: 'resources/images/companias/c4.png',
	iconSize: [10, 24],
	});
var icon_co_5 = L.icon({
	iconUrl: 'resources/images/companias/c5.png',
	iconSize: [10, 24],
	});
var icon_co_6 = L.icon({
	iconUrl: 'resources/images/companias/c6.png',
	iconSize: [10, 24],
	});
var icon_co_7 = L.icon({
	iconUrl: 'resources/images/companias/c7.png',
	iconSize: [10, 24],
	});
var icon_co_8 = L.icon({
	iconUrl: 'resources/images/companias/c8.png',
	iconSize: [10, 24],
	});
var icon_co_9 = L.icon({
	iconUrl: 'resources/images/companias/c9.png',
	iconSize: [10, 24],
	});
var icon_co_10 = L.icon({
	iconUrl: 'resources/images/companias/c10.png',
	iconSize: [10, 24],
	});
var icon_co_11 = L.icon({
	iconUrl: 'resources/images/companias/c11.png',
	iconSize: [10, 24],
	});
var icon_co_12 = L.icon({
	iconUrl: 'resources/images/companias/c12.png',
	iconSize: [10, 24],
	});
var icon_co_13 = L.icon({
	iconUrl: 'resources/images/companias/c13.png',
	iconSize: [10, 24],
	});
var icon_co_14 = L.icon({
	iconUrl: 'resources/images/companias/c14.png',
	iconSize: [10, 24],
	});
var icon_co_15 = L.icon({
	iconUrl: 'resources/images/companias/c15.png',
	iconSize: [10, 24],
	});
var icon_co_16 = L.icon({
	iconUrl: 'resources/images/companias/c16.png',
	iconSize: [10, 24],
	});
var icon_co_17 = L.icon({
	iconUrl: 'resources/images/companias/c17.png',
	iconSize: [10, 24],
	});
var icon_co_18 = L.icon({
	iconUrl: 'resources/images/companias/c18.png',
	iconSize: [10, 24],
	});
var icon_co_19 = L.icon({
	iconUrl: 'resources/images/companias/c19.png',
	iconSize: [10, 24],
	});
var icon_co_20 = L.icon({
	iconUrl: 'resources/images/companias/c20.png',
	iconSize: [10, 24],
	});

var icon_PanSolar_NEGRO = L.icon({
	    iconUrl: 'resources/images/solarpanel.png',
	    iconSize: [10, 24],
	    });
var icon_PanSolar_SOL = L.icon({
	    iconUrl: 'resources/images/solar2.png',
	    iconSize: [5, 12],
	    });
var icon_PanSolar_BLUE = L.icon({
	    iconUrl: 'resources/images/solarpanelBlue.png',
	    iconSize: [5, 12],
	    });
var topo_mini_sp = L.icon({
    iconUrl: 'resources/images/spcolor.png',
    iconSize: [5, 12],
    });

var latx, lngx;					//las coordenadas del ultimo punto seleccionado por el cursor
var nuevoPunto = "";			//string tipeada manualmente con latx, lngx 
var jsonCoords = "";			//igual que nuevoPunto, pero con JSON.stringify
var clickCircle;				//marcador L.circle - rojo
var clickCircle2;				//marcador L.circle - verde
var marker;						//new L.marker pushed to markerArr, marker2Arr
var markerArr = [];				//todos los marker-paneles de la bdd
var marker2Arr = [];			//grupo de marker-paneles de la bdd
var layerArr = [];				//layers pushed en funcion addLayer
var jcoorsArr = [];				//array con latx, lngx 
var carreterasLayer;			//L.tileLayer.provider('OpenTopoMap'
var baseLayers = {};			//para anadir a L.control.layers
var overlayLayers = {};			//para anadir a L.control.layers
var lcontrol_query1;			//L.control.layers
var lcontrol_general;			//L.control.layers
var paneles = [];				//todos los paneles as geojson cuando se cargan
var panelesLayer;				// to layer
var allMarkersLayer = L.layerGroup();

var blueIcon = new L.Icon({
	iconUrl: 'resources/images/colores/marker-icon-2x-blue.png',
	iconSize: [10, 24],
});

var redIcon = new L.Icon({
	iconUrl: 'resources/images/colores/marker-icon-2x-red.png',
	iconSize: [10, 24],
});

var greenIcon = new L.Icon({
	iconUrl: 'resources/images/colores/marker-icon-2x-green.png',
	iconSize: [10, 24],
});

var orangeIcon = new L.Icon({
	iconUrl: 'resources/images/colores/marker-icon-2x-orange.png',
	iconSize: [10, 24],
});

var yellowIcon = new L.Icon({
	iconUrl: 'resources/images/colores/marker-icon-2x-yellow.png',
	iconSize: [10, 24],
});

var violetIcon = new L.Icon({
	iconUrl: 'resources/images/colores/marker-icon-2x-violet.png',
	iconSize: [10, 24],
});

var greyIcon = new L.Icon({
	iconUrl: 'resources/images/colores/marker-icon-2x-grey.png',
	iconSize: [10, 24],
});

var blackIcon = new L.Icon({
	iconUrl: 'resources/images/colores/marker-icon-2x-black.png',
	iconSize: [10, 24],
});
