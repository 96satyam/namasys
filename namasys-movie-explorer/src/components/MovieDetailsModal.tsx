import { useEffect, useState } from 'react';
import type { Movie, MovieDetails } from '../types/Movie';
import { fetchMovieDetails } from '../utils/api';
import { useWatchlist } from '../contexts/WatchlistContext';

interface MovieDetailsModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailsModal = ({ movie, isOpen, onClose }: MovieDetailsModalProps) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { watchlist, addToWatchlist } = useWatchlist();
  const inWatchlist = watchlist.some((m) => m.imdbID === movie.imdbID);

  useEffect(() => {
    if (isOpen && movie) {
      setLoading(true);
      setError(null);

      fetchMovieDetails(movie.imdbID)
        .then(setDetails)
        .catch((err) => {
          console.error('Error fetching movie details:', err);
          setError('Failed to load movie details');
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, movie]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeInScale">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/50">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {movie.Title}
              </h2>
              <div className="flex items-center space-x-4 text-blue-100">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {movie.Year}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {movie.Type || 'Movie'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 group"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-white group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
              </div>
              <p className="mt-6 text-lg font-semibold text-gray-700 dark:text-gray-300">Loading movie details...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center">
                <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Failed to load details</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {details && !loading && (
            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Poster */}
                <div className="lg:w-1/3">
                  <img
                    src={details.Poster !== 'N/A' ? details.Poster : 'https://via.placeholder.com/400x600/1f2937/ffffff?text=No+Poster'}
                    alt={details.Title}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>

                {/* Details */}
                <div className="lg:w-2/3 space-y-6">
                  {/* Plot */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Plot</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {details.Plot}
                    </p>
                  </div>

                  {/* Rating */}
                  {details.imdbRating && details.imdbRating !== 'N/A' && (
                    <div className="flex items-center space-x-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {details.imdbRating}/10
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            IMDb Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Movie Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Runtime</h4>
                        <p className="text-gray-700 dark:text-gray-300">{details.Runtime}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Genre</h4>
                        <p className="text-gray-700 dark:text-gray-300">{details.Genre}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Director</h4>
                        <p className="text-gray-700 dark:text-gray-300">{details.Director}</p>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Actors</h4>
                        <p className="text-gray-700 dark:text-gray-300">{details.Actors}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => addToWatchlist(movie)}
                    disabled={inWatchlist}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
                      inWatchlist
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {inWatchlist ? (
                      <span className="flex items-center justify-center">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Already in Watchlist
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add to Watchlist
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
