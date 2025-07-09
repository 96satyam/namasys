import { useWatchlist } from "../contexts/WatchlistContext";

const WatchlistPanel = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="mt-8 md:mt-0 md:ml-8 w-full md:w-1/3">
      <h2 className="text-xl font-bold mb-2">🎥 Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-500">No movies added.</p>
      ) : (
        <ul className="space-y-3">
          {watchlist.map((movie) => (
            <li key={movie.imdbID} className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-3 rounded">
              <span>{movie.Title} ({movie.Year})</span>
              <button
                onClick={() => removeFromWatchlist(movie.imdbID)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WatchlistPanel;
