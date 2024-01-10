import React, { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import logo from './images/logo.png';
import profileIcon from './images/profile-icon.png';
import UserStaffChecks from './userStaffChecks';
import HamburgerMenu from './HamburgerMenu';

import AdminInterface from './admin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HamburgerMenu />
        <img className="App-header-logo" src={logo} alt="Canadian Army Logo"/>
        <img className="App-header-profile-icon" src={profileIcon} alt="Profile"/>
      </header>
      <UserStaffChecks />
      <AdminInterface />

    </div>
  );
}

export default App;