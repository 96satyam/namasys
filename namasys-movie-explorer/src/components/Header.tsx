import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"></div>

      {/* Glass effect overlay */}
      <div className="relative glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3 animate-slideInLeft">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-xl" role="img" aria-label="Movie icon">🎬</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Namasys
                  </span>
                  <span className="ml-2 text-white">Movie Explorer</span>
                </h1>
                <p className="text-blue-100 dark:text-gray-300 text-xs font-medium">
                  Discover • Watch • Remember
                </p>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 group focus-ring"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <div className="relative w-5 h-5">
                  {theme === 'light' ? (
                    <svg className="w-5 h-5 text-yellow-300 group-hover:text-yellow-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-yellow-300 group-hover:text-yellow-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2.25a.75.75,0,0,0-.75.75v1.5a.75.75,0,0,0,1.5,0V3A.75.75,0,0,0,12,2.25ZM7.5,12A4.5,4.5,0,1,1,12,16.5,4.51,4.51,0,0,1,7.5,12Zm12.75,0a.75.75,0,0,0-.75-.75H18a.75.75,0,0,0,0,1.5h1.5A.75.75,0,0,0,20.25,12ZM12,19.5a.75.75,0,0,0-.75.75v1.5a.75.75,0,0,0,1.5,0V20.25A.75.75,0,0,0,12,19.5Zm-7.28-2.22a.75.75,0,0,0,0,1.06l1.06,1.06a.75.75,0,1,0,1.06-1.06L5.78,17.28a.75.75,0,0,0-1.06,0Zm12.02-12.02a.75.75,0,0,0,1.06,0l1.06-1.06a.75.75,0,1,0-1.06-1.06L16.74,4.22a.75.75,0,0,0,0,1.06ZM6,12a.75.75,0,0,0-.75-.75H3.75a.75.75,0,0,0,0,1.5H5.25A.75.75,0,0,0,6,12ZM4.22,6.78a.75.75,0,0,0,1.06-1.06L4.22,4.66a.75.75,0,0,0-1.06,1.06L4.22,6.78Zm12.02,12.02a.75.75,0,0,0,1.06,1.06l1.06-1.06a.75.75,0,1,0-1.06-1.06Z"/>
                    </svg>
                  )}
                </div>

                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                </div>
              </button>

              {/* Status indicator */}
              <div className="hidden sm:flex items-center space-x-2 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white dark:text-gray-200 text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
