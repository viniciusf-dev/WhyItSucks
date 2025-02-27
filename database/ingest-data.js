const axios = require('axios');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; 
const dbName = "steamdb";
const collectionName = "games";

async function importSteamGames() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Conectado ao MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log("Buscando lista de jogos...");
    const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
    const games = response.data.applist.apps;
    console.log(`Total de jogos: ${games.length}`);

    console.log("Criando índices...");
    await collection.createIndex({ appid: 1 }, { unique: true });
    await collection.createIndex({ name: "text" });
    await collection.createIndex({ name: 1 });

    const batchSize = 5000;
    const batchPromises = [];

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
        collection.bulkWrite(operations).then(() => {
          console.log(`Processados ${Math.min(i + batchSize, games.length)} de ${games.length} jogos`);
        })
      );
    }

    await Promise.all(batchPromises);

    console.log("Importação concluída com sucesso");

  } catch (error) {
    console.error("Erro:", error);
  } finally {
    await client.close();
  }
}

importSteamGames();
