import { GoogleGenerativeAI } from "@google/generative-ai";

export async function summarizeReviews(reviews: any[], gameName: string): Promise<string | null> {
  if (!reviews || reviews.length === 0) {
    return `{
      "problemSummary": "Sem reviews disponíveis para análise",
      "totalReviewsAnalyzed": 0,
      "problemCategories": [
        {
          "name": "Bugs",
          "percentage": 0,
          "examples": []
        },
        {
          "name": "Performance",
          "percentage": 0,
          "examples": []
        },
        {
          "name": "Gameplay",
          "percentage": 0,
          "examples": []
        },
        {
          "name": "Design",
          "percentage": 0,
          "examples": []
        },
        {
          "name": "Story",
          "percentage": 0,
          "examples": []
        },
        {
          "name": "Outros",
          "percentage": 0,
          "examples": []
        }
      ],
      "topComplaints": [],
      "problemLevel": 0,
      "dealBreakers": [],
      "positiveAspects": []
    }`;
  }

  const reviewsText = reviews.map((r) => r.review).join("\n");

  const prompt = `
  Analise os seguintes reviews negativos do jogo ${gameName}:

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

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    
    const summary = result.response.text();
    return summary;
  } catch (error) {
    console.error("Erro ao chamar Google Generative AI:", error);
    return null;
  }
}
