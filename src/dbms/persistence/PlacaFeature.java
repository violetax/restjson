package dbms.persistence;

import java.util.Map;

public class PlacaFeature {

		private final String type = "Feature";
		private Map<String, String> properties;
		private double latitud;
		private double longitud;
		

		public PlacaFeature() {
		}

		public PlacaFeature(double latitud, double longitud) {
			this.latitud = latitud;
			this.longitud = longitud;
		}

		public String getType() {
			return type;
		}

		public  Map<String, String> getProperties() {
			return  properties;
		}

		public void setProperties(Map<String, String> properties) {
			this.properties = properties;
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
		
		
	}