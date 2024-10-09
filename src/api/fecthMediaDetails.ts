import { MediaDetails, MediaType } from "../types";
//call fetch to retrieve the details for movie or TvShow
export const fetchMedia = async (id: number,selectedType: MediaType): Promise<MediaDetails> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/3/${selectedType === MediaType.Movie ? "movie" : "tv"}/${id}?api_key=${process.env.REACT_APP_API_KEY}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      return await response.json();
};