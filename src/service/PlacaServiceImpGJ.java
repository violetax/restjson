package service;

import java.net.URI;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriBuilder;
import org.glassfish.jersey.client.ClientConfig;
import org.json.JSONArray;
import org.json.JSONObject;

import dbms.persistence.PlacaFeature;
import service.interfaces.PlacaServiceGJ;

public class PlacaServiceImpGJ implements PlacaServiceGJ {

	//private List<Placa> placas;
	//private static int i = 0;

	public PlacaServiceImpGJ() {
		super();
	}
	
	@Override
	public String getAll() {
		
		ClientConfig config = new ClientConfig();
        Client client = ClientBuilder.newClient(config);
        WebTarget target = client.target(getBaseURI());    
        String restAnswer =
                target.path("api").path("paneles").request().accept(MediaType.APPLICATION_JSON)
                		.get(String.class);
        
        JSONArray answerJarray = new JSONArray(restAnswer);
        JSONArray placasGeoJsonJarray = new JSONArray();
        
        answerJarray.forEach(item -> {                 	
        	JSONObject placaJobject = (JSONObject) item;
        	PlacaFeature placaGeoJson = toGeoJSON(placaJobject);
        	placasGeoJsonJarray.put(placaGeoJson);
   });
        String placasGeoJson = placasGeoJsonJarray.toString();
		
        return placasGeoJson;
	}

	 private static URI getBaseURI() {
	        return UriBuilder.fromUri("http://192.168.4.31:3000").build();
	    }
	

	@Override
	public String create(PlacaFeature placa) {
		return null;
	}
	
	@Override
	public String getById(int identificador) {
		return null;
	}
	
	//private int buscarElemento(int identificador) throws Exception {return 0;}

	@Override
	public String update(PlacaFeature placa) {

		return null;
	}

	@Override
	public void delete(int identificador) {		
	}

	@Override
	public PlacaFeature toGeoJSON(JSONObject placa) {
		return null;
	}

}