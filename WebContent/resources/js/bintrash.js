//// ******* PENDIENTE ***********////////////

//////////////////////////////////////////////////////////////////
//////###### BUSCADOR ##################///////////////////////

var parametrosObject = {};


var parametros_1_Array = [];
var parametros_2_Array = [];
var parametros_3_Array = [];

	var onEachFeatureBUSQUEDA = function(feature, layer) {
		var para1 = feature.properties.parametroMedida1;
		var para2 = feature.properties.parametroMedida2;
		var para3 = feature.properties.parametroMedida3;
		
		parametros_1_Array.push(para1);
		parametros_2_Array.push(para2);
		parametros_3_Array.push(para3);
		
		parametrosObject = {
				parametroMedida1 : parametros_1_Array,
				parametroMedida2 : parametros_2_Array,
				parametroMedida3 : parametros_3_Array
		}

		return parametrosObject;
	};
	
	// TOPOJSON LAYER
	var topoLayerBUSQUEDA = new L.TopoJSON(null, { 
		onEachFeature: onEachFeatureBUSQUEDA});
		
	$.getJSON(topoData).done(addTopoData);
	
	
	function addTopoData(topoData){ 	
			topoLayerBUSQUEDA.addData(topoData);
	};
/////////////////////////////////////////////////////////


$("#boton_pruebas").on("click",function(){
	
	console.log(companias.length);
	   console.log(checkedCompaniesArr.length);
	   printArr(checkedCompaniesArr);
	

//array to store layers for each feature type
var mapLayerGroups = [];
/*
 *for all features:
 *for each feature type create a layerGroup  
 *and add each feature to the respective layerGroup
*/
function onEachFeature(feature, featureLayer) {
    //does layerGroup already exist? if not create it and add to map	
	var lg = mapLayerGroups[feature.properties.panelId.compania];
	
    if (lg === undefined) {
        lg = new L.layerGroup();
        //add the layer to the map
        lg.addTo(mymap);
        //store layer
        mapLayerGroups[feature.properties.panelId.compania] = lg;	      
        //add the feature to the layer
        lg.addLayer(featureLayer); 
        console.log(feature.properties.panelId.compania);		    
    }
	};
	
});//END OF PRUEBAS

//////////////////////////////

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

	
				
