package aRESTJSON;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import org.json.JSONArray;
import org.json.JSONObject;

import dbms.persistence.Placa;
import service.PlacaServiceImpGJ;
import service.interfaces.PlacaService;

import javax.ws.rs.Produces;

@Path("/")
public class RestGEOJson {
	
	PlacaService placaService;
	
//////////////********* TODOS LOS PUNTOS: de bdd a map ***********////////////////////
//DEVOLVER todos los puntos en la BDD
	//getAll
	
//plan: 

//1.	"connect to bdd" via rest y recoger un json con:
	// a/ todos los puntos
	// b/ todos los puntos de acuerdo con condicion
	
//2.	convertir el json en Placa Object y operar con el con el Service
//3.	devolver String con forma json con los datos requeridos 
		
	// A/ sacar los puntos de mi service
	 @POST
	  @Path("/cargartodosGJ")
	  @Produces(MediaType.APPLICATION_JSON)
	  public String cargartodosGJ()  {
		
		 return "astring";
	 
	 }

////////////////////////////////////////////////////////////
	 


	
}
