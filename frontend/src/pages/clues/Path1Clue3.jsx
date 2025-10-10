// src/pages/clues/Path1Clue3.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';

// --- Clue Configuration ---
const CLUE_ID = 3; // <-- UPDATE THE CLUE NUMBER

// --- Clue Data (PASTE YOUR NEW DATA HERE) ---
const clueData = {
    title: "CLUE 3",
    storyText: "Azmuth : It worked, data is coming through. It will take me a few days to solve this, but I still need one more thing… Kyber, a rare stone found on the outskirts of the system possessed by a peaceful civilization, its radiation could be the answer to revive your new planet's toxic breath.\n\nYou reach the planet with hopeful tears in your eyes, breaching silence near a planet you hear…\n\nYou hear : “This is the Jedi High Council, identify yourself, your purpose and provide your planetary clearance code.”\n\nAlpha - This is the starship Sharanga. We request entry under diplomatic passage. Our purpose is to retrieve Kyber for our salvation. Planetary clearance code is transmitted now to stand by for verification. Please share the landing coordinates.",
    riddles: [
      {
        type: "Coordinates",
        text: "Between two streams I stand tall,\nA temple of learning, open to all.\nHolocrons and datapads, side by side,\nA place where knowledge and Force reside.\nYou may not love it when trials are near,\nBut wisdom is always here.\nTrain, prepare, or quietly stay,\nWhat is this place, we ask today?"
      },
      {
        type: "Clearance Code",
        text: "The cipher awaits, unravel its thread,\nand Kyber shall answer, as will Earth.\nYet know this truth: a crystal holds the key,\nAs they say in Norse - here typo it may be.\n\n“121 1 2111 2122 212”"
      }
    ]
  };

// --- Component (No changes needed below) ---
function Path1Clue3() {
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
        {/* Prologue section is removed as it's only for Clue 1 */}

        {/* --- Main Clue Section --- */}
        <h2 className="clue-number">
          <span className="clue-text">{clueData.title.split(' ')[0]} </span>
          <span className="clue-digit">{clueData.title.split(' ')[1]}</span>
        </h2>
        
        <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.storyText}</p>

        {/* --- Riddles Section --- */}
        {clueData.riddles.map((riddle, index) => (
          <div key={index} className="riddle-section">
            <h4>{riddle.type}</h4>
            {riddle.text && <p style={{ whiteSpace: 'pre-wrap' }}>{riddle.text}</p>}
            {riddle.lines && riddle.lines.map((line, lineIndex) => (
              <p key={lineIndex} className="poem-line">{line}</p>
            ))}
            {riddle.formula && <code>{riddle.formula}</code>}
            {riddle.note && <small>{riddle.note}</small>}
          </div>
        ))}
        
        {/* --- Key Input Form --- */}
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

export default Path1Clue3;