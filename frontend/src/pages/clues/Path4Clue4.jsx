// src/pages/clues/Path4Clue4.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';

// --- NEW: IMPORT YOUR IMAGES HERE ---
// import clueImage1 from '../../assets/your_clue4_qr1.png';
// import clueImage2 from '../../assets/your_clue4_qr2.png';

// --- Clue Data ---
const clueData = {
  title: "CLUE 4",
  storyText: "You retrieve the final log. The scientist's hologram looks weary but hopeful. \"You are worthy,\" He says. \"The Planet is not a grand world. It is an enriched soil, with powerful tides made from the concentrated energy of a collapsed star. It is hidden in the final location. Soldiers, now it's time to show your potential to decrypt the code.\n\nIf the number is less than 50 then reverse it else read the same number. Ex-23->32,12->21,50->50,99->99",
  riddles: [
    {
      type: "MAP GUIDANCE",
      text: "48-79-78-65-38-73-48\n(Hint:Decrypt and Rearrange the code to find the hidden location.)\n\nLife is a Circle, Reach to Earth fast… You will find some agents there standing at the gate who will ask you for the password!",
    //   images: [clueImage1, clueImage2]
    },
    {
      type: "ANSWER TO BE ENTERED",
      text: "“You got to know about a villain when you were at the previous log and the name of that villain is your Password.\" (Write the name in reverse order!!!)"
    }
  ]
};

// --- Component ---
const CLUE_ID = 4;

function Path4Clue4() {
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
            
            {/* --- NEW: MULTIPLE IMAGE RENDERING LOGIC --- */}
            {riddle.images && riddle.images.map((imgSrc, imgIndex) => (
              <img key={imgIndex} src={imgSrc} alt={`Clue visual ${imgIndex + 1}`} className="clue-image" />
            ))}
            
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

export default Path4Clue4;