//////// HARI CHECKBOXES //////////////////
				console.log("checkedCompaniesArr PREV");
				console.log(checkedCompaniesArr);

			// AJUSTAR checkedCompaniesArr
				if (todasCHECK) {
					emptyArr(checkedCompaniesArr);
					fillUpArr(companias, checkedCompaniesArr);
					console.log("todascheck true");
					console.log(checkedCompaniesArr);
				} else {
					console.log("todascheck false");
					if (checkedCompaniesArr.length > 0 && checkedCompaniesArr.length < 20 || checkedCompaniesArr.length === 0) {
						console.log("checkedCompaniesArr.length > 0 && checkedCompaniesArr.length < 20");
						console.log(checkedCompaniesArr);
						if (grupoPequenasCheckBoxCHECK) {
							fillUpArr(companiasPequenas, checkedCompaniesArr);
							console.log("grupoPequenasCheckBoxCHECK true");
							console.log(checkedCompaniesArr);
						} else {
							for (var i=0; i< companiasPequenas.length; i++) {
								removeArrElementByVal(checkedCompaniesArr, companiasPequenas[i]);
							}
							console.log("grupoPequenasCheckBoxCHECK false");
							console.log(checkedCompaniesArr);
						}
					}  else if (checkedCompaniesArr.length === 20) {
						emptyArr(checkedCompaniesArr);
						console.log("checkedCompaniesArr.length === 20");
						console.log(checkedCompaniesArr);
					};
					
				}; // end check chekBoxes

		//////// \\\ HARI CHECKBOXES //////////////////		 
				
				/// more hari
				// LIMPIAR MARCADORES Y LLAYERS PREVIAS
				limpiarMarkers();
				if (uniqueArr.length>0) {
					emptyArr(uniqueArr);
				};

				console.log("checkedCompaniesArr PREV");
				console.log(checkedCompaniesArr);

			// AJUSTAR checkedCompaniesArr
				if (todasCHECK) {
					emptyArr(checkedCompaniesArr);
					fillUpArr(companias, checkedCompaniesArr);
					console.log("todascheck true");
					console.log(checkedCompaniesArr);
				} else if (grupoPequenasCheckBoxCHECK) {
						console.log("grupoPequenasCheckBoxCHECK true");
						console.log(checkedCompaniesArr);
						//se suman las pequenas
						fillUpArr(companiasPequenas, checkedCompaniesArr);
						console.log(checkedCompaniesArr.length);
						console.log(checkedCompaniesArr);
						//se borran dups porsiaca
						if (checkedCompaniesArr.length != 11) {
							console.log("checkedCompaniesArr.length != 11");
							console.log(checkedCompaniesArr);
							//1. se hace un arr con single values
							removeDuplicatesArr(checkedCompaniesArr, uniqueArr)
							console.log(checkedCompaniesArr);
							console.log(uniqueArr);
							//. se borra el arr general
							emptyArr(checkedCompaniesArr);
							console.log(checkedCompaniesArr);
							//. se rellena el arr general con los single vasl
							fillUpArr(checkedCompaniesArr, uniqueArr);
							console.log("After removeDuplicatesArr");
							console.log(checkedCompaniesArr);
						}

				} else {
					for (var i=0; i< companiasPequenas.length; i++) {
						removeArrElementByVal(checkedCompaniesArr, companiasPequenas[i]);
					}
					console.log("grupoPequenasCheckBoxCHECK false");
						console.log(checkedCompaniesArr); }; // end check chekBoxes
				
				/* Lasty
				 * else {
						//se borran dups porsiaca
						//1. se hace un arr con sigle values
						removeDuplicatesArr(checkedCompaniesArr, uniqueArr)
						//. se borra el arr general
						emptyArr(checkedCompaniesArr);
						//. se rellena el arr general con los single vasl
						fillUpArr(checkedCompaniesArr, uniqueArr);
						console.log("grupoPequenasCheckBoxCHECK false");
						console.log(checkedCompaniesArr);
					}		
					*/

					/*
					if (checkedCompaniesArr.length > 0 && checkedCompaniesArr.length < 20 || checkedCompaniesArr.length === 0) {
						console.log("checkedCompaniesArr.length > 0 && checkedCompaniesArr.length < 20");
						console.log(checkedCompaniesArr);
						if (grupoPequenasCheckBoxCHECK) {
							fillUpArr(companiasPequenas, checkedCompaniesArr);
							console.log("grupoPequenasCheckBoxCHECK true");
							console.log(checkedCompaniesArr);
						} else {
							for (var i=0; i< companiasPequenas.length; i++) {
								removeArrElementByVal(checkedCompaniesArr, companiasPequenas[i]);
							}
							console.log("grupoPequenasCheckBoxCHECK false");
							console.log(checkedCompaniesArr);
						}
					}  else if (checkedCompaniesArr.length === 20) {
						emptyArr(checkedCompaniesArr);
						console.log("checkedCompaniesArr.length === 20");
						console.log(checkedCompaniesArr);
					};
					*/
	/*					
						<div class="btn-group">
						<button class="btn btn-info mydropdown">Elegir compañia</button>
						<button class="btn btn-info dropdown-toggle mydropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<span class='caret'></span><span class='sr-only'>Toggle Dropdown</span>
						</button>
					<ul class="dropdown-menu">
					 <li><label><input type="checkbox" class="ctrlCB" id="ACCE"/></label><label for="ACCE">ACCE</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="AUPN"/></label><label for="AUPN">AUPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="EEPN"/></label><label for="EEPN">EEPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="ENDS"/></label><label for="ENDS">ENDS</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="EONE"/></label><label for="EONE">EONE</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="EOPN"/></label><label for="EOPN">EOPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="FLPN"/></label><label for="FLPN">FLPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="GDFS"/></label><label for="GDFS">GDFS</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="GEPN"/></label><label for="GEPN">GEPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="GNFE"/></label><label for="GNFE">GNFE</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="HCEN"/></label><label for="HCEN">HCEN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="HLPN"/></label><label for="HLPN">HLPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="IBDR"/></label><label for="IBDR">IBDR</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="IMPN"/></label><label for="IMPN">IMPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="NTRG"/></label><label for="NTRG">NTRG</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="NXPN"/></label><label for="NXPN">NXPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="PEPN"/></label><label for="PEPN">PEPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="SHEL"/></label><label for="SHEL">SHEL</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="SYPN"/></label><label for="SYPN">SYPN</label></li>
					 <li><label><input type="checkbox" class="ctrlCB" id="VMPN"/></label><label for="VMPN">VMPN</label></li>
					<ul>
					</div>
*/
						
