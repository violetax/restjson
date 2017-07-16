//ver
//https://github.com/Automattic/mongoose/blob/master/test/model.querying.test.js#L1931
$.noConflict();

jQuery( function( $ ) {


    var myIcon = L.icon({
        iconUrl: "img/solarpanel.png",
        iconSize: [20, 48]
    });
    //DIBUJAR MAPA//////////////////////////
    var mymap = L.map('mapid').setView([42.994603451901334, -2.4238586425781254], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);



////////////// *********** COPIAR A LO BESTIA PORQUE NO ME CARGA EL JS ********
    // leaflet-providers
//****************************PROVIDERS**** COPIED A LO BESTIA **/////////

/////////////	CUT	/////////////////////////////////





//DIBUJAR UN PUNTO///////////////////////////////////////////
    var latx, lngx;
    var nuevoPunto = "";
    var jsonCoords = "";
    var clickCircle;
    var clickCircle2;

//Recoger las coordenadas de un punto/////////////////////////////////////
//Crear variable string con forma de json con las coordenadas de un punto
    function getCoordinates(ev) {
        latx = ev.latlng.lat.toString();
        lngx = ev.latlng.lng.toString();


        nuevoPunto = "{\"latitud\": " + latx + ", \"longitud\": " + lngx + "}";  //JSON.stringify({ "Latitud": lat , "Longitud": lng });
        jsonCoords =  JSON.stringify({ "Latitud": latx , "Longitud": lngx });
        //{"_id":"596deeef41490fb015f72ed4","id":3,"latitud":41.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7"};
        //
        //

        if (clickCircle != undefined) {
            mymap.removeLayer(clickCircle);
        };
        clickCircle = L.circle([latx, lngx], 500, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap);
    }
    mymap.on('click', getCoordinates);
//MOSTRAR LAS COORDENADAS DEL PUNTO EN PANTALLA///////////////
    $("#boton_jcoord").on("click",function(e){
        $('#ocultar').show();
        $('#ocultar').html(nuevoPunto);
        //$('#ocultar').append(nuevoPunto);
    });

//LIMPIAR TODOS LOS MARKERS//////////////////////

/////*****!!!!!!!!PENDIENTE QUE SOLO LIMPIE LOS PUNTOS *********!!!!!!!!!!!!!!
    var marker;
    var markerArr = [];
    $("#boton_limpiar").on("click",function(e){

        for (var i=0; i < markerArr.length; i++) {
            mymap.removeLayer(markerArr[i]);
        };

    });

//Recoger las coordenadas de varios puntos//////////////////
//Crear variable string con forma de json con las coordenadas de varios puntos

    var arr = [];

    function getCoordinatesBunch(ev) {
        latx = ev.latlng.lat.toString();
        lngx = ev.latlng.lng.toString();
        jsonCoords =  JSON.stringify({ "Latitud": latx , "Longitud": lngx });

        clickCircle2 = L.circle([latx, lngx], 500, {
            color: 'green',
            fillColor: '#f01',
            fillOpacity: 0.5
        }).addTo(mymap);
    }

    mymap.on('contextmenu', function(ev){
        latx = ev.latlng.lat.toString();
        lngx = ev.latlng.lng.toString();
        jsonCoords =  JSON.stringify({ "Latitud": latx , "Longitud": lngx });

        clickCircle2 = L.circle([latx, lngx], 500, {
            color: 'green',
            fillColor: '#f01',
            fillOpacity: 0.5
        }).addTo(mymap);

        arr.push(jsonCoords);

    });
/////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////	
///*** QUERY STRAIGHT LEAFLET ****/////////////////////////////
///////////////////////////////////////////////////////////////

//NOT GO//////////////////////////////////////////////////////
    /*

     //https://github.com/sigdeletras/Leaflet.Spain.WMS
     //El mapa en rayitas
     //Spain_PNOA_Mosaico.addTo(mymap);


     //MAS PENDIENTE:
     //http://savaslabs.com/2015/05/18/mapping-geojson.html
     /*
     function addDataToMap(data, map) {
     console.log("ADD DATA!");
     var dataLayer = L.geoJson(data);
     dataLayer.addTo(map);
     }


     var urlExample = //"http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
     "http://opendata.euskadi.eus/contenidos/ds_recursos_turisticos/empresas_alquiler_deportivo/opendata/empresas.geojson"
     $.ajax({
     type: "POST",
     url: urlExample,
     dataType:   "text", // <== con jsnp: ReferenceError: jsonCallback is not defined JSON-P request
     // con json o application/json ajax.error
     jsonCallback: 'jsonCallback',
     success:    function(data){
     console.log("HERE!");
     //console.log(data);
     addDataToMap(data, mymap);
     },
     error:	 function(ts) { console.log("ERROR!");
     // console.log(ts.responseText)
     }
     });

     $.getJSON( urlExample, function(data) {

     addDataToMap(data, mymap);
     });

     */


    $("#boton_query1").click(function(){

        //PLUG&PLAY
        // https://github.com/leaflet-extras/leaflet-providers/blob/master/index.html

        var OpenTopoMap = L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

        var defaultLayer = L.tileLayer.provider('OpenTopoMap').addTo(mymap);
        var Layers = {
            //'Stamen Terrain': L.tileLayer.provider('Stamen.Terrain'),
            'OpenStreetMap Default': defaultLayer};
        var overlayLayers = {
            //'OpenWeatherMap Precipitation': L.tileLayer.provider('OpenWeatherMap.Precipitation'),
            'OpenSeaMap': L.tileLayer.provider('OpenSeaMap')};

        L.control.layers(Layers, overlayLayers, {collapsed: false}).addTo(mymap);

    });

    $("#boton_query2").click(function(){


        var exteriorStyle = {
            "color": "#ffffff",
            "weight": 0,
            "opacity": 0.99
        };
        var polstyle = {
            fillColor: "#0099ff",
            color: "#005f9d",
            opacity: 1,
            fillOpacity: 0.8
        };

        url='http://localhost:3000/api/maplayers';

        $.getJSON(url, function(result) {


            console.log(result);
            getxoLayer = result.features[0];

            //	console.log(getxoLayer);
            //	console.log(getxoLayer.properties);
            //	console.log(getxoLayer.geometry);

            var alldata = {
                name: getxoLayer.properties.name,
                style: getxoLayer.properties.style,
                geo: getxoLayer.geometry
            };

            var polygon =  GeoJSON.parse(alldata, {GeoJSON: 'geo'});
            console.log(polygon);

            //console.log(getxoLayer.geometry.coordinates);
            var polygon2 = getxoLayer.geometry.coordinates;

            //var getxoPol = L.polygon(polygon2).addTo(mymap);

            //var getxoPol = L.geoJson(polygon,{style: polstyle}).addTo(mymap);

            addLayer(result);
            // leaf_layer.addTo(mymap);
        });

    });

    function addLayer(layer) {
        var leaf_layer;
        console.log(layer.type);
        if (layer.type == "MultiPoint") {
            leaf_layer = L.geoJson(layer, { pointToLayer: function (feature, latlng) {return L.circleMarker(latlng, layer.style); }})
            leaf_layer.bindPopup(layer.type);
        } else if (layer.type == "MultiLineString") {
            leaf_layer = L.geoJson(layer, {style: layer.style });
            leaf_layer.bindPopup(layer.type);
        } else  {
            console.log(layer.features.length);
            for (var i=0; i< layer.features.length; i++) {
                feature = layer.features[0];
                console.log(feature.properties.style);
            }
            leaf_layer = L.geoJson(layer, {
                style: function(feature) {
                    switch (feature.properties.style) {
                        case 'Orange': return {
                            fillColor: "#e9bc3b",
                            color: "#ac8613",
                            opacity: 1,
                            fillOpacity: 0.8
                        };
                        case 'Blue': return {
                            fillColor: "#0099ff",
                            color: "#005f9d",
                            opacity: 1,
                            fillOpacity: 0.8
                        };
                    }
                }
            }).addTo(mymap);
        }

        /*
         $('#' + name).click(function(e) {

         if (mymap.hasLayer(leaf_layer)) {
         mymap.removeLayer(leaf_layer);
         } else {
         mymap.addLayer(leaf_layer);
         }
         });*/
    }



////////////////////////////////////////////////////
///////////PLUG&PLAY//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////	
///*** MOSTRAR TODOS GEOJPUNTOS ****///////////////////////////
///////////////////////////////////////////////////////////////

    $("#boton_cargarTodosGeoJPoint").on("click",function(e){

        console.log("clicked");

        //REST PATH
        url='http://localhost:3000/api/paneles';
        var xlat,xlng;

        $.ajax({
            url: url,
            success: AjaxSucceeded,
            error: AjaxFailed
        });


        var panel;
        var properties = [];
        properties = [{id:"20", CP: "ABCD", capacidad: "300", lat: latx, lng: lngx}];
        panel = GeoJSON.parse(properties[0], {Point: ['lat', 'lng']});
        //console.log(panel);

        function AjaxSucceeded(result) {
            //console.log(result[0].geometry.coordinates[0]);

            for (var x = 0; x < result.length; x++) {
                lng = result[x].geometry.coordinates[0];
                lat = result[x].geometry.coordinates[1];
                //console.log(xlat,xlng);
                marker = new L.marker([lat, lng],{icon: myIcon}).addTo(mymap);
                markerArr.push(marker);

            }

        }
        function AjaxFailed(result) {
            console.log(result);
        }

    });

///////////////////////////////////////////////////////////////	
///*** CREAR UN GEOJPUNTO ****/////////////////////////////////
////////************PENDIENTE DESRIZAR EL POSTDATA ****////////////////
///////////////////////////////////////////////////////////////

    $("#boton_crearGeoJPoint").on("click",function(e){

        $('#ocultar').show();
        $('#ocultar').html(jsonCoords);
        var panel;
        var properties = [];
        properties = [{id:"XXXXX", CP: "XXXXX", capacidad: "XXXXX", lat: latx, lng: lngx}];
        panel = GeoJSON.parse(properties[0], {Point: ['lat', 'lng']});
        console.log(panel);

        //console.log(panel);

        //REST PATH
        url='http://localhost:3000/api/paneles';

        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: panel,
            cache: false,
            success: AjaxSucceeded,
            error: AjaxFailed
        });
        function AjaxSucceeded(result) {
            console.log(result);
        }
        function AjaxFailed(result) {
            console.log("AjaxFailed" + result);
        }
    });


    var geojsonFeature;
    //var geoArrCoors = [];

    function createGeoJPunto(lng,lat) {
        geojsonFeature = {
            "properties":
                {
                    "id":"",
                    "CP":"",
                    "capacidad":""
                },
            "geometry":
                {
                    "coordinates":
                        {
                            "latitud": lat,
                            "longitud":	lng
                        }
                }
        }

        //panel = JSON.stringify(geojsonFeature);
        return geojsonFeature;
    }

});
//1º if return geojsonFeature talcual:
//geojsonFeature = Object {type: "Feature", properties: Object, geometry: Object}

//2º if return panel = JSON.stringify(geojsonFeature):
//panel = JSON.stringify(geojsonFeature);


//geoJArr.push(geojsonFeature);




////////////////////////////////////////////////////////////////////


