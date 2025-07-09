import type { Movie, MovieDetails } from "../types/Movie";

const API_KEY = "a46064b9"; // Free API key for demo purposes
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=1`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "True") {
      return data.Search?.slice(0, 12) || [];
    } else {
      console.warn("API Error:", data.Error);
      return [];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  if (!imdbID) {
    throw new Error("IMDb ID is required");
  }

  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error || "Failed to fetch movie details");
    }
  } catch (error) {
    console.error("Fetch movie details error:", error);
    throw error;
  }
};
