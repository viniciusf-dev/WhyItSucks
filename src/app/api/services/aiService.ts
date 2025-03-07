import { GoogleGenerativeAI } from "@google/generative-ai";

export async function summarizeReviews(reviews: any[], gameName: string): Promise<string | null> {
  if (!reviews || reviews.length === 0) {
    return `{
      "problemSummary": "No reviews were found for analysis",
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
  Analyze the following negative reviews for the game ${gameName}:

  ${reviewsText}

  Based on these reviews, please generate a summary **exclusively** in **valid** JSON format with the following structure:

  {
    "problemSummary": "A comprehensive yet concise analysis of the major issues reported by players, identifying patterns across the reviews and highlighting the most significant problems that affect the player experience. This summary should provide enough context to understand the overall sentiment and primary pain points without requiring reading all individual reviews. It should be roughly 3-5 sentences that effectively communicate the essence of player complaints.",
    "totalReviewsAnalyzed": 0,
    "problemCategories": [
      {
        "name": "Bugs",
        "percentage": 0,
        "examples": ["example of mentioned bug 1", "example of mentioned bug 2"]
      },
      {
        "name": "Performance",
        "percentage": 0,
        "examples": ["example of performance issue 1", "example of performance issue 2"]
      },
      {
        "name": "Gameplay",
        "percentage": 0,
        "examples": ["example of gameplay issue 1", "example of gameplay issue 2"]
      },
      {
        "name": "Design",
        "percentage": 0,
        "examples": ["example of design issue 1", "example of design issue 2"]
      },
      {
        "name": "Story",
        "percentage": 0,
        "examples": ["example of story issue 1", "example of story issue 2"]
      },
      {
        "name": "Other",
        "percentage": 0,
        "examples": ["other type of issue 1", "other type of issue 2"]
      }
    ],
    "topComplaints": [
      {
        "complaint": "Description of the most recurring problem",
        "mentions": 0,
        "severity": "High/Medium/Low"
      },
      {
        "complaint": "Another recurring problem",
        "mentions": 0,
        "severity": "High/Medium/Low"
      }
    ],
    "problemLevel": 0,
    "dealBreakers": ["Critical issue that may cause players to completely abandon the game"]
  }

  **Important instructions**:
  1. "problemSummary" should be a comprehensive analysis (3-5 sentences) that captures the essence of player complaints and their impact on the overall experience.
  2. "totalReviewsAnalyzed" should contain the total number of reviews analyzed.
  3. "problemCategories" should contain problem categories with:
    - An estimated percentage for each, totaling exactly 100%.
    - 1-3 concrete examples extracted from the reviews for each category.
    - Use the "Other" category for problems that don't fit into the main categories.
  4. "topComplaints" should list the 3-5 main specific complaints (not categories), each with:
    - The number of mentions in the reviews.
    - A severity classification based on the tone and language of the reviews.
  5. "problemLevel" is a number from 0 to 100 indicating the overall severity of the problems, calculated considering:
    - Frequency of complaints (how many reviews mention them)
    - Severity of problems (impact on game experience)
    - Emotional tone of reviews (frustration, anger, disappointment)
  6. "problemLevelText" should be a text description of the problem severity based on the problemLevel value:
    - "Mild Issues" if problemLevel < 30
    - "Concerning" if problemLevel < 60
    - "Major Problems" if problemLevel < 80
    - "Virtually Unplayable" if problemLevel >= 80
  7. "dealBreakers" should list critical problems that may cause players to completely abandon the game.
  8. "positiveAspects" should capture any positive aspects mentioned even in negative reviews.

  If there are no reviews to analyze, return a JSON with default zero values and empty arrays, with "problemSummary" indicating "No reviews available for analysis."

  Respond **only** with the valid JSON, without additional text or explanations outside the JSON object.
  - No backticks, no \`\`\`json or any markdown formatting.
  `;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    
    const summary = result.response.text();
    return summary;
  } catch (error) {
    console.error("Failed to call AI API:", error);
    return null;
  }
}
