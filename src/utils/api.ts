import { Movie } from "../types/Movie";

const API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=a46064b9"; // For now use "" (free 1,000 calls/day)

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) return [];

  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=1`);
  const data = await response.json();

  return data.Search?.slice(0, 10) || [];
};
