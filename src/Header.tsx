import React from 'react';
import './index.css';
import Hamburger from './Hamburger';

interface HeaderProps {
  setRoute: (route: string) => void;
  currentRoute: string;
}

export default function Header({ setRoute, currentRoute }: HeaderProps) {
  const passInfo2Routes = (value: string) => {
    setRoute(value);
  };

  return (
    <header className="header">
      <Hamburger shareNavigationInfo={passInfo2Routes} />
      <div className="header-text">
        <h1>{currentRoute}</h1>
      </div>
    </header>
  );
}
