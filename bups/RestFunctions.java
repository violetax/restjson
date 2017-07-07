package aRESTJSON;

import java.util.List;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

import org.json.JSONArray;
import org.json.JSONObject;

import dbms.persistence.Placa;
import service.PlacaServiceImpGJ;
import service.interfaces.PlacaServiceGJ;

import javax.ws.rs.Produces;


@Path("/")
public class RestFunctions {
	
	PlacaService placaService = new PlacaServiceImp();
	
//////////////********* TODOS LOS PUNTOS: de bdd a map ***********////////////////////
//DEVOLVER todos los puntos en la BDD
	//getAll
	
//plan: 

//1.	"connect to bdd" via rest y recoger un json con:
	// a/ todos los puntos
	// b/ todos los puntos de acuerdo con condicion
	
//2.	convertir el json en Placa Object y operar con el con el Service
//3.	devolver String con forma json con los datos requeridos 
	
	
	

	
	// A/ sacar los puntos de mi service
	 @POST
	  @Path("/cargartodos")
	  @Produces(MediaType.APPLICATION_JSON)
	  public String cargartodos()  {
		
		List<Placa> placas = placaService.getAll();
		
		JSONObject jobject;	
		JSONArray jarray = new JSONArray();
		
		for (int i=0; i < placas.size(); i++) {
			
			jobject = new JSONObject();	
			
			//jobject.put("type", placas.get(i).getId());
			//...
			
			jobject.put("Id", placas.get(i).getId());
			jobject.put("Latitud", placas.get(i).getLatitud());
			jobject.put("Longitud", placas.get(i).getLongitud());
			jobject.put("Codigo Postal", placas.get(i).getCodigoPostal());
			jobject.put("Capacidad", placas.get(i).getCapacidad());
			
			jarray.put(jobject);

		}
		
		String ret = jarray.toString();
		
		 return ret;
	 
	 }

////////////////////////////////////////////////////////////
	 
	// B/ sacar los puntos de mi REST Client...
		 @POST
		  @Path("/cargarTodosDesdeBDD")
		  @Produces(MediaType.APPLICATION_JSON)
		  public String cargarTodosDesdeBDD()  {
			
			List<Placa> placas = placaService.getAll();
			
			JSONObject jobject;	
			JSONArray jarray = new JSONArray();
			
			for (int i=0; i < placas.size(); i++) {
				
				jobject = new JSONObject();	
				
				//jobject.put("type", placas.get(i).getId());
				//...
				
				jobject.put("Id", placas.get(i).getId());
				jobject.put("Latitud", placas.get(i).getLatitud());
				jobject.put("Longitud", placas.get(i).getLongitud());
				jobject.put("Codigo Postal", placas.get(i).getCodigoPostal());
				jobject.put("Capacidad", placas.get(i).getCapacidad());
				
				jarray.put(jobject);

			}
			
			String ret = jarray.toString();
			
			 return ret;
		 
		 }
	 
/////////****************** - TO DO - *******************////////
	 
	 
//////////////********* UN PUNTO: de map a bdd ***********////////////////////
//RECOGER form info con las coord de un punto y MANDAR un json a la BDD
	 //create

//plan: 

//1.	se recogen los datos de un form
//2.	conectar con bdd y enviar el json
	 

/////////////////////////////////////////////////////////////////////
	 
//////////////********* UN MARCADOR: de map a bdd a map ***********////////////////////
//DEVOLVER un punto en la BDD
	 //getById
	 //update
	 //delete

//plan: 

//1.	se recoge un id
//2.	connect to bdd via rest y recoger un json ById
//3.	convertir el json en Placa Object y operar con el con el Service
//4.	devolver String con forma json con los datos requeridos, incluido sobreescribir o anular el punto

/////////////////////////////////////////////////////////////////////

	 
//////////////********* de map a app a map ***********////////////////////
//RECOGER puntos para operar con ellos y devolver json con info de placas reales o no
	 //model
	 
	//plan: 

	//1.	recoger un json con coordenadas

	 //	a.	comparar los valores con las coordenadas de las placas y ...:
	 	//		clasificar...
	 	//		...
	// ...
	 
	 @POST
	  @Path("/registrarpuntos")
	  @Produces(MediaType.APPLICATION_JSON)
	  public String registrarpuntos(final String variosPuntos)  {
		
	/*
		do somethibg with variosPuntos...
	*/		
		 return variosPuntos;
	 
	 }
/////////////////////////////////////////////////////////////////////
	 

//////////////********* VARIOS ***********////////////////////
// FINDS, FINDS BY ...

/////////////////////////////////////////////////////////////////////

	
}
