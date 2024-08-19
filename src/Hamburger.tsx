import React, { useState } from 'react';
import './index.css';

export default function Hamburger() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="hamburger-container" onClick={toggleMenu}>
        <div className={`hamburger ${menuOpen ? 'rotate1' : ''}`}></div>
        <div className={`hamburger ${menuOpen ? 'hide' : ''}`}></div>
        <div className={`hamburger ${menuOpen ? 'rotate2' : ''}`}></div>
      </div>
      <div className={`menu ${menuOpen ? 'show' : ''}`}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
    </div>
  );
};