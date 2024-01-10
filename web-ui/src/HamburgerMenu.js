import React, { useState, useEffect } from 'react';
import './styles/HamburgerMenuStyle.css';

function HamburgerMenu() {
  const [isMenuOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest('.hamburger') && !e.target.closest('.Mobile-menu') && isMenuOpen) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('mousedown', closeMenu);

    return () => {
      document.body.removeEventListener('mousedown', closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="hamburger" onClick={() => setIsOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      {isMenuOpen && <div className="overlay"></div>}

      <div className={`Mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </>
  );
}

export default HamburgerMenu;