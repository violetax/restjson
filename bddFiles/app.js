var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost:27017/panelesBoroa', function(err, res) {
  if(err) throw err;
  console.log('Connected to boroa Database');
});

/*
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/panelesBoroa";

// MongoClient.connect(url, function(err, db) { if (err) throw err; console.log("Boroa database connected!"); db.close(); }); 

MongoClient.connect('mongodb://localhost/panelesBoroa', function(err, db){
  if(err)
  console.log(err);
    else{
	console.log("Connected to MongoDB");
    mongoDbObj={db: db, paneles: db.collection('paneles') };
	}
var allProductsArray = mongoDbObj.paneles.find().toArray();
	mongoDbObj.paneles.find().toArray(function(err, data){
		if(err)
			console.log(err);
		else {
	//    	console.log(data);
//			console.log(data.length);
			}
})
//	db.close();
});
*/


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/panelesModel')(app, mongoose);
var panelesCtrl = require('./controllers/panelesController');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello boot!");
});
app.use(router);

// API routes
var paneles = express.Router();

paneles.route('/paneles')
  .get(panelesCtrl.findAllPaneles)
  .post(panelesCtrl.addPaneles);

paneles.route('/paneles/:id')
  .get(panelesCtrl.findById)
  .put(panelesCtrl.updatePaneles)
  .delete(panelesCtrl.deletePaneles);

app.use('/api', paneles);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
