// src/pages/SplashScreen.jsx
import React from 'react';
import './SplashScreen.css';
import Logo from '../components/logo'; // <-- 1. Import the Logo

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        {/* 2. Replace the h1 with the Logo component */}
        <Logo className="title" />
        <p className="tagline">Mankind was born on Earth but was never meant to die here</p>
      </div>
      <footer className="footer">
        <p>PRESENTED BY ASTRONOMY & PHYSICS SOCIETY</p>
      </footer>
    </div>
  );
}

export default SplashScreen;