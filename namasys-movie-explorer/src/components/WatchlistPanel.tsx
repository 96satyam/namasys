import { useState } from 'react';
import { useWatchlist } from "../contexts/WatchlistContext";

const WatchlistPanel = () => {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearWatchlist = () => {
    clearWatchlist();
    setShowConfirmClear(false);
  };

  return (
    <aside className="mt-8 lg:mt-0 w-full lg:w-1/3 animate-slideInLeft">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl sticky top-8 overflow-hidden border border-white/20 dark:border-gray-700/50">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl" role="img" aria-label="Watchlist icon">🎬</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  My Watchlist
                </h2>
                <p className="text-purple-100">
                  {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
                </p>
              </div>
            </div>

            {watchlist.length > 0 && (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 group"
                aria-label="Clear watchlist"
              >
                <svg className="w-5 h-5 text-white group-hover:text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[500px] overflow-y-auto">
          {watchlist.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-3xl flex items-center justify-center">
                <span className="text-4xl" role="img" aria-label="Empty watchlist">🍿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Your watchlist is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Start building your personal movie collection by searching and adding films you want to watch.
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {watchlist.map((movie, index) => (
                <div
                  key={movie.imdbID}
                  className="group relative bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-600"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    {/* Movie Poster */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/60x90/1f2937/ffffff?text=No+Poster"}
                        alt={`${movie.Title} poster`}
                        className="w-14 h-20 object-cover rounded-xl shadow-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/60x90/1f2937/ffffff?text=No+Poster";
                        }}
                        loading="lazy"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {movie.Title}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {movie.Year}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                          {movie.Type || 'Movie'}
                        </span>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWatchlist(movie.imdbID)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                      aria-label={`Remove ${movie.Title} from watchlist`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear confirmation modal */}
        {showConfirmClear && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 rounded-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Clear Watchlist?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This will permanently remove all {watchlist.length} movies from your watchlist.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleClearWatchlist}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default WatchlistPanel;
