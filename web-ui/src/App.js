import React, { useState } from 'react';
import './styles/App.css';
import logo from './images/logo.png';
import profileIcon from './images/profile-icon.png';
import UserStaffChecks from './userStaffChecks';

function App() {
  const [isMenuOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <div className="hamburger" onClick={() => setIsOpen(!isMenuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <img className="App-header-logo" src={logo} alt="Canadian Army Logo"/>
        <img className="App-header-profile-icon" src={profileIcon} alt="Profile"/>

      </header>
      
      {isMenuOpen && <div className="overlay"></div>}

      <div className={`Mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      
      <UserStaffChecks />

    </div>

  );
}

export default App;