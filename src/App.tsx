import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Header from './Header';
import Footer from './Footer';
import Product from 'pages/Product';
import Categories from 'pages/Categories';
import Debugging from 'second/Debugging';

import NetworkMonitor from './NetworkMonitor';

const App = () => {
  const [route, setRoute] = useState('Products'); // Default route is "Products"

  const handleDataCapture = (data) => {
    // We can send this data as payload and share it with our internal analytical servers to evaluate it better.
    console.log(data);
  };

  return (
    <>
      <Header setRoute={setRoute} currentRoute={route} />
      <section>
        <NetworkMonitor onCapture={handleDataCapture} />
        {route === 'Products' && <Product />}
        {route === 'Categories' && <Categories />}
        {route === 'Debugging' && <Debugging />}
        {route === 'Contact' && <div>Contact Page</div>}
      </section>
      <Footer />
    </>
  );
};

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
