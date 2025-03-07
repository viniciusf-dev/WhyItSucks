export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { getGamesByName } from "../services/dbService";
import { fetchSteamReviews } from "../services/reviewService";
import { summarizeReviews } from "../services/aiService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get("game")?.trim();
    const fetchReviewsFlag = searchParams.get("fetchReviews") === "true";

    if (!gameName) {
      return NextResponse.json({ error: "Missing 'game' parameter" }, { status: 400 });
    }

    const games = await getGamesByName(gameName, 10);
    if (games.length === 0) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const exactMatch = games.find(
      (g) => g.name.toLowerCase() === gameName.toLowerCase()
    );

    if (fetchReviewsFlag && exactMatch) {
      const appId = exactMatch.appid;
      const reviewData = await fetchSteamReviews(appId);

      let summary: string | null = null;
      if (reviewData?.reviews) {
        reviewData.reviews.forEach((r: any, index: number) => {
          console.log(`Review #${index + 1}:`);
          console.log(r.review);
          console.log("----------------------------------------");
        });

        summary = await summarizeReviews(reviewData.reviews, exactMatch.name);
        console.log("Gemini API Response:", summary);
      }

      return NextResponse.json({
        appid: exactMatch.appid,
        name: exactMatch.name,
        summary,
      });
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
