import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import { fetchMovies } from "./utils/api";
import { Movie } from "./types/Movie";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import WatchlistPanel from "./components/WatchlistPanel";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
  const load = async () => {
    try {
      setError("");
      setLoading(true);
      const results = await fetchMovies(debouncedQuery);
      setMovies(results);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (debouncedQuery) load();
  else setMovies([]);
}, [debouncedQuery]);


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
        <h1 className="text-2xl font-bold mb-4">🎬 Namasys Movie Explorer</h1>

        <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left Section: Search and Movie Results */}
        <div className="md:w-2/3">
          <SearchBar onSearch={setQuery} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>

        {/* Right Section: Watchlist */}
        <WatchlistPanel />
      </div>
    </div>
  );
}

export default App;
