const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');
const { MongoClient } = require('mongodb');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface SteamGame {
  appid: number;
  name: string;
  [key: string]: any;
}

interface BulkWriteResult {
  insertedCount: number;
  matchedCount: number;
  modifiedCount: number;
  deletedCount: number;
  upsertedCount: number;
  upsertedIds: { [key: number]: any };
}

const uri: string = process.env.MONGODB_URI || '';
const dbName: string = "steamdb";
const collectionName: string = "games";

if (!uri) {
  console.error("MONGODB_URI is not defined!");
  process.exit(1);
}

async function importSteamGames(): Promise<void> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connecting to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log("Fetching game list...");
    const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
    const games: SteamGame[] = response.data.applist.apps;
    console.log(`Total games: ${games.length}`);

    console.log("Creating indexes...");
    await collection.createIndex({ appid: 1 }, { unique: true });
    await collection.createIndex({ name: "text" });
    await collection.createIndex({ name: 1 });

    const batchSize: number = 5000;
    const batchPromises: Promise<any>[] = [];

    let totalUpdated = 0;
    let totalCreated = 0;

    for (let i = 0; i < games.length; i += batchSize) {
      const batch = games.slice(i, i + batchSize);
      const operations = batch.map(game => ({
        updateOne: {
          filter: { appid: game.appid },
          update: { $set: game },
          upsert: true,
        },
      }));

      batchPromises.push(
        collection.bulkWrite(operations).then((result: BulkWriteResult) => {
          const batchNumber = Math.floor(i / batchSize) + 1;
          const totalBatches = Math.ceil(games.length / batchSize);
          const batchStart = i + 1;
          const batchEnd = Math.min(i + batchSize, games.length);
          
          const updated = result.modifiedCount;
          const created = result.upsertedCount;
          
          totalUpdated += updated;
          totalCreated += created;
          
          console.log(`=== Batch ${batchNumber}/${totalBatches} (Games ${batchStart}-${batchEnd} of ${games.length}) ===`);
          console.log(`- Updated games: ${updated}`);
          console.log(`- New indexed games: ${created}`);
          console.log(`- Total processed games: ${updated + created}`);
        })
      );
    }

    await Promise.all(batchPromises);

    console.log("\n=== Update summary ===");
    console.log(`Total processed games: ${games.length}`);
    console.log(`Total updated games: ${totalUpdated}`);
    console.log(`Total created games: ${totalCreated}`);
    console.log("Import done.");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

importSteamGames();