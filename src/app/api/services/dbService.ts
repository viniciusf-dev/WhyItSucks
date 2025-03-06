import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = "steamdb";
const collectionName = "games";

let cachedClient: MongoClient | null = null;

async function connectToDB() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }
  return cachedClient.db(dbName);
}

export async function getGamesByName(gameName: string, limit = 10) {
  try {
    const db = await connectToDB();
    const collection = db.collection(collectionName);
    const regex = new RegExp(gameName, "i");
    return await collection.find({ name: { $regex: regex } }).limit(limit).toArray();
  } catch (error) {
    console.error("Erro ao buscar jogos no MongoDB:", error);
    throw error; 
  }
}
