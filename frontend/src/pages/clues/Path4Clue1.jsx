// src/pages/clues/Path4Clue1.jsx
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
    prologueText: "Earth once alive with storms, tides, and the heartbeat of magma now drifts cold and hollow. The oceans have turned to glassy plains, the skies hang heavy with ash, and the stars glare down like indifferent eyes. The core of the fire that sustained us is gone. The magnetic field that once guarded our fragile world has fallen silent, leaving humanity naked beneath a storm of cosmic knives but…\n\n“ WE ARE NOT FINISHED ”",
    title: "CLUE 1",
    storyText: "Through the wormhole a holographic message flickers to life. A mysterious ship appears, a scientist from a long-lost civilization. \"Your help is here\" they say, \"but to survive the extinction and save your civilization, you must prove your worth. The Planet of WTF (Waypoint Twenty Four)  is the only component strong enough to save your Humanity. It is hidden in plain sight, its secrets protected by my trials. Your travel begins through the wormhole the way of your return. Find the first clue in the place where you stand in a long queue for something that you don't like !”",
    riddles: [
      {
        type: "MAP GUIDANCE",
        text: "Dusty hair I grow, a traveler with a frozen heart,\nHaloed in gas, I trace pale arcs in the dark.\nMy name, in ancient tongues, means 'smoky star,'\nKepler knew my path, long ovals drawn afar."
      },
      {
        type: "ANSWER TO BE ENTERED",
        text: "My pioneers, to move forward in your mission you have to answer this... I am an island adrift in the cosmic void, a trillion voices singing as one. My form has no spirals, no sharp corners, smooth, stretched, and perfectly balanced. I am in the shape of an _______?"
      }
    ]
  };

// --- Component ---
function Path4Clue1() {
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
            <h3 style={{color:'rgb(220, 20, 60)'}}>{clueData.prologueTitle}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.prologueText}</p>
          </div>
        )}

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

export default Path4Clue1;