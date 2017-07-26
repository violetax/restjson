	////////////////////////////////////////////////////////////////
//////###### BUSCADOR ##################///////////////////////
	function buscarPanel() {
		
		limpiarMarkers();
		
		//  topoData = "resources/geojson/pruebas.1.topo.json";
			
				var $valId_ =  $('input[id="identificador"]').val();
				var $valId = parseInt($valId_);
				var $valCompany = $('#compania option:selected').text();   		
						
				var pointToLayerBUSQ = function (feature, latlng) {
					return L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker)				  
				}; //END pointToLayerBUSQ
				
				function filterBUSQ(feature, latlng) {
					var fpValId = feature.properties.panelId.id;
					var fpValCompany = feature.properties.panelId.compania;				
					if (!$valId && fpValCompany === $valCompany) {
						 return true;
					} else if ($valId === fpValId && $valCompany === fpValCompany) {
						return true						
					} else if (!$valCompany && $valId === fpValId) { 
						 return true 			
					} else {
						return;			
					}
					  
					}; // END filterBUSQ
				
				var onEachFeatureBUSQ = function(feature, layer) {
					var fpValId = feature.properties.panelId.id;
					var fpValCompany = feature.properties.panelId.compania;	
					layer.bindPopup("Panel: " + fpValCompany + " ID: " + fpValId );
				}; //END onEachFeatureBUSQ
					
				var topoLayerBusqueda = new L.TopoJSON(null, { pointToLayer: pointToLayerBUSQ,
					filter: filterBUSQ,
					onEachFeature: onEachFeatureBUSQ});
					
				$.getJSON(topoData).done(addTopoData);
				limpiarMarkers();
				
				function addTopoData(topoData){ 				
						topoLayerBusqueda.addData(topoData);
						topoLayerBusqueda.addTo(mymap);						
				//	console.log(topoData.features);
				}
	}; //END OF function for btn_BUSCADOR
	
	
	
	
	
	
	
	
	
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
/////////////////////////////////////////////////////////////////////////////
			 
			 function showOptions() {


				  //let $fila = $("<tr>");
					$fila = $("tr:only-child");

				    let $divDropDown = $("<divX/>", {
				        class : "btn-group"
				    });

				    $divDropDown
				        .append($("<button/>",{
				            type:"button",
				            class:"btn btn-info",
				            text: "Acciones"
				        }))
				        .append($("<button/>",{
				            type:"button",
				            class:"btn btn-info dropdown-toggle",
				            "data-toggle":"dropdown",
				            "aria-haspopup":"true",
				            "aria-expanded":"false",
				            html: "<span class='caret'></span><span class='sr-only'>Toggle Dropdown</span>"
				        }))
				        .append($("<ul/>",{
				            class:"dropdown-menu"
				        })
				            .append($("<li/>",{
				                html: "<a href='#'>Editar</a>"
				            }))
				            .append($("<li/>",{
				                html: "<a href='#'>Borrar</a>"
				            })));
				            
				    let $col1 = $("<td>").append($("<input>",{type: 'checkbox',value: "yiuhuu"}));
				    let $col2 = $("<td>").text("hola");
				    let $col3 = $("<td>").append($divDropDown);

				    $fila.append($col1).append($col2).append($col3);

				    return $fila;
				}; //END OF function for btn_BUSCADOR

	
				
				
				console.log("fpValId:");
				console.log(typeof(fpValId));
				console.log(fpValId);
				
				console.log("$valId:");
				console.log(typeof($valId));
				console.log($valId);
				
				console.log("fpValCompany:");
				console.log(typeof(fpValCompany));
				console.log(fpValCompany);
				
				console.log("$valCompany:");
				console.log(typeof($valCompany));
				console.log($valCompany);
			 