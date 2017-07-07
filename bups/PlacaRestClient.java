package aRESTJSON;

import java.util.List;

import dbms.persistence.Placa;

public interface PlacaRestClient {

	final static String URL = "http://192.168.4.31:3000/api/paneles";
	
	public List<Placa> getAll();	
	public Placa getById(int codigo);	
	public Placa create(Placa placa);	
	public Placa update(Placa placa);	
	public void delete(int codigo);
	
}
