// src/pages/clues/Path3Clue2.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';

// --- Clue Configuration ---
const CLUE_ID = 2;

// --- Clue Data (PASTE YOUR NEW DATA HERE) ---
const clueData = {
    title: "CLUE 2",
    riddles: [
      {
        type: "Location on Campus",
        text: "Now crossing the wormhole, you have to leave something behind, making a sacrifice run up to a grassland where the grass does not stay, but it has been trimmed since you came into play."
      },
      {
        type: "Map Guidance",
        text: "As big as the moon, as stealthy as Sudarshan Chakra, can destroy planets. Be the task to defend or offend, it is made to kill and when you watch it destroy there is thrill. Here its role ends for now, to travel faster in the hunt, you have to give it out and move ahead."
      },
      {
        type: "Answer To be entered",
        text: "This mission's most important task begins after leaving our vehicle, you have entered the sea in search of a new home. Along this trek through the stars, you have your ride and it is the ride of life, what is the vehicle you have been using in the mission till now, it is generally considered a destroyer equipped with a laser and can incur one a damage major.",
        note: "Cheats Check!\nAnswer in two words, make sure the spelling is right!\nYou can add 'v2' at the end of your answer as your vehicle is an improved battleship.\nAnd remember. Logic is the beginning of wisdom, not the end”\nFormat : X Yv2 (X Y being the answer.)"
      }
    ]
  };

// --- Component ---
function Path3Clue2() {
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
          <span className="clue-text" style={{color:'rgb(50, 205, 50)'}}>{clueData.title.split(' ')[0]} </span>
          <span className="clue-digit" style={{color:'rgb(50, 205, 50)'}}>{clueData.title.split(' ')[1]}</span>
        </h2>
        
        <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.storyText}</p>

        {clueData.riddles.map((riddle, index) => (
          <div key={index} className="riddle-section" style={{ borderLeft: '3px solid rgb(40, 165, 40)' }}>
            <h4 style={{color:'rgb(50, 205, 50)'}}>{riddle.type}</h4>
            {riddle.text && <p style={{ whiteSpace: 'pre-wrap' }}>{riddle.text}</p>}
            {riddle.image && <img src={riddle.image} alt="Clue visual" className="clue-image" />}
            {riddle.lines && riddle.lines.map((line, lineIndex) => (
              <p key={lineIndex} className="poem-line">{line}</p>
            ))}
            {riddle.formula && <code >{riddle.formula}</code>}
            {riddle.note && <small style={{ whiteSpace: 'pre-wrap' }}>{riddle.note}</small>}
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

export default Path3Clue2;