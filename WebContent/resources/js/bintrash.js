//// ******* PENDIENTE ***********////////////

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
			 