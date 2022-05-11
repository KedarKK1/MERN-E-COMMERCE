const mongoose = require('mongoose');

const dbConnect = () =>{
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://admin:admin@cluster0.cz97f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
}
