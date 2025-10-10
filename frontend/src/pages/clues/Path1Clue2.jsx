// src/pages/clues/Path1Clue2.jsx (Now a reusable template)
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';

// --- Clue Configuration ---
const CLUE_ID = 2; // <-- UPDATE THE CLUE NUMBER

// --- Clue Data ---
// For clues without a prologue, simply omit the prologue properties.
const clueData = {
    title: "CLUE 2",
    storyText: "In Galvan Prime…\n\nAzmuth: Good job on earning Galvan Clearance. You are free to start a new life here. I will give you the planet WTF's coordinates. Radiation is high, but the Kyber will handle it, you guys can build a civilization there.\n\nVoyager Alpha: A new life? We were here to navigate through the solution for saving people of the Earth, finding a planet so that they could migrate. But there is no they now, right?? You said you would help. What is happening?\n\nAzmuth: I communicated with your planet. Using the data I have, the Omnitrix equation is partly solved. But data from my star is needed to finish it, almost impossible to get. The conclusion: Earth cannot be saved. You were sent as humanity's last hope. You cannot take an entire civilization through a wormhole anywhere yet. Not until I get a solution.\n\nVoyagers: We're leaving at once. We will not abandon Earth. Even if humanity ends, we stay with them.\n\nAzmuth: Wait! The only option I have is that I still need that stellar data. You could go to these coordinates near the star and send TARS. He will transmit the data. My tech cannot survive there, but maybe yours can.",
    riddles: [
      {
        type: "Coordinates",
        text: "The path winds through Mann's Aqua Reservoir, guiding seekers from afar. Beyond it lies a realm unmasked, where chatter and footsteps are never surpassed. Here, meals are shared in a bustling crowd, voices are many, the clatter is loud. Pens find their paper, errands abound search with care, and the Destination is found."
      },
      {
        type: "Clearance Code",
        text: "A deadly retrieval awaits. In the clustered dark, where light itself bends, the stars behind it are revealed. Yet one wonders unlike the rest its core wrought of strangeness. Once wielded by Thor, but never again. So dense it could unravel fruit loops into threads of cosmic pasta. Our Sol would fail to become this might, because Z's limit stands as the barrier a few surpass. Z wears three names, each a different face, but only the most significant holds the key to fatman's race."
      }
    ]
  };

function Path1Clue2() {
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
        {/* --- Prologue Section (Renders ONLY if prologueText exists) --- */}
        {clueData.prologueText && (
          <div className="prologue">
            <h3>{clueData.prologueTitle}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.prologueText}</p>
          </div>
        )}

        {/* --- Main Clue Section --- */}
        <h2 className="clue-number">
          <span className="clue-text">{clueData.title.split(' ')[0]} </span>
          <span className="clue-digit">{clueData.title.split(' ')[1]}</span>
        </h2>
        
        <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.storyText}</p>

        {/* Riddles and Form sections remain the same... */}
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

export default Path1Clue2;