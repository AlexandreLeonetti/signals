
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise ;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
    client = new MongoClient(uri, options);
   clientPromise = client.connect();
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.




//ok
export default async (req, res) => {
       try {
                  const client = await clientPromise;
                  const db = client.db("trading");

                  const movies = await db
                      .collection("priceTest")
                      .find({})
                      .sort({ _id: -1 })
                      .limit(100)
                      .toArray();

                  res.json(movies);
              } catch (e) {
                         console.error(e);
                     }
};
