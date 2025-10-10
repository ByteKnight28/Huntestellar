// src/pages/StarJourney.jsx
import React from 'react';
import { useOutletContext, Navigate, useNavigate } from 'react-router-dom';
import './StarJourney.css';

import huntPathMap from '../assets/hunt-path-map.svg';
import astronautImage from '../assets/astronaut.svg';
import societyLogo from '../assets/aps-logo.svg';

function StarJourney() {
  const { gameData, onLogout } = useOutletContext();
  const navigate = useNavigate();

  const planetDataMap = {
    '1': { name: "ORION'S ODYSSEY", color: 'deepskyblue' },
    '2': { name: 'ENDLESS WHISPERS', color: 'rgba(233, 78, 0, 1)' },
    '3': { name: "WHATNEY'S VOYAGE", color: 'limegreen' },
    '4': { name: "BOHR'S FRONTIER", color: 'crimson' }
  };

  if (!gameData) {
    return <Navigate to="/" replace />;
  }

  const path = gameData.teamData.assignedPath;
  const currentClue = gameData.currentProgress + 1; // Calculate the upcoming clue number

  const handleStartJourney = () => {
    const currentClueUrl = `/path${path}clue${currentClue}`;
    navigate(currentClueUrl);
  };

  // --- NEW: Handler for the final decision ---
  const handleFinalDecision = () => {
    // You'll need to create a new route for this, e.g., '/decision'
    navigate('/decision'); 
  };

  const assignedPath = gameData?.teamData?.assignedPath;
  const planetInfo = planetDataMap[assignedPath] || { name: 'Unknown Galaxy', color: 'white' };
  const teamName = gameData?.teamData?.teamName || "Your Team";

  return (
    <div className="star-journey-container">
      <header className="top-bar">
        <span>{teamName}</span>
        <img 
          src={societyLogo} 
          alt="Logout" 
          className="society-logo logout-logo"
          onClick={onLogout} 
        />
      </header>
      
      <main className="main-content">
        <img src={huntPathMap} alt="Star map" className="background-map" />
        <img src={astronautImage} alt="Astronaut" className="background-astronaut" />
        
        {/* --- NEW: Conditional Rendering Logic --- */}
        {currentClue === 5 ? (
          // If it's the 5th clue, show the decision section
          <div className="decision-section">
            <h1 className="decision-title">Now it's the time for the ultimate decision</h1>
          </div>
        ) : (
          // Otherwise, show the normal planet intro
          <div className="planet-intro-section">
            <div className="planet-name-wrapper">
              <h1 className="planet-name" style={{ color: planetInfo.color }}>
                {planetInfo.name}
              </h1>
            </div>
            <p className="planet-tagline">is the planet you will be exploring!</p>
            <button className="start-journey-button" onClick={handleStartJourney}>
              Start My Journey
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default StarJourney;