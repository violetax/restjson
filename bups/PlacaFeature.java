package dbms.persistence;

//https://github.com/MPriess/GeoJSON-POJO

	import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
	import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
	import java.io.Serializable;
	import java.util.Map;
	import org.geojson.geometry.Geometry;
	import org.geojson.util.FeaturePropertiesDeserializer;

	@JsonIgnoreProperties(ignoreUnknown = true)
	public class PlacaFeature {

		private final String type = "Feature";
		@JsonDeserialize(keyAs = String.class, contentAs = Serializable.class, contentUsing = FeaturePropertiesDeserializer.class)
		private Map<String, Serializable> properties;
		private Geometry geometry;

		public PlacaFeature() {
		}

		public PlacaFeature(Geometry geometry) {
			this.geometry = geometry;
		}

		public String getType() {
			return type;
		}

		public Geometry getGeometry() {
			return geometry;
		}

		public void setGeometry(Geometry geometry) {
			this.geometry = geometry;
		}

		public  Map<String, Serializable> getProperties() {
			return  properties;
		}

		public void setProperties(Map<String, Serializable> properties) {
			this.properties = properties;
		}
	}