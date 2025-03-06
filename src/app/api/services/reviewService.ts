export async function fetchSteamReviews(appId: string | number) {
    const reviewUrl = `https://store.steampowered.com/appreviews/${appId}?json=1&review_type=negative&day_range=20`;
  
    try {
      const reviewResponse = await fetch(reviewUrl);
  
      if (!reviewResponse.ok) {
        console.error("Falha ao buscar reviews. Status:", reviewResponse.status);
        return null;
      }
  
      const reviewData = await reviewResponse.json();
      return reviewData;
    } catch (error) {
      console.error("Erro ao buscar reviews da Steam:", error);
      return null;
    }
  }
  