package aRESTJSON;

import javax.json.Json;
import javax.json.JsonString;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.Produces;
//import javax.ws.rs.core.MediaType;

@Path("/")
public class RestFunctionsBUP {

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
	
	 @GET
	 @Path("/cargartodos")
	    public String cargartodos() {	
		 //"{'Latitud': 43.2629489, 'Longitud': -2.9349459}";   	
			 String output = "{\"dir1\":{\"lat\":37.4228642,\"lng\":-122.0851557},\"dir2\":{\"lat\":37.4221145,\"lng\":-122.0859841},\"dir3\":{\"lat\":37.4238383302915,\"lng\":-122.0842209197085},\"dir4\":{\"lat\":37.4211403697085,\"lng\":-122.0869188802915}";
			 return "<p>" + output + "</p>";
	 } 
	 
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
      EJEMPLO SIMPLE:
      https://stackoverflow.com/questions/14622531/how-to-pass-json-string-to-jersey-rest-web-service-with-post-request
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
	 
	 
	/* INTENCION RECIBE JSON AS DIRECCION DE UN PUNTO, Y DEVUELVE JSON 
	 * INFORMACION DE ESE PUNTO  
	
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
	 
	 // DE MOMENTO RECIBE STRING Y LA DEVUELVE TAL CUAL:
		    
	@POST
	@Path("/cargarporpunto")
	 public String simplePuntoPost2(final String input) { //@PathParam("coordenadasPunto") String coordenadasPunto) {
	     return "<p>" + "DevueltasXP: " + input +  "</p>";
	 }
	

	
}
