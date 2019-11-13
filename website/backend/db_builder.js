var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

var dbCollection = "profils";

const fs = require("fs");

let rawdata = fs.readFileSync(
  "../database/indicateur_lycee_genereale_et_technologique.json"
);

console.log("DATAFILE : ", rawdata);

var data = JSON.parse(rawdata); //

var client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");

  //deltete data
  dbo.collection(dbCollection).deleteMany({}, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
  });

  // insert several documents
  dbo.collection(dbCollection).insertMany(data, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted : " + res.insertedCount);
    db.close();
  });

  console.log("Data successfully added");
});
