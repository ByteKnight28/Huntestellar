// src/pages/clues/Path1Clue4.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';

// --- NEW: IMPORT YOUR IMAGE HERE ---
// Make sure to place your image in the assets folder and update the path
import clueImage from '../../assets/images/Clue4.png';

// --- Clue Data ---
const clueData = {
  title: "CLUE 4",
  storyText: "Jedi Master Yoda - “Strength in you, I sense. Tested, your spirit has been. But the road ahead, still it calls. Near the end is. Azmuth has transmitted his Omnitrix solution. Take it, and the Kyber Crystal, to your world, go save humans before too late it is.”\n\nYou take off again, way back home to end this once and for all. All this to continue the legacy of a pale blue dot…",
  riddles: [
    {
      type: "Location",
      text: "Audi & Mercedes waiting, glass buildings you cuss, home to insects but primary to us."
    },
    {
      type: "Clearance Code",
      text: "Amid the grid a symbol lies, BET AN ALPHA “U” see from your eyes. Find the code and you shall reach. The place is well known, where they preach.",
      image: clueImage, // Reference the imported image
      formula: "U (i+j) (i+j)/(j-i)",
      note: "Only i and j are numbers"
    }
  ]
};

// --- Component ---
const CLUE_ID = 4;

function Path1Clue4() {
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
          <span className="clue-text">{clueData.title.split(' ')[0]} </span>
          <span className="clue-digit">{clueData.title.split(' ')[1]}</span>
        </h2>
        
        <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.storyText}</p>

        {clueData.riddles.map((riddle, index) => (
          <div key={index} className="riddle-section">
            <h4>{riddle.type}</h4>
            {riddle.text && <p style={{ whiteSpace: 'pre-wrap' }}>{riddle.text}</p>}
            
            {/* --- NEW: IMAGE RENDERING LOGIC --- */}
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

export default Path1Clue4;