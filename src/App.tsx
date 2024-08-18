import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'
import Header from './Header'
import Footer from './Footer'
import HomePage from 'pages/HomePage';

const App = () => (
  <div>
    <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    <Footer></Footer>
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)