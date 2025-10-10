// src/pages/clues/Path3Clue3.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';
// import clueImage from '../../assets/your_clue3_qrcode.png'; 
// --- Clue Configuration ---
const CLUE_ID = 3;

// --- Clue Data (PASTE YOUR NEW DATA HERE) ---
const clueData = {
  title: "CLUE 3",
  storyText: "Leaving the Death Star behind now we start our journey in Columbus - faster and stealthier, saving years and centuries of time, because the planet's dying in some time. We will go to a planet you will find no moon, where our Dr. Mark Whatney resides - it is not Mars nor Venus, it is something which you will discover soon.\n\nYou have to visit a familiar place, the place newly found is a complete package in it. Go on search descending down the other gradient, crossing the stream and find the space of infinite possibilities, the place in space which we call Earth's neighbourhood.",
  riddles: [
    {
      type: "Answer To be entered",
      text: "On Mars, it was potatoes, here something sweet, what he has to eat, is your challenge to beat. Wandering here and there, in search of the planet WTF - Whatney's Terrestrial Find. Our brave warrior sent years ago for any emergencies like this had discovered this planet.\n\nGot It! Got It! You have found the planet! You can see it in front of you, the comms have connected to the base command of the planet, And Mark asks you!\n\n“What is my favourite delicacy known in India?” And you are puzzled, then he sends an encrypted message, you have to decode and give him the answer in a language we are conversing in right now! But remember one thing: this planet's linguistics are completely reversed. We say Hello! They say olleh! Everything is flipped in their language, even their math! His challenge is that he has Reverse the Deserver! But nothing's straight. In this Interstellar Journey - May the force be with you!",
      // image: clueImage
    }
  ]
};

// --- Component ---
function Path3Clue3() {
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

export default Path3Clue3;