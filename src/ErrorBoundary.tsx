import React, { ReactNode } from 'react';
import { NetworkMonitorInfo, CustomErrorInfo } from './NetworkMonitor';

// Class-based ErrorBoundary to handle errors
class ErrorBoundaryClass extends React.Component<{ 
  children: ReactNode;
  onErrorCapture: (networkMonitorProps: NetworkMonitorInfo) => void; 
}, { hasError: boolean }> {
  constructor(props: { children: ReactNode; 
    onErrorCapture: (networkMonitorProps: NetworkMonitorInfo) => void }
    ) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const errorDetails: CustomErrorInfo = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
    };

    // Log the error
    console.error('Error caught in ErrorBoundary:', error, errorDetails);

    // Use default or empty data for other properties
    const networkMonitorInfo: NetworkMonitorInfo = {
      networkData: [], // Placeholder, update with actual network data if available
      telemetryData: {
        ip: '', // Placeholder for IP address
        browserVersion: '', // Placeholder for browser version
        operatingSystem: '', // Placeholder for operating system
      },
      errorInfo: errorDetails,
    };

    // Share the error info with the app via the onErrorCapture callback
    this.props.onErrorCapture(networkMonitorInfo);
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
const ErrorBoundary: React.FC<{ children: ReactNode; onErrorCapture: (networkMonitorProps: NetworkMonitorInfo) => void }> = ({ children, onErrorCapture }) => {
  return (
    <ErrorBoundaryClass onErrorCapture={onErrorCapture}>
      {children}
    </ErrorBoundaryClass>
  );
};

export default ErrorBoundary;
