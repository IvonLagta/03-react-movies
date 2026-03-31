import axios from "axios";
import { Movie } from "../../src/types/movie.ts";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<TMDBSearchResponse>(
    `${BASE_URL}/search/movie`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
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
