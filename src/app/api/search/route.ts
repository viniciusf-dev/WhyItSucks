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
            const prompt = `
            Analise os seguintes reviews negativos do jogo ${exactMatch.name}:

            ${reviewsText}

            Com base nesses reviews, por favor gere um resumo **exclusivamente** em formato JSON **válido** com a seguinte estrutura:

            {
              "problemSummary": "Breve resumo geral dos principais problemas reportados",
              "totalReviewsAnalyzed": 0,
              "problemCategories": [
                {
                  "name": "Bugs",
                  "percentage": 0,
                  "examples": ["exemplo de bug mencionado 1", "exemplo de bug mencionado 2"]
                },
                {
                  "name": "Performance",
                  "percentage": 0,
                  "examples": ["exemplo de problema de performance 1", "exemplo de problema de performance 2"]
                },
                {
                  "name": "Gameplay",
                  "percentage": 0,
                  "examples": ["exemplo de problema de gameplay 1", "exemplo de problema de gameplay 2"]
                },
                {
                  "name": "Design",
                  "percentage": 0,
                  "examples": ["exemplo de problema de design 1", "exemplo de problema de design 2"]
                },
                {
                  "name": "Story",
                  "percentage": 0,
                  "examples": ["exemplo de problema de história 1", "exemplo de problema de história 2"]
                },
                {
                  "name": "Outros",
                  "percentage": 0,
                  "examples": ["outro tipo de problema 1", "outro tipo de problema 2"]
                }
              ],
              "topComplaints": [
                {
                  "complaint": "Descrição do problema mais recorrente",
                  "mentions": 0,
                  "severity": "Alta/Média/Baixa"
                },
                {
                  "complaint": "Outro problema recorrente",
                  "mentions": 0,
                  "severity": "Alta/Média/Baixa"
                }
              ],
              "problemLevel": 0,
              "dealBreakers": ["Problema crítico que pode fazer jogadores desistirem completamente do jogo"],
              "positiveAspects": ["Aspectos positivos mencionados mesmo em reviews negativos"]
            }

            **Instruções importantes**:
            1. "problemSummary" deve ser um texto conciso (máximo 2 frases) resumindo os problemas mais frequentes.
            2. "totalReviewsAnalyzed" deve conter o número total de reviews analisados.
            3. "problemCategories" deve conter as categorias de problemas com:
              - Uma estimativa de porcentagem para cada uma, somando exatamente 100%.
              - 1-3 exemplos concretos extraídos dos reviews para cada categoria.
              - Use a categoria "Outros" para problemas que não se encaixam nas categorias principais.
            4. "topComplaints" deve listar as 3-5 principais reclamações específicas (não categorias), cada qual com:
              - O número de menções nos reviews.
              - Uma classificação de severidade baseada no tom e linguagem dos reviews.
            5. "problemLevel" é um número de 0 a 100 indicando a gravidade geral dos problemas, calculado considerando:
              - Frequência das reclamações (quantos reviews mencionam)
              - Severidade dos problemas (impacto na experiência de jogo)
              - Tom emocional dos reviews (frustração, raiva, decepção)
            6. "dealBreakers" deve listar problemas críticos que podem fazer jogadores abandonarem o jogo completamente.
            7. "positiveAspects" deve capturar quaisquer aspectos positivos mencionados mesmo em reviews negativos.

            Se não houver reviews para analisar, retorne um JSON com valores padrão zeros e arrays vazios, com "problemSummary" indicando "Sem reviews disponíveis para análise".

            Responda **somente** com o JSON válido, sem texto adicional ou explicações fora do objeto JSON.
            `;
            
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
