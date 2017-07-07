package service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import dbms.persistence.Placa;
import service.interfaces.PlacaServiceGJ;

public class PlacaServiceImp implements PlacaService {

	private List<Placa> placas;
	private static int i = 0;

	public PlacaServiceImp() {
		super();
		placas = new ArrayList<Placa>();
		init();
	}

	private void init() {
		/*
		 * new
		 * try:
		 * set
		 * create
		 * catch:
		 */
		
		Placa placa = new Placa();
		
		try {
			String placa1 = "Placa 1";
			double latitud1 = 43.313858;
			double longitud1 = -2.680981;			
			String codigoPostal1 = "48300";
			int capacidad1 = 7;
			placa.setLatitud(latitud1);
			placa.setLongitud(longitud1);
			placa.setCodigoPostal(codigoPostal1);
			placa.setCapacidad(capacidad1);
			create(placa);
		} catch (Exception e) {
			System.out.println("Placa 1 exception: " + e.getMessage());			
		}
		
		placa = new Placa();
		
		try {	
			String placa2 = "Placa 2";
			double latitud2 = 43.264216;
			double longitud2 = -2.9267;			
			String codigoPostal2 = "48001";
			int capacidad2 = 12;
			placa.setLatitud(latitud2);
			placa.setLongitud(longitud2);
			placa.setCodigoPostal(codigoPostal2);
			placa.setCapacidad(capacidad2);
			create(placa);
		} catch (Exception e) {
			System.out.println("Placa 2 exception: " + e.getMessage());			
		}
		
		placa = new Placa();
		
		try {	
			String placa3 = "Placa 3";
			double latitud3 = 43.02000;
			double longitud3 = -2.9022;			
			String codigoPostal3 = "3334";
			int capacidad3 = 340;
			placa.setLatitud(latitud3);
			placa.setLongitud(longitud3);
			placa.setCodigoPostal(codigoPostal3);
			placa.setCapacidad(capacidad3);
			//create(placa);
		} catch (Exception e) {
			System.out.println("Placa 3 exception: " + e.getMessage());			
		}
	}

	@Override
	public Placa create(Placa placa) {
		placa.setId(i);
		i++;
		placas.add(placa);
		return placa;
	}
	
	@Override
	public List<Placa> getAll() {
		return placas;
	}

	@Override
	public Placa getById(int identificador) {
		Placa placa = null;
		int posicion = -1;
		placa = placas.get(posicion);
		try {
			posicion =  buscarElemento(identificador);
		} catch (Exception e) {
			System.out.println("Create exception: " + e.getMessage());
			placa = new Placa();
		}
		return placa;
	}
	
	private int buscarElemento(int identificador) throws Exception {
		int i = 0, posicion = -1;
		boolean encontrado = false;

		while (encontrado == false && i < placas.size()) {
			Placa aux = placas.get(i);
			if (aux.getId() == identificador) {
				encontrado = true;
				posicion = i;
			}
			i++;
		}

		if (posicion == -1) {
			throw new Exception();
		}
		return posicion;
	}

	@Override
	public Placa update(Placa placa) {

		int posicion = -1;
		try {
			posicion = buscarElemento(placa.getId());
			placas.set(posicion, placa);
		} catch (Exception e) {
			System.out.println("Update exception: " + e.getMessage());
		}
		return placa;
	}

	@Override
	public void delete(int identificador) {

		int posicion = -1;
		try {
			posicion = buscarElemento(identificador);
			placas.remove(posicion);
		} catch (Exception e) {
			System.out.println("Delete exception: " + e.getMessage());
		}
			
		
	}

	@Override
	public void toGeoJSON(JSONObject placa) {
		// TODO Auto-generated method stub
		
	}

}
