package aRESTJSON;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonString;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONObject;

import dbms.pojo.Placa;
import service.PlacaServiceImp;
import service.interfaces.PlacaService;

import javax.ws.rs.Produces;


@Path("/")
public class RestFunctions {
	
	
	//@Inject
	PlacaService placaService = new PlacaServiceImp();
	

	public JsonString printString(String mistring) {		
		JsonString jstring = Json.createValue(mistring);		
		System.out.println(jstring.toString());
		return jstring;
	}
	

//GETS/////////////////////////////////////////////////////////////////////////////
	
	
	///SIMPLE
	 @GET
	 @Produces(MediaType.TEXT_HTML)
	  public String sayHtmlHello() {
		 String output = "simple get";
	    return "<html><head></head><body><p>" + output + "</p></body></html>";
	  }		
	////////////////////////////////////////////////////////////////////////////////
	/*PASO GARGARTODOS A POST
	 @GET
	 @Path("/cargartodos")
	    public String cargartodos() {	
		 //"{'Latitud': 43.2629489, 'Longitud': -2.9349459}";   	
			 String output = "{\"dir1\":{\"lat\":37.4228642,\"lng\":-122.0851557},\"dir2\":{\"lat\":37.4221145,\"lng\":-122.0859841},\"dir3\":{\"lat\":37.4238383302915,\"lng\":-122.0842209197085},\"dir4\":{\"lat\":37.4211403697085,\"lng\":-122.0869188802915}";
			 return "<p>" + output + "</p>";
	 } 
	 */
	 //////ESTO DA ERROR: CLASS NOT FOUND:
	/*	 @GET
		 @Path("/cargartodos")
		 @Produces(MediaType.TEXT_HTML)
		  public String getJString() {
		//C/Nervion Bilbao:
			 	String mistring = "{'Latitud': '43.2629489', 'Longitud': '-2.9349459'}";
				JsonString jstring = printString(mistring);		 
		    return "<h3>" + jstring.toString() + "</h3>";
		  }	*/	  
	 /////////////////////////////////////////////////////////////////////////////

	 // This methods are called if HTML is request
		/* @GET
		    @Path("/{param}")
		    public Response getMsg(@PathParam("param") String msg) {
		    	String output = "GET PARA: " + msg;
		        return Response.status(200).entity(output).build();
		    }
	*/
		 
//POSTS/////////////////////////////////////////////////////////////////////////////		
	 
//////////////********* TODOS ***********////////////////////
	 
	 @POST
	  @Path("/cargartodos")
	  //@Consumes(MediaType.APPLICATION_JSON)
	  @Produces(MediaType.APPLICATION_JSON)
	  public String consumeJSONArray()  {
		 //Placa placa = new Placa();
		 
		List<Placa> placas = placaService.getAll();
		
		JSONObject jobject;	
		//JSONObject jobject_return = new JSONObject();	
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
		 
	 
		//jobject.append(key, value)
		 
	 // System.out.println("hola");
		 /*
		  *  "[{\"Latitud\":43.25095442899224,\"Longitud\":-2.951889038085938}"
		 		+ ",{\"Latitud\":43.26012,\"Longitud\":-2.95130}"
		 		+ ",{\"Latitud\":43.27344,\"Longitud\":-2.95898}"
		 		+ ",{\"Latitud\":43.2801224,\"Longitud\":-2.951801238}"
		 		+ ",{\"Latitud\":43.29093021011,\"Longitud\":-2.95030211}]"
		  */
		//jobject_return.put("Placas", jarray);
		
		String ret = jarray.toString();
		
		 return ret;
	 
	 }
	  
	  
	 

//////////////********* AREA ***********////////////////////
	 
	 /* INTENCION RECIBE JSON AS DIRECCION:::::
	 EJEMPLO COMPLEJO:
	 @POST
		  @Path("/cargarporarea")
		  @Consumes(MediaType.APPLICATION_JSON)
		  public Response consumeListaPuntosJSON(Direccion direccion) {
		  //Calculo coordenadas within given limits & return???
			  String output = direccion.toString();
			  return Response.status(200).entity(output).build();
		  }
     // EJEMPLO SIMPLE:
     
	  @POST
		  @Path("/cargarporarea")
		  @Consumes(MediaType.APPLICATION_JSON)
		  @Produces(MediaType.APPLICATION_JSON)
		  public String  consumeListaPuntosJSON(final String direccion) {
		  //Calculo coordenadas within given limits & return???
			   return "{\"id\": \"val\"}";
		  }
	*/
	 // DE MOMENTO RECIBE STRING Y LA DEVUELVE TAL CUAL:
	 @POST
	 @Path("/cargarporarea")
	 public String simplePuntoPost(final String input) { //@PathParam("coordenadas") String coordenadas) {
	     return "<p>" + "DevueltasXA: " + input +  "</p>";
	 }
	 
//////////////*********PUNTO***********////////////////////
	 
	/* INTENCION RECIBE JSON AS DIRECCION DE UN PUNTO, Y DEVUELVE JSON 
	 * INFORMACION DE ESE PUNTO  
	EJEMPLO COMPLEJO:
	 @POST
	  @Path("/cargarporpunto")
	  @Consumes(MediaType.APPLICATION_JSON)
	  public Response consumePuntoJSON(Direccion direccion) {
	  //Busco punto mas cercano y devuelvo objeto de clase info...
		   int codigo = direccion.getCodigo();
		   Direccion direccionBD = direccionService.getById(codigo); 
		   String output = direccionBD.toString();
		   return Response.status(200).entity(output).build();	  
	  }
	*/
	// EJEMPLO SIMPLE:
		  @POST
			  @Path("/cargarporpunto")
			  @Consumes(MediaType.APPLICATION_JSON)
			  @Produces(MediaType.APPLICATION_JSON)
			  public String  consumePuntoJSON(final String input) throws IOException {
			  //System.out.println(input);
			
				  

			
			  return input;
			  }
	/* 
	 // DE MOMENTO RECIBE STRING Y LA DEVUELVE TAL CUAL:
		    
	@POST
	@Path("/cargarporpunto")
	 public String simplePuntoPost2(final String input) { //@PathParam("coordenadasPunto") String coordenadasPunto) {
	     return "<p>" + "DevueltasXP: " + input +  "</p>";
	 }
	
 */
	
}
