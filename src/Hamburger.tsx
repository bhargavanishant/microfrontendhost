import React, { useState } from 'react';
import './index.css';

interface HamburgerProps {
  shareNavigationInfo: (value: string) => void;
}

export default function Hamburger({ shareNavigationInfo }: HamburgerProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (value: string) => {
    shareNavigationInfo(value);
  };

  return (
    <>
      <div className="hamburger-container" onClick={toggleMenu}>
        <div className={`hamburger ${menuOpen ? 'rotate1' : ''}`}></div>
        <div className={`hamburger ${menuOpen ? 'hide' : ''}`}></div>
        <div className={`hamburger ${menuOpen ? 'rotate2' : ''}`}></div>
      </div>
      <div className={`menu ${menuOpen ? 'show' : ''}`}>
        <a href="#" onClick={() => handleClick('Products')}>Products</a>
        <a href="#" onClick={() => handleClick('Categories')}>Categories</a>
        <a href="#" onClick={() => handleClick('Debugging')}>Debugging</a>
        <a href="#" onClick={() => handleClick('Contact')}>Contact</a>
      </div>
    </>
  );
}
