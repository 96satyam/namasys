import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import { fetchMovies, fetchMovieDetails } from "./utils/api";
import type { Movie, MovieDetails } from "./types/Movie";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  // Load watchlist and dark mode from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save watchlist and dark mode to localStorage when they change
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch movies when search query changes
  useEffect(() => {
    const searchMovies = async () => {
      if (!debouncedQuery.trim()) {
        setMovies([]);
        return;
      }

      setLoading(true);
      try {
        const results = await fetchMovies(debouncedQuery);
        setMovies(results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [debouncedQuery]);

  const addToWatchlist = (movie: Movie) => {
    if (!watchlist.find(m => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter(movie => movie.imdbID !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMovieClick = async (movie: Movie) => {
    setLoadingDetails(true);
    try {
      const details = await fetchMovieDetails(movie.imdbID);
      setSelectedMovie(details);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      // Show basic movie info if details fetch fails
      setSelectedMovie({
        ...movie,
        Plot: "Plot information not available.",
        Director: "N/A",
        Writer: "N/A",
        Actors: "N/A",
        Genre: "N/A",
        Runtime: "N/A",
        imdbRating: "N/A",
        imdbVotes: "N/A",
        Rated: "N/A",
        Released: "N/A",
        Country: "N/A",
        Language: "N/A",
        Awards: "N/A"
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Fixed Header with Search Bar */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: darkMode ? '#1f2937' : '#2563eb',
        color: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        padding: '1.5rem 0'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Centered Title and Watchlist Info */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              display: 'block',
              lineHeight: '1.2'
            }}>
              🎬 Movie Explorer
            </h1>
            <div style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#ffffff',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              display: 'block'
            }}>
              Watchlist: {watchlist.length} movies
            </div>
          </div>

          {/* Dark Mode Toggle - Positioned absolutely */}
          <button
            onClick={toggleDarkMode}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1.5rem',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Static Search Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <div style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              zIndex: 10
            }}>
              <svg style={{ width: '20px', height: '20px', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, TV shows, actors..."
              style={{
                width: '100%',
                paddingLeft: '3rem',
                paddingRight: '1.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
                fontSize: '1rem',
                fontWeight: '500',
                borderRadius: '0.75rem',
                border: '2px solid #e5e7eb',
                backgroundColor: '#ffffff',
                color: '#1f2937',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
            />
            {loading && (
              <div style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)'
              }}>
                <div className="animate-spin rounded-full border-b-2 border-blue-600" style={{ width: '20px', height: '20px' }}></div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        paddingTop: '200px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          {/* Search Results */}
          <div>

            {/* Results */}
            <div>
              {loading && (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <div className={`animate-spin rounded-full border-b-2 ${darkMode ? 'border-white' : 'border-blue-600'}`} style={{
                    width: '48px',
                    height: '48px',
                    margin: '0 auto'
                  }}></div>
                  <p style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                    color: darkMode ? '#ffffff' : '#6b7280'
                  }}>
                    Searching movies...
                  </p>
                </div>
              )}

              {!loading && movies.length === 0 && query && (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <p style={{ color: darkMode ? '#ffffff' : '#6b7280' }}>
                    No movies found for "{query}"
                  </p>
                </div>
              )}

              {!loading && movies.length === 0 && !query && (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <p style={{ color: darkMode ? '#ffffff' : '#6b7280' }}>
                    Start typing to search for movies...
                  </p>
                </div>
              )}

              {movies.length > 0 && (
                <div>
                  <h3 style={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '2rem',
                    color: darkMode ? '#ffffff' : '#1f2937'
                  }}>
                    Found {movies.length} movies
                  </h3>

                  {/* 5 Movies per row grid */}
                  <div className="movie-grid" style={{
                    maxWidth: '100%',
                    width: '100%'
                  }}>
                    {movies.map((movie) => (
                      <div key={movie.imdbID} style={{
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden',
                        transition: 'box-shadow 0.3s ease',
                        width: '100%',
                        maxWidth: '250px',
                        margin: '0 auto'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                      }}>
                        <img
                          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450/cccccc/666666?text=No+Image"}
                          alt={movie.Title}
                          style={{
                            width: '100%',
                            height: '300px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease'
                          }}
                          onClick={() => handleMovieClick(movie)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/300x450/cccccc/666666?text=No+Image";
                          }}
                          title="Click to view details"
                        />
                        <div style={{ padding: '1rem' }}>
                          <h4 style={{
                            fontWeight: '600',
                            fontSize: '1rem',
                            marginBottom: '0.5rem',
                            color: darkMode ? '#ffffff' : '#1f2937',
                            lineHeight: '1.2',
                            height: '2.4rem',
                            overflow: 'hidden'
                          }}>
                            {movie.Title}
                          </h4>
                          <p style={{
                            fontSize: '0.875rem',
                            marginBottom: '0.75rem',
                            color: darkMode ? '#d1d5db' : '#6b7280'
                          }}>
                            {movie.Year} • {movie.Type || 'Movie'}
                          </p>
                          <button
                            onClick={() => addToWatchlist(movie)}
                            disabled={watchlist.some(m => m.imdbID === movie.imdbID)}
                            style={{
                              width: '100%',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              border: 'none',
                              cursor: watchlist.some(m => m.imdbID === movie.imdbID) ? 'not-allowed' : 'pointer',
                              backgroundColor: watchlist.some(m => m.imdbID === movie.imdbID)
                                ? (darkMode ? '#4b5563' : '#d1d5db')
                                : (darkMode ? '#1d4ed8' : '#2563eb'),
                              color: watchlist.some(m => m.imdbID === movie.imdbID)
                                ? (darkMode ? '#9ca3af' : '#6b7280')
                                : '#ffffff',
                              transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              if (!watchlist.some(m => m.imdbID === movie.imdbID)) {
                                e.currentTarget.style.backgroundColor = darkMode ? '#1e40af' : '#1d4ed8';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!watchlist.some(m => m.imdbID === movie.imdbID)) {
                                e.currentTarget.style.backgroundColor = darkMode ? '#1d4ed8' : '#2563eb';
                              }
                            }}
                          >
                            {watchlist.some(m => m.imdbID === movie.imdbID) ? '✓ Added' : '+ Add to Watchlist'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Watchlist Section */}
          <div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              <h3 style={{
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '2rem',
                color: darkMode ? '#ffffff' : '#1f2937'
              }}>
                My Watchlist ({watchlist.length})
              </h3>

              {watchlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍿</div>
                  <p style={{ color: darkMode ? '#d1d5db' : '#6b7280' }}>
                    No movies in your watchlist yet.
                  </p>
                </div>
              ) : (
                <div className="watchlist-grid" style={{
                  maxWidth: '100%',
                  width: '100%',
                  maxHeight: '500px',
                  overflowY: 'auto'
                }}>
                  {watchlist.map((movie) => (
                    <div key={movie.imdbID} style={{
                      backgroundColor: darkMode ? '#374151' : '#f9fafb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      maxWidth: '200px',
                      margin: '0 auto',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}>
                      {/* Remove button positioned absolutely */}
                      <button
                        onClick={() => removeFromWatchlist(movie.imdbID)}
                        style={{
                          position: 'absolute',
                          top: '0.5rem',
                          right: '0.5rem',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          zIndex: 10,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ef4444';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                        }}
                        title="Remove from watchlist"
                      >
                        <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Movie poster - clickable */}
                      <img
                        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300/cccccc/666666?text=No+Image"}
                        alt={movie.Title}
                        style={{
                          width: '100%',
                          height: '240px',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease'
                        }}
                        onClick={() => handleMovieClick(movie)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/200x300/cccccc/666666?text=No+Image";
                        }}
                        title="Click to view details"
                      />

                      {/* Movie info */}
                      <div style={{ padding: '0.75rem' }}>
                        <h4 style={{
                          fontWeight: '600',
                          fontSize: '0.875rem',
                          color: darkMode ? '#ffffff' : '#1f2937',
                          lineHeight: '1.2',
                          height: '2.1rem',
                          overflow: 'hidden',
                          marginBottom: '0.25rem'
                        }}>
                          {movie.Title}
                        </h4>
                        <p style={{
                          fontSize: '0.75rem',
                          color: darkMode ? '#9ca3af' : '#6b7280'
                        }}>
                          {movie.Year} • {movie.Type || 'Movie'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1rem'
        }}
        onClick={closeModal}>
          <div style={{
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            borderRadius: '1rem',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
          onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
              }}
            >
              <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {loadingDetails ? (
              <div style={{ padding: '3rem', textAlign: 'center' }}>
                <div className="animate-spin rounded-full border-b-2 border-blue-600" style={{
                  width: '48px',
                  height: '48px',
                  margin: '0 auto 1rem'
                }}></div>
                <p style={{ color: darkMode ? '#ffffff' : '#1f2937' }}>Loading movie details...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', padding: '2rem' }}>
                {/* Movie Poster */}
                <div style={{ flexShrink: 0 }}>
                  <img
                    src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "https://via.placeholder.com/300x450/cccccc/666666?text=No+Image"}
                    alt={selectedMovie.Title}
                    style={{
                      width: '250px',
                      height: '375px',
                      objectFit: 'cover',
                      borderRadius: '0.5rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/300x450/cccccc/666666?text=No+Image";
                    }}
                  />
                </div>

                {/* Movie Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: darkMode ? '#ffffff' : '#1f2937'
                  }}>
                    {selectedMovie.Title}
                  </h2>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                      <span style={{
                        backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                        color: darkMode ? '#ffffff' : '#1f2937',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {selectedMovie.Year}
                      </span>
                      <span style={{
                        backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                        color: darkMode ? '#ffffff' : '#1f2937',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {selectedMovie.Rated}
                      </span>
                      <span style={{
                        backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                        color: darkMode ? '#ffffff' : '#1f2937',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>
                        {selectedMovie.Runtime}
                      </span>
                      {selectedMovie.imdbRating !== "N/A" && (
                        <span style={{
                          backgroundColor: '#fbbf24',
                          color: '#1f2937',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          ⭐ {selectedMovie.imdbRating}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: darkMode ? '#ffffff' : '#1f2937'
                    }}>
                      Plot
                    </h3>
                    <p style={{
                      lineHeight: '1.6',
                      color: darkMode ? '#d1d5db' : '#4b5563'
                    }}>
                      {selectedMovie.Plot}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: darkMode ? '#ffffff' : '#1f2937'
                      }}>
                        Director
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: darkMode ? '#d1d5db' : '#6b7280' }}>
                        {selectedMovie.Director}
                      </p>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: darkMode ? '#ffffff' : '#1f2937'
                      }}>
                        Genre
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: darkMode ? '#d1d5db' : '#6b7280' }}>
                        {selectedMovie.Genre}
                      </p>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: darkMode ? '#ffffff' : '#1f2937'
                      }}>
                        Actors
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: darkMode ? '#d1d5db' : '#6b7280' }}>
                        {selectedMovie.Actors}
                      </p>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: darkMode ? '#ffffff' : '#1f2937'
                      }}>
                        Released
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: darkMode ? '#d1d5db' : '#6b7280' }}>
                        {selectedMovie.Released}
                      </p>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: darkMode ? '#ffffff' : '#1f2937'
                      }}>
                        Country
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: darkMode ? '#d1d5db' : '#6b7280' }}>
                        {selectedMovie.Country}
                      </p>
                    </div>

                    <div>
                      <h4 style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem',
                        color: darkMode ? '#ffffff' : '#1f2937'
                      }}>
                        Awards
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: darkMode ? '#d1d5db' : '#6b7280' }}>
                        {selectedMovie.Awards}
                      </p>
                    </div>
                  </div>

                  {/* Add to Watchlist Button */}
                  <div style={{ marginTop: '2rem' }}>
                    <button
                      onClick={() => addToWatchlist(selectedMovie)}
                      disabled={watchlist.some(m => m.imdbID === selectedMovie.imdbID)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: watchlist.some(m => m.imdbID === selectedMovie.imdbID) ? 'not-allowed' : 'pointer',
                        backgroundColor: watchlist.some(m => m.imdbID === selectedMovie.imdbID)
                          ? (darkMode ? '#4b5563' : '#d1d5db')
                          : (darkMode ? '#1d4ed8' : '#2563eb'),
                        color: watchlist.some(m => m.imdbID === selectedMovie.imdbID)
                          ? (darkMode ? '#9ca3af' : '#6b7280')
                          : '#ffffff',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!watchlist.some(m => m.imdbID === selectedMovie.imdbID)) {
                          e.currentTarget.style.backgroundColor = darkMode ? '#1e40af' : '#1d4ed8';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!watchlist.some(m => m.imdbID === selectedMovie.imdbID)) {
                          e.currentTarget.style.backgroundColor = darkMode ? '#1d4ed8' : '#2563eb';
                        }
                      }}
                    >
                      {watchlist.some(m => m.imdbID === selectedMovie.imdbID) ? '✓ Added to Watchlist' : '+ Add to Watchlist'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App
