import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import EmptyState from './ui/EmptyState';
import Button from './ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <EmptyState
            icon="💥"
            title="Oops! Something went wrong"
            description="We encountered an unexpected error. Please refresh the page or try again later."
            action={
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
              >
                Refresh Page
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
