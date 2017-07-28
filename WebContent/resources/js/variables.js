// VARIABLES COMUNES DE LOS JS 

// PARA DESPLEGAR MAPA
var initlat, initlng, initzoom, mymap;


// PARA LIMPIAR MARKERS
/// MARKER CLUSTERS ///
var markersCG_RESBUSQUEDA = new L.markerClusterGroup();
var markersCG_VERPANELES = new L.markerClusterGroup();


//PARA DESPLEGAR MARKERS

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
