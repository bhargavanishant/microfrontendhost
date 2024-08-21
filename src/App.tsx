import React, { useState, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import Footer from './Footer';
import NetworkMonitor, { ErrorInfo, NetworkEntry, NetworkMonitorProps, TelemetryData } from './NetworkMonitor';
import ErrorBoundary from './ErrorBoundary';

// Lazy loading the micro frontend components
const Product = lazy(() => import('pages/Product'));
const Categories = lazy(() => import('pages/Categories'));
const Debugging = lazy(() => import('second/Debugging'));

const App: React.FC = () => {
  const [route, setRoute] = useState('Products'); // Default route is "Products"

  // Adjust the function to match the expected type
  const handleDataCapture = (data: NetworkMonitorInfo): void => {
    console.log(data);
  };

  return (
    <>
      <Header setRoute={setRoute} currentRoute={route} />
      <section>
        {/* Global Error Boundary for the Host */}
        <ErrorBoundary onErrorCapture={handleDataCapture}>
          <NetworkMonitor onCapture={handleDataCapture} />

          {/* Use Suspense with Error Boundaries for each Micro Frontend */}
          <Suspense fallback={<div>Loading...</div>}>
            {route === 'Products' && (
              <ErrorBoundary onErrorCapture={handleDataCapture}>
                <Product />
              </ErrorBoundary>
            )}
            {route === 'Categories' && (
              <ErrorBoundary onErrorCapture={handleDataCapture}>
                <Categories />
              </ErrorBoundary>
            )}
            {route === 'Debugging' && (
              <ErrorBoundary onErrorCapture={handleDataCapture}>
                <Debugging />
              </ErrorBoundary>
            )}
            {route === 'Contact' && <div>Contact Page</div>}
          </Suspense>
        </ErrorBoundary>
      </section>
      <Footer />
    </>
  );
};

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
