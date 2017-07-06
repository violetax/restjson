package dbms.pojo;

public class Placa {

	private int id;
	private double latitud;
	private double longitud;
	private String codigoPostal;
	private int capacidad;
	
	
	public Placa() {
		super();
	}

	public Placa(int id, double latitud, double longitud, String codigoPostal, String marca, int capacidad) {
		super();
		this.id = id;
		this.latitud = latitud;
		this.longitud = longitud;
		this.codigoPostal = codigoPostal;
		this.capacidad = capacidad;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public double getLatitud() {
		return latitud;
	}


	public void setLatitud(double latitud) {
		this.latitud = latitud;
	}


	public double getLongitud() {
		return longitud;
	}


	public void setLongitud(double longitud) {
		this.longitud = longitud;
	}


	public String getCodigoPostal() {
		return codigoPostal;
	}

	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}

	public int getCapacidad() {
		return capacidad;
	}

	public void setCapacidad(int capacidad) {
		this.capacidad = capacidad;
	}
	
	@Override
	public String toString() {
		 return new StringBuffer("Coordenadas: ")
				 .append(this.latitud)
				 .append(this.longitud)
				 .append(this.codigoPostal)
				 .append(this.capacidad).toString();
	}
	
/*
	@Override
	public String toString() {
	    try {
	        return new com.fasterxml.jackson.databind.ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(this);
	    } catch (com.fasterxml.jackson.core.JsonProcessingException e) {
	        e.printStackTrace();
	    }
	    return null;
	}
*/		

}