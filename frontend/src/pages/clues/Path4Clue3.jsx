// src/pages/clues/Path4Clue3.jsx
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
    storyText: "The next log flickers to life. The scientist's face is grim. \"The storm is accelerating\" He says. \"The WTF is locked in a secure riddle. To open it, you need to access my personal archive, where I stored the decryption key. There is a rocket ready to go, which doesn't have thrust and fuel is low, you might have seen this location twice in a week\"",
    riddles: [
      {
        type: "MAP GUIDANCE",
        text: "“It is an entity just like our home planet Earth, but here the time is very slow just because of a supermassive villain which slows its motion by its huge pull by a phenomenon discovered by Newton”"
      },
      {
        type: "ANSWER TO BE ENTERED TO UNLOCK THE VAULT",
        text: "“I am the dust of a rusty world, where an old ocean's story is curled. I feel no rain, but a chilling wind's bite, and I hold the secrets of ancient light.” Name of that dust??"
      }
    ]
  };

// --- Component ---
function Path4Clue3() {
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
          <span className="clue-text" style={{color:'rgb(220, 20, 60)'}}>{clueData.title.split(' ')[0]} </span>
          <span className="clue-digit" style={{color:'rgb(220, 20, 60)'}}>{clueData.title.split(' ')[1]}</span>
        </h2>
        
        <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.storyText}</p>

        {clueData.riddles.map((riddle, index) => (
          <div key={index} className="riddle-section" style={{ borderLeft: '3px solid rgb(180, 15, 50)' }}>
            <h4 style={{color:'rgb(220, 20, 60)'}}>{riddle.type}</h4>
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

export default Path4Clue3;