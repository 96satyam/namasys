import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { WatchlistProvider } from "./contexts/WatchlistContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </React.StrictMode>
);
