import axios, { AxiosResponse } from "axios";
import { Movie } from "../../src/types/movie.ts";

// const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response: AxiosResponse<TMDBSearchResponse> = await axios.get(
    `${BASE_URL}/search/movie`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
      params: {
        query: query,
        language: "en-US",
        include_adult: false,
      },
    },
  );

  return response.data.results;
};
