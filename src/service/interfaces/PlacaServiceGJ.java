package service.interfaces;


import org.json.JSONObject;

import dbms.persistence.PlacaFeature;

public interface PlacaServiceGJ {

	public String getAll();
	public String getById(int identificador);
	public String create(PlacaFeature placa);
	public String update(PlacaFeature placa);
	public void delete(int identificador);
	
	public PlacaFeature toGeoJSON(JSONObject placa);
	
}
