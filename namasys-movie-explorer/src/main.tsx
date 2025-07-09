import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WatchlistProvider } from './contexts/WatchlistContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
