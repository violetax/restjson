var initlat, initlng, initzoom, mymap;

var icon_PanSolar_NEGRO = L.icon({
	    iconUrl: 'resources/images/solarpanel.png',
	    iconSize: [20, 48],
	    });
var icon_PanSolar_SOL = L.icon({
	    iconUrl: 'resources/images/solar2.png',
	    iconSize: [20, 48],
	    });
var icon_PanSolar_BLUE = L.icon({
	    iconUrl: 'resources/images/solarpanelBlue.png',
	    iconSize: [20, 48],
	    });
var topo_mini_sp = L.icon({
    iconUrl: 'resources/images/lemonSun.jpg',
    iconSize: [20, 48],
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

