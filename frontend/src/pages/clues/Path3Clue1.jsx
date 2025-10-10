// src/pages/clues/Path3Clue1.jsx
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
    prologueText: "Now my commandos, just listen, this is mankind's last hope, the final Mission as our Mother Earth begins to die of instability in the magnetic core, nature gives out a cry! You are my soldiers leading the species, it is not just your country, it is the mission of Hunterstellar! Let us begin the Hunt of our new home; The mission starts now!",
    title: "CLUE 1",
    riddles: [
      {
        type: "Location On Campus",
        text: "An entity not so far away, Just like a break's detour,You guys might not be welcomed but it opens soon. It can become your place of the First Meal"
      },
      {
        type: "Map Guidance",
        text: "The day when animals are not devoured,The fun begins of the end, It has something which makes a couple paired."
      },
      {
        type: "Answer to be Entered",
        text: "Now, to move ahead in the mission, you need to guess what was the name of NASA's futuristic fly which was swallowed by the entity you are searching for right now! There opens a portal to our potential new home, a wormhole saving our time and to reach fast is our goal.",
        note: "Answer in one word, make sure the spelling is right!"
      }
    ]
  };

// --- Component ---
function Path3Clue1() {
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
        {clueData.prologueText && (
          <div className="prologue">
            <h3 style={{color:'rgb(50, 205, 50)'}}>{clueData.prologueTitle}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.prologueText}</p>
          </div>
        )}

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
            {/* --- THIS LINE IS NOW FIXED --- */}
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

export default Path3Clue1;