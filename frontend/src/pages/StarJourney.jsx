// src/pages/StarJourney.jsx
import React from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import './StarJourney.css';

import huntPathMap from '../assets/hunt-path-map.svg';
import astronautImage from '../assets/astronaut.svg';
import societyLogo from '../assets/aps-logo.svg';

function StarJourney() {
  const { gameData, onLogout } = useOutletContext();

  // 1. --- Create the mapping object ---
  // This acts as a dictionary to store the name and color for each path.
  const planetDataMap = {
    '1': { name: "ORION'S ODYSSEY", color: 'deepskyblue' }, // Blue
    '2': { name: 'ENDLESS WHISPERS', color: 'darkorange' }, // Orange
    '3': { name: 'Whatney’s Voyage', color: 'limegreen' }, // Green
    '4': { name: 'ARCTURUS', color: 'crimson' } // Red
  };

  if (!gameData) {
    return <Navigate to="/" />;
  }

  // 2. --- Look up the planet info using the assignedPath ---
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
        
        <div className="planet-intro-section">
          <div className="planet-name-wrapper">

            {/* 3. --- Use the dynamic name and color --- */}
            <h1 className="planet-name" style={{ color: planetInfo.color }}>
              {planetInfo.name}
            </h1>
            
          </div>
          <p className="planet-tagline">is  the  planet  you  will  be  exploring!</p>
          <button className="start-journey-button">Start My Journey</button>
        </div>
      </main>
    </div>
  );
}

export default StarJourney;