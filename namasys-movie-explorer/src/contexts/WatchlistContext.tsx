/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { Movie } from "../types/Movie";
import localforage from "localforage";

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: string) => void;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    localforage.getItem<Movie[]>("watchlist").then((saved) => {
      if (saved) setWatchlist(saved);
    });
  }, []);

  useEffect(() => {
    localforage.setItem("watchlist", watchlist);
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    if (watchlist.find((m) => m.imdbID === movie.imdbID)) return;
    setWatchlist([...watchlist, movie]);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== id));
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, clearWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error("useWatchlist must be used within WatchlistProvider");
  return context;
};
