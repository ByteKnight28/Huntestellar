// src/pages/clues/Path3Clue4.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';

// --- Clue Configuration ---
const CLUE_ID = 4;

// --- Clue Data (PASTE YOUR NEW DATA HERE) ---
const clueData = {
    title: "CLUE 4",
    storyText: "The pursuit to here was a tiring one and then meeting with Whatney, the moment was historic but not worth celebrating, and for him Milk Cake time was over, he finally had some good food (Definitely not Mess' Food). He showcased his discoveries, which were exceptionally good showing great signs for it being a potential new home for Humans, here is where we will plant foundations of our new home.\n\nNow the crucial stage of the mission arrives, the question is will mankind continue to thrive, we have to go through the test of time, the mission objective is to save the bees and the hive. This is where you have to bring the humans out of earth, reach the Room No.\n\nhttps://youtu.be/_r7Ho0BaPHY?t=630",
    riddles: [
      {
        type: "What do you need to answer",
        text: "What is something that makes us human, how do we define that we are humans! We are defined by achieving the…..! This is the mission Hunterstellar! And you know what, we have achieved something, which only humans can. Let's save Planet Earth. Remember Cooper"
      }
    ]
  };

// --- Component ---
function Path3Clue4() {
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

export default Path3Clue4;