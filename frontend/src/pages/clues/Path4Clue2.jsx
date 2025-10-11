// src/pages/clues/Path4Clue2.jsx
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
    storyText: "Impressive. You have found the first key but the planet is still protected. I hide your next clue where laughter bounces off the wall, paddles clap and tiny balls take flight. Not a classroom, all students gather here for board, buzz and friendly fights.",
    riddles: [
      {
        type: "MAP GUIDANCE",
        text: "“In iron nights and circuitry dawn,\nWhere sparks awaken and metal rivers brawn.\nTwo banners clash, one fights for freedom's right,\nIt is the forged world where giants wake to fight.”"
      },
      {
        type: "ANSWER TO BE ENTERED",
        text: "CIGAR and LEMMON are two stars and CIGAR is X times as far from Earth as LEMMON. If both stars have the same luminosity, CIGAR is Y times dimmer than LEMMON. Where X is the sum of all the digits of the pincode of your college. Think about your JEE Days and study and apply some common sense - https://smplu.link/study-material",
        formula: "What is the value of \n(Y-20(X))*(X-Y)"
      }
    ]
  };

// --- Component ---
function Path4Clue2() {
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
            {riddle.formula && <code style={{ whiteSpace: 'pre-wrap' }}>{riddle.formula}</code>}
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

export default Path4Clue2;