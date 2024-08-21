import React, { useState, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';

// Mandatory CSS required by the Data Grid
// import 'ag-grid-community/styles/ag-grid.css';
// // Optional Theme applied to the Data Grid
// import 'ag-grid-community/styles/ag-theme-quartz.css';

import './index.css';
import Header from './Header';
import Footer from './Footer';
import NetworkMonitor, { NetworkEntry, TelemetryData } from './NetworkMonitor';
import ErrorBoundary from './ErrorBoundary';

// Lazy loading the micro frontend components
const Product = lazy(() => import('pages/Product'));
const Categories = lazy(() => import('pages/Categories'));
const Debugging = lazy(() => import('second/Debugging'));

const App: React.FC = () => {
  const [route, setRoute] = useState('Products'); // Default route is "Products"

  // Adjust the function to match the expected type
  const handleDataCapture = (data: { networkData: NetworkEntry[]; telemetryData: TelemetryData }): void => {
    console.log(data);
  };

  return (
    <>
      <Header setRoute={setRoute} currentRoute={route} />
      <section>
        {/* Global Error Boundary for the Host */}
        <ErrorBoundary>
          <NetworkMonitor onCapture={handleDataCapture} />

          {/* Use Suspense with Error Boundaries for each Micro Frontend */}
          <Suspense fallback={<div>Loading...</div>}>
            {route === 'Products' && (
              <ErrorBoundary>
                <Product />
              </ErrorBoundary>
            )}
            {route === 'Categories' && (
              <ErrorBoundary>
                <Categories />
              </ErrorBoundary>
            )}
            {route === 'Debugging' && (
              <ErrorBoundary>
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
