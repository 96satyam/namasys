import { Movie } from "../types/Movie";
import { useWatchlist } from "../contexts/WatchlistContext";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { watchlist, addToWatchlist } = useWatchlist();
  const inWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2 text-center">
        {movie.Title} ({movie.Year})
      </h2>
      <button
        className={`mt-3 px-4 py-2 text-sm rounded ${
          inWatchlist ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        onClick={() => addToWatchlist(movie)}
        disabled={inWatchlist}
      >
        {inWatchlist ? "✔ In Watchlist" : "+ Add to Watchlist"}
      </button>
    </div>
  );
};

export default MovieCard;
