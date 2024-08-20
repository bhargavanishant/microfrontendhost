import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Header from './Header';
import Footer from './Footer';
import Product from 'pages/Product';
import Categories from 'pages/Categories';
import Debugging from 'second/Debugging';

const App = () => {
  const [route, setRoute] = useState('Products'); // Default route is "Products"

  return (
    <>
      <Header setRoute={setRoute} currentRoute={route} />
      <section>
        {route === 'Products' && <Product />}
        {route === 'Categories' && <Categories />}
        {route === 'Debugging' && <Debugging />}
        {route === 'Contact' && <div>Contact Page</div>} {/* Add a Contact component if needed */}
      </section>
      <Footer />
    </>
  );
};

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
