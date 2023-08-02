const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://alswnsDev:mongo12@cluster0.8na7xk5.mongodb.net/firstDatabase?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const adminDB = client.db('test').admin();
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);

    // Send a ping to confirm a successful connection
    await client.db("test").collection("devices");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    return "OK";
}
run()
.then(console.log)
.catch(console.dir)
.finally(()=>client.close());
