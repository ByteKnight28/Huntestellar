// src/pages/clues/path2clue2.jsx
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
    storyText: "You drift into the Orbital Shipyard, silence pressing down. Empty docks stretch endlessly until your eyes settle on a single ship.\n\nLetters glow across its hull : USS Enterprise.\n\nSuddenly… your console screams with a harsh alarm. A malicious transmission floods the system, its origin unknown.\n\nIt is the Second Whisper.",
    riddles: [
      {
        type: "Location on Campus",
        text: "“Where six-day a week, footsteps often tread,\nNear halls where learning's led.\nIn the future, on special days,\nYou will have events, dance, dazzling plays.”"
      },
      {
        type: "Map Guidance",
        text: "“Some say a winged guide once passed this way,\nOr the ruler of the seas might claim the day.\nYet the artistic God still reigns.\nA small step for some, a giant leap for others,\nWhere the truth of the story uncovers.”"
      },
      {
        type: "Answer to be entered",
        text: "As you leave the shipyard, you look back at the distant Sun. Light travels at the ultimate speed, yet it takes time to reach us. 'X' is the number of minutes (rounded to the nearest whole number) that it takes for a ray of sunlight to travel from the Sun's surface to the Earth. And 'Y' is the number of accounts APS follows on instagram.\nCalculate the product of X and Y."
      }
    ]
  };

// --- Component ---
function Path2Clue2() {
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
        {/* Prologue is absent for Clue 2 */}

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
            {riddle.formula && <code>{riddle.formula}</code>}
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

export default Path2Clue2;