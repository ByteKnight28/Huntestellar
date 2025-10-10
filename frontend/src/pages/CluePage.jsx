// src/pages/CluePage.jsx
import React from 'react';
// 1. Import the useNavigate hook from React Router
import { useOutletContext, Navigate, useNavigate } from 'react-router-dom';
import './CluePage.css';
import societyLogo from '../assets/aps-logo.svg';


const CluePage = () => {
  const { gameData, onLogout } = useOutletContext();
  const navigate = useNavigate(); // 2. Create an instance of the navigate function

  // 3. Create a handler function to navigate back
  const handleBackClick = () => {
    navigate('/starjourney'); // This will take the user to the StarJourney page
  };

  const planetDataMap = {
    '1': { name: "ORION'S ODYSSEY", color: 'deepskyblue' }, // Blue
    '2': { name: 'ENDLESS WHISPERS', color: 'darkorange' }, // Orange
    '3': { name: "WHATNEY'S VOYAGE", color: 'limegreen' }, // Green
    '4': { name: "BOHR'S FRONTIER", color: 'crimson' } // Red
  };

  const assignedPath = gameData?.teamData?.assignedPath;
  const planetInfo = planetDataMap[assignedPath] || { name: 'Unknown Galaxy', color: 'white' };

  return (
    <div className="clue-page-container">
      <header className="clue-header">
        {/* 4. Add the onClick event to your back arrow */}
        <div className="back-arrow" onClick={handleBackClick}>
          &lt;
        </div>
        <h1 className="header-text">Your Journey</h1>
        <div className="logo">
        <img 
          src={societyLogo} 
          alt="Logout" 
          className="society-logo logout-logo"
          onClick={onLogout} 
        />
        </div>
      </header>

      <main className="clue-content">
        <h2 className="clue-number" style={{ color: planetInfo.color }}>
          <span className="clue-text" >CLUE </span>
          <span className="clue-digit">1</span>
        </h2>
        
        <h3 className="clue-title">PROLOGUE</h3>
        <p>
          Earth was dying—its core failing, storms unending, oceans rising.
          Humanity's only hope was to seek a new home among the stars.
        </p>
        <p>
          For months your ship drifted through the void, searching, scanning,
          but finding nothing. Hope thinned with each passing day, as the crew
          gazed out at endless darkness, knowing their world was already lost....
        </p>
        <p>
          ...Then it came. A signal. Faint, fractured, carried on waves beyond
          the known spectrum. No beacon should exist this far from home...yet
          the transmission pulsed with purpose, as though waiting for you....
        </p>
        <p>
          It was no promise of safety, no voice of comfort. It was older,
          darker, something that should not be. And yet, within its haunting
          message lay a direction... a chance, perhaps, for renewal...
        </p>
      </main>

      <footer className="clue-footer">
        <button className="scan-button" onClick={() => navigate('/scanner')}>Scan QR to Answer</button>
      </footer>
    </div>
  );
};

export default CluePage;