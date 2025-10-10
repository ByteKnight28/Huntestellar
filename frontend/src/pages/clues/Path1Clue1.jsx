// src/pages/clues/Path1Clue1.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css'; // We'll reuse the same CSS for a consistent look
import societyLogo from '../../assets/aps-logo.svg';

// --- Clue Configuration ---
const CLUE_ID = 1;

// --- Clue Data (from your JSON file) ---
const clueData = {
  prologueTitle: "PROLOGUE",
  prologueText: "Voyagers of the Last Light,Your Odyssey awaits, a journey to the stars.\n\nEarth is taking its final breaths. Once our shield, its magnetic core is now breaking apart. But in the midst of this fall, there is a new hope shining in a system far, far away, from a planet “similar” to ours. A wormhole has been opened near Saturn.\n\nYears ago a message was sent to the stars into the abyss without any hope of reply, fortunately it was replied, from a species far superior to us in intelligence. In these dire times our only option was to ask for help and our plea has been answered. An invitation to a different planet in a different star. You are chosen to seek solutions for mankind. To a world where humanity can rise again.\n\nAnd so… your Hunterstellar journey begins through the wormhole, with a little hope and many trials ahead.",
  title: "CLUE 1",
  storyText: "You reach the planet, travelling through space and time. Comms stutter eerily, a whisper from the beings echoes through your ship.\n\n“Coordinates for landing are encrypted and clearance codes are inbound. If you want my aid, you'll need to decrypt them first. Prove your worth, or be left adrift among the stars.”",
  riddles: [
    {
      type: "Coordinates",
      text: "In front of the blue square, the place comes after the yard as well, you'll avoid coming here, maybe that's all I can tell."
    },
    {
      type: "Clearance code - \"XXY\"",
      lines: [
        "X you call a great invention,",
        "But the inventor matters more.",
        "My planet's Schwarzschild is X,",
        "A boundary no one can ignore.",
        "",
        "I gaze upon the sky so cold,",
        "Canis' master draws his bow.",
        "On his belt the clues unfold",
        "Y bright stars put on a show."
      ],
      formula: "(X =(GIF (2GM) / c²))",
      note: "(Use SI Units and standard physics notations…)"
    }
  ]
};

function Path1Clue1() {
  const { gameData, onLogout } = useOutletContext();
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  // If a user tries to access this page without being logged in, redirect them.
  if (!gameData) {
    return <Navigate to="/" replace />;
  }

  // --- THIS IS THE FIX ---
  // 1. Get the current clue's key dynamically from the gameData object.
  // The API sends `currentProgress` which is the index (0 for the first clue).
  const CORRECT_KEY = gameData.gameContent[gameData.currentProgress].key;

  const handleSubmitKey = (event) => {
    event.preventDefault();
    setError('');

    // 2. Compare the user's input with the dynamically fetched correct key.
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
        {/* --- Prologue Section --- */}
      <div className="prologue">
        <h3>{clueData.prologueTitle}</h3>
        <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.prologueText}</p>
      </div>

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
            {riddle.note && <small style={{ whiteSpace: 'pre-wrap' }}>{riddle.note}</small>}
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

export default Path1Clue1;