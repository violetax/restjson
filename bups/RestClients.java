package aRESTJSON;

import java.net.URI;
import java.util.List;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import org.glassfish.jersey.client.ClientConfig;
import org.json.JSONArray;
import org.json.JSONObject;

import service.PlacaServiceImpGJ;
import service.PlacaServiceImpGeoJSON;
import service.interfaces.PlacaServiceGJ;
import sun.security.jca.GetInstance;


public class RestClients {
	
	 PlacaService placaServiceGJ = new PlacaServiceImpGeoJSON();

 //   public static void main(String[] args) {
	public String prueba() {
       
    	ClientConfig config = new ClientConfig();
        Client client = ClientBuilder.newClient(config);

        WebTarget target = client.target(getBaseURI());
        
        String restAnswer =
                target.path("api").path("paneles").request().accept(MediaType.APPLICATION_JSON).get(String.class);
        
        //System.out.println(restAnswer);
        //restAnswer = [{"_id":"595deeef41480fb015f72ed7","id":1,"latitud":43.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7"},{"_id":"595df07d41480fb015f72ed8","id":2,"latitud":43.264216,"longitud":-2.9267,"CP":"48001","capacidad":"12"},{"_id":"595f52ce341679801a000009","id":5,"latitud":43.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7","__v":0},{"_id":"595f52df341679801a00000a","id":5,"latitud":43.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7","__v":0},{"_id":"595f52eb341679801a00000b","id":5,"latitud":43.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7","__v":0},{"_id":"595f52f4341679801a00000c","id":5,"latitud":43.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7","__v":0},{"_id":"595f5323341679801a00000f","id":5,"latitud":44.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7","__v":0},{"_id":"595f5325341679801a000010","id":5,"latitud":44.313858,"longitud":-2.680981,"CP":"48300","capacidad":"7","__v":0}]

        JSONArray jarray = new JSONArray(restAnswer);
        
        //System.out.println(jarray.length());
        //System.out.println(jarray.get(1).toString());
        
        
        jarray.forEach(item -> {
            
        	JSONObject placa = (JSONObject) item;
            
        	placaServiceGJ.toGeoJSON(placa);
        	
        	//placa.toGeoJSON();
            
            //System.out.println(placa.toString());
            //System.out.println("Keys: " + obj.keys()); //Keys: java.util.HashMap$KeyIterator@323b36e0 NPI qu� es esto
            //System.out.println("Key set: " + obj.keySet()); // Key set: [latitud, longitud, _id, id, CP, capacidad]
        });
		return restAnswer;
        

    }
 
/*
 

 
 
 */
    
    

    private static URI getBaseURI() {
        return UriBuilder.fromUri("http://192.168.4.31:3000").build();
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

/*
 
String response = target.path("api").
                            path("paneles").
                            request().
                            accept(MediaType.APPLICATION_JSON).
                            get(Response.class)
                            .toString();     
 
String plainAnswer = 
		target.path("api").path("paneles").request().accept(MediaType.TEXT_PLAIN).get(String.class);
String xmlAnswer =
        target.path("rest").path("hello").request().accept(MediaType.TEXT_XML).get(String.class);
String htmlAnswer=
        target.path("rest").path("hello").request().accept(MediaType.TEXT_HTML).get(String.class);

System.out.println(xmlAnswer);
System.out.println(htmlAnswer);
*/