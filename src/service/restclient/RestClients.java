package service.restclient;

import java.net.URI;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriBuilder;
import org.glassfish.jersey.client.ClientConfig;
import org.json.JSONArray;
import org.json.JSONObject;

import service.PlacaServiceImpGJ;
import service.interfaces.PlacaServiceGJ;



public class RestClients {
	
	// PlacaServiceGJ placaServiceGJ = new PlacaServiceImpGJ();

	 public static void main(String[] args) {
       
    	ClientConfig config = new ClientConfig();
        Client client = ClientBuilder.newClient(config);

        WebTarget target = client.target(getBaseURI());
        
        String restAnswer =
                target.path("api").path("paneles").request().accept(MediaType.APPLICATION_JSON).get(String.class);
        
          JSONArray jarray = new JSONArray(restAnswer);
   
        jarray.forEach(item -> {
            
        	JSONObject placa = (JSONObject) item;
            System.out.println(placa.toString());
        	//placaServiceGJ.toGeoJSON(placa);
   });
		//return restAnswer;
        System.out.println(restAnswer);

    }
 
/*
 */
    private static URI getBaseURI() {
        return UriBuilder.fromUri("http://localhost:3000").build();
    }
 
public String crearGeoJSON(JSONObject jsonObj)  {
		
		JSONArray jarray = new JSONArray();
		
		for (int i=0; i < jsonObj.length(); i++) {
			
			JSONObject jobject = new JSONObject();	
	//jobject.put("type", placas.get(i).getId());
			
			jarray.put(jobject);

		}
		
		String ret = jarray.toString();
		
		 return ret;
	 
	 }
}