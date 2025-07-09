# 🎬 Namasys Movie Explorer

A modern, responsive single-page application for searching movies and managing a personal watchlist. Built with React 18, TypeScript, and Tailwind CSS.

![Movie Explorer Demo](https://via.placeholder.com/800x400/1f2937/ffffff?text=Movie+Explorer+Demo)

## ✨ Features

### Core Features
- **🔍 Smart Search**: Debounced search with OMDb API integration
- **📝 Personal Watchlist**: Add/remove movies with persistent storage
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **🎨 Modern UI**: Clean, professional interface with smooth animations
- **⚡ Fast Performance**: Optimized with Vite and React 18

### Enhanced Features
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📖 Movie Details**: Expandable details with plot and ratings
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **💾 Offline Storage**: Watchlist persists between sessions
- **🔄 Loading States**: Smooth loading indicators and error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd namasys-movie-explorer

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MovieCard.tsx   # Individual movie display
│   ├── SearchBar.tsx   # Search input with debouncing
│   ├── WatchlistPanel.tsx # Watchlist sidebar
│   └── ui/             # Base UI components
├── contexts/           # React Context providers
│   └── WatchlistContext.tsx
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
├── types/              # TypeScript type definitions
│   └── Movie.ts
├── utils/              # Utility functions
│   └── api.ts          # API integration
└── styles/             # Global styles
```

## 🎯 How I Approached It

### Technical Decisions

**Framework Choice**: React 18 with TypeScript for type safety and modern development experience.

**State Management**: React Context for global watchlist state, avoiding over-engineering with external libraries.

**Styling**: Tailwind CSS for rapid development and consistent design system.

**API Integration**: OMDb API with proper error handling and loading states.

**Performance**:
- Debounced search to minimize API calls
- Lazy loading and memoization where appropriate
- Optimized bundle size with Vite

### Architecture Patterns

**Component Composition**: Small, focused components with clear responsibilities.

**Custom Hooks**: Extracted reusable logic (debouncing, localStorage) into custom hooks.

**Type Safety**: Comprehensive TypeScript coverage with proper interfaces.

**Error Boundaries**: Graceful error handling throughout the application.

## 🔧 Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context + Hooks
- **Storage**: LocalForage for persistent data
- **API**: OMDb API for movie data
- **Linting**: ESLint with React and TypeScript rules
- **Icons**: React Icons

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 768px (single column)
  - Tablet: 768px - 1024px (two columns)
  - Desktop: > 1024px (three columns + sidebar)

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant colors

## 🌟 Future Enhancements

- [ ] Movie trailers integration
- [ ] User ratings and reviews
- [ ] Social sharing features
- [ ] Advanced filtering options
- [ ] Offline mode with service workers
- [ ] Progressive Web App (PWA) features

## 📄 License

MIT License - feel free to use this project for learning and development.

---

Built with ❤️ by [Your Name] for Namasys
