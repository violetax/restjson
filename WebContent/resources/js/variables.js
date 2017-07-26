var initlat, initlng, initzoom, mymap;

var icon_PanSolar_NEGRO = L.icon({
	    iconUrl: 'resources/images/solarpanel.png',
	    iconSize: [20, 34],
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



/// MARKER CLUSTERS ///
var markersCG_busqueda = L.markerClusterGroup();
var markersCG_COMPANIAS = L.markerClusterGroup();
var markersCG_PRUEBAS = L.markerClusterGroup();
//VARIABLE FEATURE COLLECTIONS PARA LAS LAYERS /////////////////////////////////////////////////////////
//7: energia, humedad, inclinacion, insolacion, orientacion,temperatura, viento
//1: company


var markerArrays = ["markerArrEN", "markerArrTE", "markerArrVI"]
var markerArrEN = [];
var markerArrTE = [];
var markerArrVI = [];

var companias = ["ACCE","AUPN","EEPN","ENDS","EONE","EOPN","FLPN","GDFS","GEPN","GNFE","HCEN","HLPN","IBDR","IMPN","NTRG","NXPN","PEPN","SHEL","SYPN","VMPN"];
var companiasGrandes = ["ACCE","ENDS","EONE","GDFS","GNFE","HCEN","IBDR","NTRG","SHEL"];
var companiasPequenas = ["AUPN","EEPN","EOPN","FLPN","GEPN","HLPN","IMPN","NXPN","PEPN","SYPN","VMPN"];

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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
