package aRESTJSON;

import java.net.URI;
import java.util.List;
//import java.util.logging.Logger;

import org.springframework.web.client.RestTemplate;

import dbms.persistence.Placa;

//@Transactional
//@Service
public class PlacaRestClientImp implements PlacaRestClient {

	@Override
	public List<Placa> getAll() {
		
		RestTemplate template = new RestTemplate();
		List<Placa> placas = null;
		
		placas = template.getForObject(PlacaRestClient.URL + ".json", List.class);
		
		return placas;
	}

	@Override
	public Placa getById(int codigo) {
		
		RestTemplate template = new RestTemplate();
		Placa placa = null;
		
		placa = template.getForObject(PlacaRestClient.URL + "/", Placa.class);
		
		return placa;
	}

	@Override
	public Placa create(Placa placa) {
		
		RestTemplate template = new RestTemplate();
		URI uri = template.postForLocation(PlacaRestClient.URL, placa);
		
		Placa pla = template.getForObject(uri, Placa.class);
		
		return pla;
	}

	@Override
	public Placa update(Placa placa) {
		
		RestTemplate template = new RestTemplate();
		
		template.put(PlacaRestClient.URL + "/" + placa.getId(), placa);

		
		return placa;
	}

	@Override
	public void delete(int codigo) {
		RestTemplate template = new RestTemplate();
		template.delete(PlacaRestClient.URL + "/" + codigo); 

		
	}



}
