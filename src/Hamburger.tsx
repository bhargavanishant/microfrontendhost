// import React, { useState } from 'react';
// //import { useNavigate } from 'react-router-dom';
// import './index.css';

// export interface HamburgerProps {
//     shareNavigationInfo: (value: string) => void;
// }

// export default function Hamburger({ shareNavigationInfo }: HamburgerProps) {
//     const [menuOpen, setMenuOpen] = useState(false);
//     //const navigate = useNavigate();

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };

//     const handleNavigation = (value: string, e: React.MouseEvent<HTMLAnchorElement>) => {
//         e.preventDefault(); // Prevent the default anchor behavior
//         console.log(value);
//         shareNavigationInfo(value);
//         //navigate(`/${value}`); // Navigate to the route based on value
//     };

//     return (
//         <>
//             <div className="hamburger-container" onClick={toggleMenu}>
//                 <div className={`hamburger ${menuOpen ? 'rotate1' : ''}`}></div>
//                 <div className={`hamburger ${menuOpen ? 'hide' : ''}`}></div>
//                 <div className={`hamburger ${menuOpen ? 'rotate2' : ''}`}></div>
//             </div>
//             <div className={`menu ${menuOpen ? 'show' : ''}`}>
//                 <a href="#" onClick={(e) => handleNavigation('Products', e)}>Products</a>
//                 <a href="#" onClick={(e) => handleNavigation('Categories', e)}>Categories</a>
//                 <a href="#" onClick={(e) => handleNavigation('Debugging', e)}>Debugging</a>
//                 <a href="#" onClick={(e) => handleNavigation('Contact', e)}>Contact</a>
//             </div>
//         </>
//     );
// };

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
