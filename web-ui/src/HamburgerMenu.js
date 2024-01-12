import React, { useState, useEffect } from 'react';
import './styles/HamburgerMenuStyle.css';

import signal from './images/signal-icon.svg';
import admin from './images/admin-icon.svg';

function HamburgerMenu({ onItemClick, currentComponent }) {
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

  const handleItemClick = (componentName) => {
    onItemClick(componentName);
    setIsOpen(false);
  };

  return (
    <>
      <div className="hamburger" onClick={() => setIsOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      {isMenuOpen && <div className="overlay"></div>}

      <div className={`Mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className={`hamburger-item ${currentComponent === 'StaffChecks' ? 'active' : ''}`} onClick={() => handleItemClick('StaffChecks')}><img src={signal} alt="Staff Checks icon" className={`hamburger-icon ${currentComponent === 'StaffChecks' ? 'active' : ''}`}/>My Staff Checks</div>
        <div className={`hamburger-item ${currentComponent === 'AdminInterface' ? 'active' : ''}`} onClick={() => handleItemClick('AdminInterface')}><img src={admin} alt="Admin dashboard icon" className={`hamburger-icon ${currentComponent === 'AdminInterface' ? 'active' : ''}`}/>Staff Dashboard</div>
      </div>
    </>
  );
}

export default HamburgerMenu;