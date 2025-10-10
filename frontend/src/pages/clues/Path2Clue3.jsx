// src/pages/clues/path2clue3.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';

// --- Clue Configuration ---
const CLUE_ID = 3;

// --- Clue Data (PASTE YOUR NEW DATA HERE) ---
const clueData = {
    title: "CLUE 3",
    storyText: "A wormhole has been discovered near Saturn.\n\nUSS Enterprise carries you through a wormhole into the depths of our galaxy.\n\nSuddenly you receive a transmission…..\nI have returned with news you must know, a new riddle awaits those who follow.\nPrepare yourself, for the path begins to flow.\n\nIt's the Third Whisper….",
    riddles: [
      {
        type: "Location on Campus",
        text: "“The first you glimpse when you step inside,\nWhere all your affairs are carefully tied.\nA house of guidance, firm and tall,\nFrom here, the paths extend to all.”"
      },
      {
        type: "Map Guidance",
        text: "“Lines and loops that twist and bend,\nA place where time itself tends.\nA man upon his throne keeps all aligned,\nUniverses destroyed if rules are left behind.\nIt oversees both time and space,\nAnd all the mighty stones are but paperweight”"
      },
      {
        type: "Answer to be entered",
        text: "Relativistic Mass : This is the quantity that depends on the velocity (v) of the object, increasing as the object's speed approaches the speed of light (c).\n\nCalculate the relativistic energy of a body which is moving at v = ((√3)/2)c\nAnd its rest mass = X + Y (in kg) where\nX = year our institute got established\nand Y = orbital period of haley's comet (closest integer) (in years)\nZ * 10^20 where Z is the nearest integer.\nCalculate Z",
        formula: "E = mc²\nm = (rest mass)/√(1 - (v/c)²)",
      }
    ]
  };

// --- Component ---
function Path2Clue3() {
  const { gameData, onLogout } = useOutletContext();
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  if (!gameData) {
    return <Navigate to="/" replace />;
  }

  const CORRECT_KEY = gameData.gameContent[gameData.currentProgress].key;

  const handleSubmitKey = (event) => {
    event.preventDefault();
    setError('');

    if (SHA256(key.toLowerCase().trim()).toString() === CORRECT_KEY) {
      navigate(`/answer/${CLUE_ID}`);
    } else {
      setError('Incorrect key. Please try again.');
    }
  };
  
  return (
    <div className="clue-page-container">
      <header className="clue-header">
        <div className="back-arrow" onClick={() => navigate(-1)}>&lt;</div>
        <h1 className="header-text">Your Journey</h1>
        <img src={societyLogo} alt="Logout" className="logout-logo" onClick={onLogout} />
      </header>

      <main className="clue-content">
        <h2 className="clue-number">
          <span className="clue-text" style={{color:'rgb(214, 90, 28)'}}>{clueData.title.split(' ')[0]} </span>
          <span className="clue-digit" style={{color:'rgb(214, 90, 28)'}}>{clueData.title.split(' ')[1]}</span>
        </h2>
        
        <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.storyText}</p>

        {clueData.riddles.map((riddle, index) => (
          <div key={index} className="riddle-section" style={{ borderLeft: '3px solid rgb(192, 80, 25)' }}>
            <h4 style={{color:'rgb(214, 90, 28)'}}>{riddle.type}</h4>
            {riddle.text && <p style={{ whiteSpace: 'pre-wrap' }}>{riddle.text}</p>}
            {riddle.image && <img src={riddle.image} alt="Clue visual" className="clue-image" />}
            {riddle.lines && riddle.lines.map((line, lineIndex) => (
              <p key={lineIndex} className="poem-line">{line}</p>
            ))}
            {riddle.formula && <code style={{ whiteSpace: 'pre-wrap' }}>{riddle.formula}</code>}
            {riddle.note && <small>{riddle.note}</small>}
          </div>
        ))}
        
        <form onSubmit={handleSubmitKey} className="key-form">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter Key"
            className="key-input"
          />
          <button type="submit" className="scan-button">Submit Key</button>
          {error && <p className="error-message" style={{color: 'red', marginTop: '1rem'}}>{error}</p>}
        </form>
      </main>
    </div>
  );
}

export default Path2Clue3;