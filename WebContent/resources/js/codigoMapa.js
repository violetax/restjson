//ver
//https://github.com/Automattic/mongoose/blob/master/test/model.querying.test.js#L1931
//$.noConflict();

jQuery( document ).ready(function( $ ) {
	
////////////// *********** COPIAR A LO BESTIA PORQUE NO ME CARGA EL JS ********
	// leaflet-providers
//****************************PROVIDERS**** COPIED A LO BESTIA **/////////
	(function (root, factory) {
		if (typeof define === 'function' && define.amd) {
			// AMD. Register as an anonymous module.
			define(['leaflet'], factory);
		} else if (typeof modules === 'object' && module.exports) {
			// define a Common JS module that relies on 'leaflet'
			module.exports = factory(require('leaflet'));
		} else {
			// Assume Leaflet is loaded into global object L already
			factory(L);
		}
	}(this, function (L) {
		'use strict';

		L.TileLayer.Provider = L.TileLayer.extend({
			initialize: function (arg, options) {
				var providers = L.TileLayer.Provider.providers;

				var parts = arg.split('.');

				var providerName = parts[0];
				var variantName = parts[1];

				if (!providers[providerName]) {
					throw 'No such provider (' + providerName + ')';
				}

				var provider = {
					url: providers[providerName].url,
					options: providers[providerName].options
				};

				// overwrite values in provider from variant.
				if (variantName && 'variants' in providers[providerName]) {
					if (!(variantName in providers[providerName].variants)) {
						throw 'No such variant of ' + providerName + ' (' + variantName + ')';
					}
					var variant = providers[providerName].variants[variantName];
					var variantOptions;
					if (typeof variant === 'string') {
						variantOptions = {
							variant: variant
						};
					} else {
						variantOptions = variant.options;
					}
					provider = {
						url: variant.url || provider.url,
						options: L.Util.extend({}, provider.options, variantOptions)
					};
				}

				var forceHTTP = window.location.protocol === 'file:' || provider.options.forceHTTP;
				if (provider.url.indexOf('//') === 0 && forceHTTP) {
					provider.url = 'http:' + provider.url;
				}

				// If retina option is set
				if (provider.options.retina) {
					// Check retina screen
					if (options.detectRetina && L.Browser.retina) {
						// The retina option will be active now
						// But we need to prevent Leaflet retina mode
						options.detectRetina = false;
					} else {
						// No retina, remove option
						provider.options.retina = '';
					}
				}

				// replace attribution placeholders with their values from toplevel provider attribution,
				// recursively
				var attributionReplacer = function (attr) {
					if (attr.indexOf('{attribution.') === -1) {
						return attr;
					}
					return attr.replace(/\{attribution.(\w*)\}/,
						function (match, attributionName) {
							return attributionReplacer(providers[attributionName].options.attribution);
						}
					);
				};
				provider.options.attribution = attributionReplacer(provider.options.attribution);

				// Compute final options combining provider options with any user overrides
				var layerOpts = L.Util.extend({}, provider.options, options);
				L.TileLayer.prototype.initialize.call(this, provider.url, layerOpts);
			}
		});

		/**
		 * Definition of providers.
		 * see http://leafletjs.com/reference.html#tilelayer for options in the options map.
		 */

		L.TileLayer.Provider.providers = {
			OpenStreetMap: {
				url: '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				options: {
					maxZoom: 19,
					attribution:
						'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				},
				variants: {
					Mapnik: {},
					BlackAndWhite: {
						url: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
						options: {
							maxZoom: 18
						}
					},
					DE: {
						url: '//{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
						options: {
							maxZoom: 18
						}
					},
					France: {
						url: '//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
						options: {
							maxZoom: 20,
							attribution: '&copy; Openstreetmap France | {attribution.OpenStreetMap}'
						}
					},
					HOT: {
						url: '//{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
						options: {
							attribution: '{attribution.OpenStreetMap}, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
						}
					},
					BZH: {
						url: 'http://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
						options: {
							attribution: '{attribution.OpenStreetMap}, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
							bounds: [[46.2, -5.5], [50, 0.7]]
						}
					}
				}
			},
			OpenSeaMap: {
				url: 'http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
				options: {
					attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
				}
			},
			OpenTopoMap: {
				url: '//{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
				options: {
					maxZoom: 17,
					attribution: 'Map data: {attribution.OpenStreetMap}, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
				}
			},
			Thunderforest: {
				url: '//{s}.tile.thunderforest.com/{variant}/{z}/{x}/{y}.png?apikey={apikey}',
				options: {
					attribution:
						'&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, {attribution.OpenStreetMap}',
					variant: 'cycle',
					apikey: '<insert your api key here>',
					maxZoom: 22
				},
				variants: {
					OpenCycleMap: 'cycle',
					Transport: {
						options: {
							variant: 'transport'
						}
					},
					TransportDark: {
						options: {
							variant: 'transport-dark'
						}
					},
					SpinalMap: {
						options: {
							variant: 'spinal-map'
						}
					},
					Landscape: 'landscape',
					Outdoors: 'outdoors',
					Pioneer: 'pioneer'
				}
			},
			OpenMapSurfer: {
				url: 'http://korona.geog.uni-heidelberg.de/tiles/{variant}/x={x}&y={y}&z={z}',
				options: {
					maxZoom: 20,
					variant: 'roads',
					attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data {attribution.OpenStreetMap}'
				},
				variants: {
					Roads: 'roads',
					AdminBounds: {
						options: {
							variant: 'adminb',
							maxZoom: 19
						}
					},
					Grayscale: {
						options: {
							variant: 'roadsg',
							maxZoom: 19
						}
					}
				}
			},
			Hydda: {
				url: '//{s}.tile.openstreetmap.se/hydda/{variant}/{z}/{x}/{y}.png',
				options: {
					maxZoom: 18,
					variant: 'full',
					attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data {attribution.OpenStreetMap}'
				},
				variants: {
					Full: 'full',
					Base: 'base',
					RoadsAndLabels: 'roads_and_labels'
				}
			},
			MapBox: {
				url: '//api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
				options: {
					attribution:
						'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; ' +
						'Map data {attribution.OpenStreetMap}',
					subdomains: 'abcd',
					id: 'streets',
					accessToken: '<insert your access token here>',
				}
			},
			Stamen: {
				url: '//stamen-tiles-{s}.a.ssl.fastly.net/{variant}/{z}/{x}/{y}.{ext}',
				options: {
					attribution:
						'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
						'<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
						'Map data {attribution.OpenStreetMap}',
					subdomains: 'abcd',
					minZoom: 0,
					maxZoom: 20,
					variant: 'toner',
					ext: 'png'
				},
				variants: {
					Toner: 'toner',
					TonerBackground: 'toner-background',
					TonerHybrid: 'toner-hybrid',
					TonerLines: 'toner-lines',
					TonerLabels: 'toner-labels',
					TonerLite: 'toner-lite',
					Watercolor: {
						options: {
							variant: 'watercolor',
							minZoom: 1,
							maxZoom: 16
						}
					},
					Terrain: {
						options: {
							variant: 'terrain',
							minZoom: 0,
							maxZoom: 18
						}
					},
					TerrainBackground: {
						options: {
							variant: 'terrain-background',
							minZoom: 0,
							maxZoom: 18
						}
					},
					TopOSMRelief: {
						options: {
							variant: 'toposm-color-relief',
							ext: 'jpg',
							bounds: [[22, -132], [51, -56]]
						}
					},
					TopOSMFeatures: {
						options: {
							variant: 'toposm-features',
							bounds: [[22, -132], [51, -56]],
							opacity: 0.9
						}
					}
				}
			},
			Esri: {
				url: '//server.arcgisonline.com/ArcGIS/rest/services/{variant}/MapServer/tile/{z}/{y}/{x}',
				options: {
					variant: 'World_Street_Map',
					attribution: 'Tiles &copy; Esri'
				},
				variants: {
					WorldStreetMap: {
						options: {
							attribution:
								'{attribution.Esri} &mdash; ' +
								'Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
						}
					},
					DeLorme: {
						options: {
							variant: 'Specialty/DeLorme_World_Base_Map',
							minZoom: 1,
							maxZoom: 11,
							attribution: '{attribution.Esri} &mdash; Copyright: &copy;2012 DeLorme'
						}
					},
					WorldTopoMap: {
						options: {
							variant: 'World_Topo_Map',
							attribution:
								'{attribution.Esri} &mdash; ' +
								'Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
						}
					},
					WorldImagery: {
						options: {
							variant: 'World_Imagery',
							attribution:
								'{attribution.Esri} &mdash; ' +
								'Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
						}
					},
					WorldTerrain: {
						options: {
							variant: 'World_Terrain_Base',
							maxZoom: 13,
							attribution:
								'{attribution.Esri} &mdash; ' +
								'Source: USGS, Esri, TANA, DeLorme, and NPS'
						}
					},
					WorldShadedRelief: {
						options: {
							variant: 'World_Shaded_Relief',
							maxZoom: 13,
							attribution: '{attribution.Esri} &mdash; Source: Esri'
						}
					},
					WorldPhysical: {
						options: {
							variant: 'World_Physical_Map',
							maxZoom: 8,
							attribution: '{attribution.Esri} &mdash; Source: US National Park Service'
						}
					},
					OceanBasemap: {
						options: {
							variant: 'Ocean_Basemap',
							maxZoom: 13,
							attribution: '{attribution.Esri} &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
						}
					},
					NatGeoWorldMap: {
						options: {
							variant: 'NatGeo_World_Map',
							maxZoom: 16,
							attribution: '{attribution.Esri} &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
						}
					},
					WorldGrayCanvas: {
						options: {
							variant: 'Canvas/World_Light_Gray_Base',
							maxZoom: 16,
							attribution: '{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ'
						}
					}
				}
			},
			OpenWeatherMap: {
				url: 'http://{s}.tile.openweathermap.org/map/{variant}/{z}/{x}/{y}.png',
				options: {
					maxZoom: 19,
					attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
					opacity: 0.5
				},
				variants: {
					Clouds: 'clouds',
					CloudsClassic: 'clouds_cls',
					Precipitation: 'precipitation',
					PrecipitationClassic: 'precipitation_cls',
					Rain: 'rain',
					RainClassic: 'rain_cls',
					Pressure: 'pressure',
					PressureContour: 'pressure_cntr',
					Wind: 'wind',
					Temperature: 'temp',
					Snow: 'snow'
				}
			},
			HERE: {
				/*
				 * HERE maps, formerly Nokia maps.
				 * These basemaps are free, but you need an API key. Please sign up at
				 * http://developer.here.com/getting-started
				 *
				 * Note that the base urls contain '.cit' whichs is HERE's
				 * 'Customer Integration Testing' environment. Please remove for production
				 * envirionments.
				 */
				url:
					'//{s}.{base}.maps.cit.api.here.com/maptile/2.1/' +
					'{type}/{mapID}/{variant}/{z}/{x}/{y}/{size}/{format}?' +
					'app_id={app_id}&app_code={app_code}&lg={language}',
				options: {
					attribution:
						'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
					subdomains: '1234',
					mapID: 'newest',
					'app_id': '<insert your app_id here>',
					'app_code': '<insert your app_code here>',
					base: 'base',
					variant: 'normal.day',
					maxZoom: 20,
					type: 'maptile',
					language: 'eng',
					format: 'png8',
					size: '256'
				},
				variants: {
					normalDay: 'normal.day',
					normalDayCustom: 'normal.day.custom',
					normalDayGrey: 'normal.day.grey',
					normalDayMobile: 'normal.day.mobile',
					normalDayGreyMobile: 'normal.day.grey.mobile',
					normalDayTransit: 'normal.day.transit',
					normalDayTransitMobile: 'normal.day.transit.mobile',
					normalNight: 'normal.night',
					normalNightMobile: 'normal.night.mobile',
					normalNightGrey: 'normal.night.grey',
					normalNightGreyMobile: 'normal.night.grey.mobile',

					basicMap: {
						options: {
							type: 'basetile'
						}
					},
					mapLabels: {
						options: {
							type: 'labeltile',
							format: 'png'
						}
					},
					trafficFlow: {
						options: {
							base: 'traffic',
							type: 'flowtile'
						}
					},
					carnavDayGrey: 'carnav.day.grey',
					hybridDay: {
						options: {
							base: 'aerial',
							variant: 'hybrid.day'
						}
					},
					hybridDayMobile: {
						options: {
							base: 'aerial',
							variant: 'hybrid.day.mobile'
						}
					},
					pedestrianDay: 'pedestrian.day',
					pedestrianNight: 'pedestrian.night',
					satelliteDay: {
						options: {
							base: 'aerial',
							variant: 'satellite.day'
						}
					},
					terrainDay: {
						options: {
							base: 'aerial',
							variant: 'terrain.day'
						}
					},
					terrainDayMobile: {
						options: {
							base: 'aerial',
							variant: 'terrain.day.mobile'
						}
					}
				}
			},
			FreeMapSK: {
				url: 'http://t{s}.freemap.sk/T/{z}/{x}/{y}.jpeg',
				options: {
					minZoom: 8,
					maxZoom: 16,
					subdomains: '1234',
					bounds: [[47.204642, 15.996093], [49.830896, 22.576904]],
					attribution:
						'{attribution.OpenStreetMap}, vizualization CC-By-SA 2.0 <a href="http://freemap.sk">Freemap.sk</a>'
				}
			},
			MtbMap: {
				url: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
				options: {
					attribution:
						'{attribution.OpenStreetMap} &amp; USGS'
				}
			},
			CartoDB: {
				url: 'http://{s}.basemaps.cartocdn.com/{variant}/{z}/{x}/{y}.png',
				options: {
					attribution: '{attribution.OpenStreetMap} &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
					subdomains: 'abcd',
					maxZoom: 19,
					variant: 'light_all'
				},
				variants: {
					Positron: 'light_all',
					PositronNoLabels: 'light_nolabels',
					PositronOnlyLabels: 'light_only_labels',
					DarkMatter: 'dark_all',
					DarkMatterNoLabels: 'dark_nolabels',
					DarkMatterOnlyLabels: 'dark_only_labels'
				}
			},
			HikeBike: {
				url: 'http://{s}.tiles.wmflabs.org/{variant}/{z}/{x}/{y}.png',
				options: {
					maxZoom: 19,
					attribution: '{attribution.OpenStreetMap}',
					variant: 'hikebike'
				},
				variants: {
					HikeBike: {},
					HillShading: {
						options: {
							maxZoom: 15,
							variant: 'hillshading'
						}
					}
				}
			},
			BasemapAT: {
				url: 'https://maps{s}.wien.gv.at/basemap/{variant}/normal/google3857/{z}/{y}/{x}.{format}',
				options: {
					maxZoom: 19,
					attribution: 'Datenquelle: <a href="www.basemap.at">basemap.at</a>',
					subdomains: ['', '1', '2', '3', '4'],
					format: 'png',
					bounds: [[46.358770, 8.782379], [49.037872, 17.189532]],
					variant: 'geolandbasemap'
				},
				variants: {
					basemap: {
						options: {
							maxZoom: 20, // currently only in Vienna
							variant: 'geolandbasemap'
						}
					},
					grau: 'bmapgrau',
					overlay: 'bmapoverlay',
					highdpi: {
						options: {
							variant: 'bmaphidpi',
							format: 'jpeg'
						}
					},
					orthofoto: {
						options: {
							maxZoom: 20, // currently only in Vienna
							variant: 'bmaporthofoto30cm',
							format: 'jpeg'
						}
					}
				}
			},
			nlmaps: {
				url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts/{variant}/EPSG:3857/{z}/{x}/{y}.png',
				options: {
					minZoom: 6,
					maxZoom: 19,
					bounds: [[50.5, 3.25], [54, 7.6]],
					attribution: 'Kaartgegevens &copy; <a href="kadaster.nl">Kadaster</a>'
				},
				variants: {
					'standaard': 'brtachtergrondkaart',
					'pastel': 'brtachtergrondkaartpastel',
					'grijs': 'brtachtergrondkaartgrijs',
					'luchtfoto': {
						'url': 'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts/1.0.0/2016_ortho25/EPSG:3857/{z}/{x}/{y}.png',
					}
				}
			},
			NASAGIBS: {
				url: '//map1.vis.earthdata.nasa.gov/wmts-webmerc/{variant}/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}',
				options: {
					attribution:
						'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System ' +
						'(<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
					bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
					minZoom: 1,
					maxZoom: 9,
					format: 'jpg',
					time: '',
					tilematrixset: 'GoogleMapsCompatible_Level'
				},
				variants: {
					ModisTerraTrueColorCR: 'MODIS_Terra_CorrectedReflectance_TrueColor',
					ModisTerraBands367CR: 'MODIS_Terra_CorrectedReflectance_Bands367',
					ViirsEarthAtNight2012: {
						options: {
							variant: 'VIIRS_CityLights_2012',
							maxZoom: 8
						}
					},
					ModisTerraLSTDay: {
						options: {
							variant: 'MODIS_Terra_Land_Surface_Temp_Day',
							format: 'png',
							maxZoom: 7,
							opacity: 0.75
						}
					},
					ModisTerraSnowCover: {
						options: {
							variant: 'MODIS_Terra_Snow_Cover',
							format: 'png',
							maxZoom: 8,
							opacity: 0.75
						}
					},
					ModisTerraAOD: {
						options: {
							variant: 'MODIS_Terra_Aerosol',
							format: 'png',
							maxZoom: 6,
							opacity: 0.75
						}
					},
					ModisTerraChlorophyll: {
						options: {
							variant: 'MODIS_Terra_Chlorophyll_A',
							format: 'png',
							maxZoom: 7,
							opacity: 0.75
						}
					}
				}
			},
			NLS: {
				// NLS maps are copyright National library of Scotland.
				// http://maps.nls.uk/projects/api/index.html
				// Please contact NLS for anything other than non-commercial low volume usage
				//
				// Map sources: Ordnance Survey 1:1m to 1:63K, 1920s-1940s
				//   z0-9  - 1:1m
				//  z10-11 - quarter inch (1:253440)
				//  z12-18 - one inch (1:63360)
				url: '//nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg',
				options: {
					attribution: '<a href="http://geo.nls.uk/maps/">National Library of Scotland Historic Maps</a>',
					bounds: [[49.6, -12], [61.7, 3]],
					minZoom: 1,
					maxZoom: 18,
					subdomains: '0123',
				}
			},
			JusticeMap: {
				// Justice Map (http://www.justicemap.org/)
				// Visualize race and income data for your community, county and country.
				// Includes tools for data journalists, bloggers and community activists.
				url: 'http://www.justicemap.org/tile/{size}/{variant}/{z}/{x}/{y}.png',
				options: {
					attribution: '<a href="http://www.justicemap.org/terms.php">Justice Map</a>',
					// one of 'county', 'tract', 'block'
					size: 'county',
					// Bounds for USA, including Alaska and Hawaii
					bounds: [[14, -180], [72, -56]]
				},
				variants: {
					income: 'income',
					americanIndian: 'indian',
					asian: 'asian',
					black: 'black',
					hispanic: 'hispanic',
					multi: 'multi',
					nonWhite: 'nonwhite',
					white: 'white',
					plurality: 'plural'
				}
			}
		};

		L.tileLayer.provider = function (provider, options) {
			return new L.TileLayer.Provider(provider, options);
		};

		return L;
	}));

/////////////	CUT	/////////////////////////////////
	
//LEAFLET VARS
	
	var icon_PanSolar_1 = L.icon({
	    iconUrl: 'resources/images/solarpanel.png',
	    iconSize: [20, 48],
	    });
	var icon_PanSolar_2 = L.icon({
	    iconUrl: 'resources/images/solar2.png',
	    iconSize: [20, 48],
	    });
	
//DIBUJAR MAPA//////////////////////////
var mymap = L.map('mapid').setView([42.994603451901334, -2.4238586425781254], 9);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);



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
var marker2Arr = [];
var layerArr = [];
$("#boton_limpiar").on("click",function(e){
	
	for (var i=0; i < markerArr.length; i++) {
		mymap.removeLayer(markerArr[i]);
	};
	for (var i=0; i < marker2Arr.length; i++) {
		mymap.removeLayer(marker2Arr[i]);
	};
	for (var i=0; i < layerArr.length; i++) {
		mymap.removeLayer(layerArr[i]);
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
		var baseLayers = {
				//'Stamen Terrain': L.tileLayer.provider('Stamen.Terrain'),
				'OpenStreetMap Default': defaultLayer};
		var overlayLayers = {
				//'OpenWeatherMap Precipitation': L.tileLayer.provider('OpenWeatherMap.Precipitation'),
				'OpenSeaMap': L.tileLayer.provider('OpenSeaMap')};

		L.control.layers(baseLayers, overlayLayers, {collapsed: false}).addTo(mymap);
	
});

$("#boton_query2").click(function(){
	
	url='http://localhost:3000/api/maplayers';
	
	$.getJSON(url, function(result) {
		console.log(result);
		addLayer(result);
	});
	
});

$("#boton_query3").click(function(){
	
	url='http://localhost:3000/api/query';
	
	$.getJSON(url, function(result) {
		for (var x = 0; x < result.length; x++) {
			
			for (var i=0; i < markerArr.length; i++) {
				mymap.removeLayer(markerArr[i]);
			};
			
			lng = result[x].geometry.coordinates[0];
			lat = result[x].geometry.coordinates[1];
			marker = new L.marker([lat, lng],{icon: icon_PanSolar_2}).addTo(mymap);
			marker2Arr.push(marker);
		}
		console.log(result);
	});
	
	/*
	var polygon = result;	
	var myPolyLayer = L.geoJSON();
    myPolyLayer.addData(polygon);
	*/
	
});

function addLayer(layer) {
    var leaf_layer;
    if (layer.type == "MultiPoint") {
        leaf_layer = L.geoJson(layer, { pointToLayer: function (feature, latlng) {return L.circleMarker(latlng, layer.style); }})
        leaf_layer.bindPopup(layer.type);
    } else if (layer.type == "MultiLineString") {
        leaf_layer = L.geoJson(layer, {style: layer.style });
        leaf_layer.bindPopup(layer.type);
    } else  {
    	for (var i=0; i< layer.features.length; i++) {
    		feature = layer.features[0];
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
        layerArr.push(leaf_layer);
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
		
		//REST PATH
		url='http://localhost:3000/api/paneles';
		var xlat,xlng;
		
		$.ajax({
		    url: url,
		    success: AjaxSucceeded,
		    error: AjaxFailed
		});
		
		
		function AjaxSucceeded(result) {
			//console.log(result[0].geometry.coordinates[0]);		

			for (var x = 0; x < result.length; x++) {
				
				for (var i=0; i < marker2Arr.length; i++) {
					mymap.removeLayer(marker2Arr[i]);
				};
				
				lng = result[x].geometry.coordinates[0];
				lat = result[x].geometry.coordinates[1];
				marker = new L.marker([lat, lng],{icon: icon_PanSolar_1}).addTo(mymap);
				markerArr.push(marker);	
				console.log(marker._leaflet_id);
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

	/////
/*
UN LIO QUE NO MEHACIA FALTA:
	
	getxoLayer = result.features[0];

var alldata = {
		name: getxoLayer.properties.name,
		style: getxoLayer.properties.style,
		geo: getxoLayer.geometry
};

var polygon =  GeoJSON.parse(alldata, {GeoJSON: 'geo'});
console.log(polygon);

var polygon2 = getxoLayer.geometry.coordinates;
///

*/	
	////////////////////////////////////////////////////////////////////


