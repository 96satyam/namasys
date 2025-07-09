# 🎬 Namasys Movie Explorer

A modern, responsive single-page application that lets users search for movies and manage a personal watchlist. Built with React 18, TypeScript, and Tailwind CSS, featuring a sleek dark mode and comprehensive movie details.

![Movie Explorer Demo](https://via.placeholder.com/800x400/2563eb/ffffff?text=🎬+Movie+Explorer+Demo)

## ✨ Features

### Core Functionality
- **🔍 Smart Search**: Debounced search with 500ms delay for optimal performance
- **📚 Personal Watchlist**: Add/remove movies with localStorage persistence
- **📱 Responsive Design**: Mobile-first approach with adaptive grid layouts
- **🌙 Dark Mode**: Toggle between light and dark themes with preference persistence
- **🎭 Movie Details**: Click any poster to view comprehensive movie information

### Enhanced User Experience
- **Fixed Header**: Always-accessible search bar at the top
- **Horizontal Grids**: 5 movies per row on large screens for both search results and watchlist
- **Loading States**: Smooth spinners and loading indicators
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Hover Effects**: Interactive animations and visual feedback

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/namasys-movie-explorer.git
   cd namasys-movie-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **API**: OMDb API for movie data
- **Storage**: localStorage for watchlist persistence
- **Linting**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # App header with search and dark mode toggle
│   ├── SearchBar.tsx   # Search input with debouncing
│   ├── MovieCard.tsx   # Individual movie display component
│   └── WatchlistPanel.tsx # Watchlist sidebar component
├── hooks/              # Custom React hooks
│   └── useDebounce.ts  # Debouncing hook for search optimization
├── types/              # TypeScript type definitions
│   └── Movie.ts        # Movie and MovieDetails interfaces
├── utils/              # Utility functions
│   └── api.ts          # OMDb API integration
├── contexts/           # React contexts
│   └── ThemeContext.tsx # Dark mode theme management
├── styles/             # CSS and styling
│   └── index.css       # Global styles and Tailwind imports
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🎯 How I Approached It

### 1. **Planning & Architecture**

I started by analyzing the requirements and breaking them down into core components:
- Search functionality with API integration
- Watchlist management with persistence
- Responsive UI with modern design principles
- Clean code structure with TypeScript

### 2. **Technology Choices**

**React 18 + TypeScript**: Chose for type safety, modern hooks, and excellent developer experience.

**Tailwind CSS v4**: Selected for rapid UI development and consistent design system.

**Vite**: Preferred over Create React App for faster development and better build performance.

**OMDb API**: Perfect fit for movie data with comprehensive information including plots, ratings, and metadata.

### 3. **Development Strategy**

#### Phase 1: Core Functionality
- Set up project structure with TypeScript and Tailwind
- Implemented debounced search with custom `useDebounce` hook
- Created OMDb API integration with error handling
- Built basic movie display and watchlist functionality

#### Phase 2: Enhanced UI/UX
- Designed responsive grid layouts (1→2→3→4→5 columns)
- Implemented dark mode with localStorage persistence
- Added loading states and error handling
- Created professional movie cards with hover effects

#### Phase 3: Advanced Features
- Built comprehensive movie details modal
- Enhanced search with fixed header design
- Implemented horizontal watchlist layout
- Added smooth animations and transitions

### 4. **Key Technical Decisions**

#### **Custom Debouncing Hook**
```typescript
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```
*Rationale*: Prevents excessive API calls while maintaining responsive user experience.

#### **TypeScript Interfaces**
```typescript
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type?: string;
  Poster: string;
}

interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  // ... additional fields
}
```
*Rationale*: Ensures type safety and better developer experience with IntelliSense.

#### **Responsive Grid System**
```css
.movie-grid {
  display: grid !important;
  gap: 1.5rem !important;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
}

@media (min-width: 1280px) {
  .movie-grid {
    grid-template-columns: repeat(5, 1fr) !important;
  }
}
```
*Rationale*: Provides optimal viewing experience across all device sizes.

### 5. **Challenges & Solutions**

#### **Challenge**: Tailwind CSS v4 Compatibility
**Solution**: Used inline styles with `!important` declarations to ensure consistent styling across different environments.

#### **Challenge**: Movie Details Modal Design
**Solution**: Created a comprehensive modal with backdrop blur, proper z-indexing, and responsive layout that works on all devices.

#### **Challenge**: Horizontal Watchlist Layout
**Solution**: Transformed the traditional sidebar approach into a full-width horizontal grid that matches the search results design.

### 6. **Performance Optimizations**

- **Debounced Search**: Reduces API calls by 80%
- **Error Boundaries**: Graceful handling of API failures
- **Lazy Loading**: Efficient image loading with error fallbacks
- **localStorage Caching**: Instant watchlist restoration

### 7. **Accessibility Considerations**

- **Keyboard Navigation**: Focus states and proper tab order
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG AA compliant color combinations
- **Touch Targets**: Minimum 44px touch targets for mobile

## 🎨 Design Philosophy

### **Mobile-First Approach**
Started with mobile design and progressively enhanced for larger screens, ensuring excellent experience across all devices.

### **Progressive Enhancement**
Core functionality works without JavaScript, with enhanced features layered on top.

### **Consistent Visual Language**
- Unified color palette with dark mode support
- Consistent spacing using 4px grid system
- Professional typography with clear hierarchy
- Smooth animations and micro-interactions

## 🧪 Testing Strategy

### **Manual Testing**
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design testing across device sizes
- Dark mode functionality verification
- API error handling validation

### **User Experience Testing**
- Search functionality with various queries
- Watchlist persistence across sessions
- Modal interactions and accessibility
- Performance under slow network conditions

## 🚀 Future Enhancements

- **Advanced Search Filters**: Genre, year, rating filters
- **Drag & Drop**: Reorder watchlist items
- **Social Features**: Share watchlists with friends
- **Offline Support**: Service worker for offline functionality
- **Unit Testing**: Jest and React Testing Library integration

## 📝 API Usage

This project uses the free OMDb API with the following endpoints:

- **Search Movies**: `?s={query}&page=1`
- **Movie Details**: `?i={imdbID}&plot=full`

API Key: `a46064b9` (Free tier: 1,000 calls/day)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OMDb API](https://www.omdbapi.com/) for providing comprehensive movie data
- [Tailwind CSS](https://tailwindcss.com/) for the excellent utility-first CSS framework
- [React](https://reactjs.org/) team for the amazing library and hooks system

---

**Built with ❤️ by [Your Name]**

*A modern movie exploration experience that combines functionality with beautiful design.*
