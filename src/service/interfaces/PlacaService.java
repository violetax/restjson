package service.interfaces;


import java.util.List;

import org.json.JSONObject;

import dbms.persistence.Placa;

public interface PlacaService {

	public List<Placa> getAll();
	public Placa getById(int identificador);
	public Placa create(Placa placa);
	public Placa update(Placa placa);
	public void delete(int identificador);
	
	
}
