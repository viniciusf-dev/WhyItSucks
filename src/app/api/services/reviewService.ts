export async function fetchSteamReviews(appId: string | number) {
    const reviewUrl = `https://store.steampowered.com/appreviews/${appId}?json=1&review_type=negative&day_range=20`;
  
    try {
      const reviewResponse = await fetch(reviewUrl);
  
      if (!reviewResponse.ok) {
        console.error("Failed to fetch reviews. Status:", reviewResponse.status);
        return null;
      }
  
      const reviewData = await reviewResponse.json();
      return reviewData;
    } catch (error) {
      console.error("Failed to fetch steam reviews:", error);
      return null;
    }
  }
  