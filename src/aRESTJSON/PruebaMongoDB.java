package aRESTJSON;


	import java.net.UnknownHostException;
	import java.util.HashMap;
	import java.util.Map;

import org.bson.Document;

import com.mongodb.BasicDBObject;
	import com.mongodb.BasicDBObjectBuilder;
	import com.mongodb.DB;
	import com.mongodb.DBCollection;
	import com.mongodb.DBCursor;
	import com.mongodb.DBObject;
	import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.util.JSON;

// ************** PENDIENTE

	/**
	 * Java MongoDB : Insert a Document
	 *
	 */
	public class PruebaMongoDB {
	  public static void main(String[] args) {
		  System.out.println("JSON parse example PENDIENTE");
	  }
		  /*
	//    try {

	    MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
	    MongoDatabase db = mongoClient.getDatabase( "mydb" );

		MongoCollection<Document> collection = db.getCollection("dummyColl");

		// 4. JSON parse example
		System.out.println("JSON parse example...");

		String json = "{'database' : 'mkyongDB','table' : 'hosting'," +
		  "'detail' : {'records' : 99, 'index' : 'vps_index1', 'active' : 'true'}}}";

		DBObject dbObject = (DBObject)JSON.parse(json);

		collection.insert(dbObject);

		DBCursor cursorDocJSON = collection.find();
		while (cursorDocJSON.hasNext()) {
			System.out.println(cursorDocJSON.next());
		}

		collection.remove(new BasicDBObject());

			}  catch (MongoException e) {
				e.printStackTrace();
			}
	  }
	  
	  */
	}
	