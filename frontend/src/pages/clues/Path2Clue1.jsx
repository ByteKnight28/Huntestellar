// src/pages/clues/path2clue1.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';

// --- Clue Configuration ---
const CLUE_ID = 1;

// --- Clue Data (PASTE YOUR NEW DATA HERE) ---
const clueData = {
    prologueTitle: "Prologue",
    prologueText: "Rangers, saviors of our planet, listen closely. Your path is that of Endless Whispers.\n\nThe era of Earth is over. The very heart of our world, the molten core, has failed. The geomagnetic field, our shield for millennia, has utterly collapsed leaving the surface bathed in lethal cosmic radiation.\n\nWith no map, no guidance, and not knowing where to start, you stare at your console, uncertainty pressing in. Then, a flicker. An unknown signal breaches your systems, no signature, no traceable origin. Letters etch themselves across your screens like burning frost.\n\nIt is the first Whisper….",
    title: "CLUE 1",
    // No separate storyText provided, the clue consists of riddles.
    riddles: [
      {
        type: "Location On Campus",
        text: "“The journey begins where young hearts stay,\nA dwelling of dawn at the start of their way.\nWhere silence once held a single song,\nNow two share space that feels too small.\nA great adventure waits beyond the void's call.”"
      },
      {
        type: "Map Guidance",
        text: "“Moves round and round in endless play,\nChasing night, embracing day.\nForged by hands, yet drifts anew,\nAlways there, yet out of view.”"
      },
      {
        type: "Answer to be entered",
        text: "“The signal is clear, you must find a new home,\nYour Answer is XY a two digit number,\nWhere X is the speed that beats the gravity's dome of the planet with\nMass = 1.5 * 10^24 kgs and radius = 5000 km. X (nearest integer)(in km/s)\nAnd Y is the number of letters in the abbreviation of our lecture hall building."
      }
    ]
  };

// --- Component (No changes needed below) ---
function Path2Clue1() {
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
        {/* --- Prologue Section (will now render) --- */}
        {clueData.prologueText && (
          <div className="prologue">
            <h3 style={{color:'rgb(214, 90, 28)'}}>{clueData.prologueTitle}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.prologueText}</p>
          </div>
        )}

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

export default Path2Clue1;