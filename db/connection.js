import { Int32, MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  pkFactory: { createPk: () => new Int32() },
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("acm-cbs").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("acm-cbs");

export default db;