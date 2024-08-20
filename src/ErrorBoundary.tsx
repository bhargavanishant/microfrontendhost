import React, { ReactNode } from 'react';

// Class-based ErrorBoundary to handle errors
class ErrorBoundaryClass extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-message'>
          <p>We're having trouble loading this part of the application. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper component
const ErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;
