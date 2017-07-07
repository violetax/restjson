package aRESTJSON;

import java.util.List;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import org.json.JSONArray;
import org.json.JSONObject;

import dbms.pojo.Placa;
import service.PlacaServiceImp;
import service.interfaces.PlacaService;

import javax.ws.rs.Produces;


@Path("/")
public class RestFunctions {
	

	
	PlacaService placaService = new PlacaServiceImp();

	
//////////////********* TODOS ***********////////////////////
//DEVOLVER todos los puntos en la BDD
	
	 @POST
	  @Path("/cargartodos")
	  @Produces(MediaType.APPLICATION_JSON)
	  public String consumeJSONArray()  {
		
		List<Placa> placas = placaService.getAll();
		
		JSONObject jobject;	
		JSONArray jarray = new JSONArray();
		
		for (int i=0; i < placas.size(); i++) {
			
			jobject = new JSONObject();	
			
			jobject.put("Id", placas.get(i).getId());
			jobject.put("Latitud", placas.get(i).getLatitud());
			jobject.put("Longitud", placas.get(i).getLongitud());
			jobject.put("Codigo Postal", placas.get(i).getCodigoPostal());
			jobject.put("Capacidad", placas.get(i).getCapacidad());
			
			jarray.put(jobject);

		}
		
		String ret = jarray.toString();
		
		 return ret;
	 
	 }
//////////////********* VARIOS ***********////////////////////
//RECOGER puntos para operar con ellos
	 
	 @POST
	  @Path("/registrarpuntos")
	  @Produces(MediaType.APPLICATION_JSON)
	  public String consumeJSONArray2(final String variosPuntos)  {
		
	/*
		do somethibg with variosPuntos...
*/		
		 return variosPuntos;
	 
	 }
	  

	
}
