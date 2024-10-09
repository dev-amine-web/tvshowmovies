import { FetchMediaParams, MediaApiResponse, MediaType } from "../types";
//call to retrieve the list of movies or series without search
export const fetchMedias = async ({ pageParam = 1, selectedType }: FetchMediaParams): Promise<MediaApiResponse> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/3/discover/${selectedType === MediaType.Movie ? "movie" : "tv"}?api_key=${process.env.REACT_APP_API_KEY}&page=${pageParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return await response.json();
  };
  
//call to retrieve the list of movies or series with search
export  const searchMedias = async ({ pageParam = 1, searchByTitle, selectedType }: FetchMediaParams): Promise<MediaApiResponse> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/3/search/${selectedType === MediaType.Movie ? "movie" : "tv"}?query=${searchByTitle}&api_key=${process.env.REACT_APP_API_KEY}&page=${pageParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  };