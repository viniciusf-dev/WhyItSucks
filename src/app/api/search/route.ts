import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const uri = process.env.MONGODB_URI as string;
const dbName = "steamdb";
const collectionName = "games";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get("game")?.trim();
    const fetchReviews = searchParams.get("fetchReviews") === "true";
    if (!gameName) {
      return NextResponse.json({ error: "Missing 'game' parameter" }, { status: 400 });
    }
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const regex = new RegExp(gameName, "i");
    const partialMatchQuery = { name: { $regex: regex } };
    const games = await collection.find(partialMatchQuery).limit(10).toArray();
    await client.close();
    if (games.length === 0) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    const exactMatch = games.find((g) => g.name.toLowerCase() === gameName.toLowerCase());
    if (fetchReviews && exactMatch) {
      const appId = exactMatch.appid;
      const reviewUrl = `https://store.steampowered.com/appreviews/${appId}?json=1&review_type=negative&day_range=20`;
      let summary = null;
      try {
        const reviewResponse = await fetch(reviewUrl);
        if (reviewResponse.ok) {
          const reviewData = await reviewResponse.json();
          if (reviewData.reviews) {
            reviewData.reviews.forEach((r: any, index: number) => {
              console.log(`Review #${index + 1}:`);
              console.log(r.review);
              console.log("----------------------------------------");
            });
            const reviewsText = reviewData.reviews.map((r: any) => r.review).join("\n");
            const prompt = `Sintetize os principais tópicos dos seguintes reviews negativos do jogo ${exactMatch.name}: \n${reviewsText}`;
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            summary = result.response.text();
            console.log("Gemini API Response:", summary);
          }
        } else {
          console.error("Falha ao buscar reviews. Status:", reviewResponse.status);
        }
      } catch (err) {
        console.error("Erro ao buscar reviews:", err);
      }
      return NextResponse.json({ appid: exactMatch.appid, name: exactMatch.name, summary });
    }
    return NextResponse.json({
      results: games.map((game) => ({
        appid: game.appid,
        name: game.name,
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