// MODAL AFTER FORM
			/*
			 *        
       
       <button id="btn_BUSCADOR" type="button" class="btn btn-info btn-xl" data-toggle="modal" data-target="#myModal">
    	<span class="glyphicon glyphicon glyphicon-search">	BUSCADOR</span></button> 	 	
    	  <button class="btn btn-danger" id="boton_pruebas" type="button">PRUEBAS</button>
				<!-- MODAL -->
						<div class="modal fade" tabindex="-1" role="dialog" id="myModal">
						  <div class="modal-dialog" role="document">
						    <div class="modal-content">
						      <div class="modal-header">
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						        <h4 class="modal-title">Buscar panel</h4>
						      </div>
						      <div class="modal-body">
						        <form id="busqueda-panel">
						            <div class="form-group">
						                <label for="identificador">Identificador</label>
						                <input type="number" min="1" class="form-control" name="identificador" id="identificador" placeholder="Identificador">
						            </div>
						            <div class="form-group">
						                <label for="compania">Compañia</label>
						      
						            	 <select class="form-control" id="compania">
						            	 	<option value="" disabled selected></option>
											<option>ACCE</option>
											<option>AUPN</option>
											<option>EEPN</option>
											<option>ENDS</option>
											<option>EONE</option>
											<option>EOPN</option>
											<option>FLPN</option>
											<option>GDFS</option>
											<option>GEPN</option>
											<option>GNFE</option>
											<option>HCEN</option>
											<option>HLPN</option>
											<option>IBDR</option>
											<option>IMPN</option>
											<option>NTRG</option>
											<option>NXPN</option>
											<option>PEPN</option>
											<option>SHEL</option>
											<option>SYPN</option>
											<option>VMPN</option>				
										 </select>
						            </div>
						         </form>
								</div>
						      <div class="modal-footer">
						          <button type="button"  class="btn btn-primary" id="modalBtnBuscarPanel">Buscar</button>     
						          <button class="btn btn-small" data-dismiss="modal" aria-hidden="true">Cancel</button>                       
						      </div>
						    </div><!-- /.modal-content -->
						  </div><!-- /.modal-dialog -->
						</div><!-- /.modal -->
						
						*/
						
						function buscarPanel() {
							
//							limpiarMarkers();
								
									var $valId_ =  $('input[id="identificador"]').val();
									var $valId = parseInt($valId_);
									var $valCompany = $('#compania option:selected').text();   		
											
									var pointToLayerBUSQ = function (feature, latlng) {
										var marker = L.marker(latlng,{icon: icon_PanSolar_NEGRO}); markerArrEN.push(marker);
										return marker;
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
									
									function addTopoData(topoData){ 				
											topoLayerBusqueda.addData(topoData);
											markersCG_busqueda.addLayer(topoLayerBusqueda);
											mymap.addLayer(markersCG_busqueda);
											mymap.fitBounds(markersCG_busqueda.getBounds());
									//	console.log(topoData.features);
									}
						}; //END OF function for btn_BUSCADOR
						



					$("#modalBtnBuscarPanel").on("click", function() {		
						buscarPanel();
						$("#myModal").modal('hide');
					});
					
					
					/*
					 * 			 float: right; 
			 margin-left: 50px;
			 width: 30%;
			 height: 100%;
			 position: absolute;
    		 top: 0px;
    		 right: 0px;
    		 
					 */
					
					/*
					 * /* MODAL STYLE */
/*
*  https://stackoverflow.com/questions/17911918/bootstrap-modal-popping-up-but-has-a-tinted-page-and-cant-interact
 * *body.modal-open div.modal-backdrop { z-index: 0; } */
/*
.modal-open
    {overflow:hidden
}
.modal
    {position:fixed;top:0;right:0;bottom:0;left:0;z-index:1050;display:none;overflow:hidden;-webkit-overflow-scrolling:touch;outline:0
}
.modal.fade .modal-dialog
    {-webkit-transition:-webkit-transform .3s
ease-out;-o-transition:-o-transform .3s ease-out;transition:transform .3s
ease-out;-webkit-transform:translate(0,-25%);-ms-transform:translate(0,-25%);-o-transform:translate(0,-25%);transform:translate(0,-25%)
}
.modal.in .modal-dialog
    {-webkit-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0)
}
.modal-open .modal
    {overflow-x:hidden;overflow-y:auto
}
.modal-dialog
    {position:relative;width:auto;margin:10px
}
.modal-content
    {position:relative;background-color:#fff;-webkit-background-clip:padding-box;background-clip:padding-box;border:1px
solid #999;border:1px solid
rgba(0,0,0,.2);border-radius:6px;outline:0;-webkit-box-shadow:0 3px 9px
rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5)
}
.modal-backdrop
    {position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:#000}
.modal-backdrop.fade
    {opacity:0
}
.modal-backdrop.in
    {opacity:.5
}
.modal-header
    {padding:15px;border-bottom:1px solid #e5e5e5
}
.modal-header .close
    {margin-top:-2px
}
.modal-title
    {margin:0;line-height:1.42857143
}
.modal-body
    {position:relative;padding:15px
}
.modal-footer
    {padding:15px;text-align:right;border-top:1px solid #e5e5e5
}
.modal-footer .btn+.btn
    {margin-bottom:0;margin-left:5px
}
.modal-footer .btn-group .btn+.btn
    {margin-left:-1px
}
.modal-footer .btn-block+.btn-block
    {margin-left:0
}
.modal-scrollbar-measure
    {position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll
}
@media (min-width:768px)
    {.modal-dialog
    {width:600px;margin:30px auto
}
.modal-content
    {-webkit-box-shadow:0 5px 15px rgba(0,0,0,.5);box-shadow:0 5px 15px
rgba(0,0,0,.5)
}
.modal-sm
    {width:300px
}

}
@media (min-width:992px)
    {.modal-lg
    {width:900px
}

}


*/
/**************/

				
					
					////////////////////////////
					
					var availableTags = [
					                     "ActionScript",
					                     "AppleScript",
					                     "Asp",
					                     "BASIC",
					                     "C",
					                     "C++",
					                     "Clojure",
					                     "COBOL",
					                     "ColdFusion",
					                     "Erlang",
					                     "Fortran",
					                     "Groovy",
					                     "Haskell",
					                     "Java",
					                     "JavaScript",
					                     "Lisp",
					                     "Perl",
					                     "PHP",
					                     "Python",
					                     "Ruby",
					                     "Scala",
					                     "Scheme"
					                   ];