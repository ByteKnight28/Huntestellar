// src/pages/clues/path2clue4.jsx
import React, { useState } from 'react';
import { useOutletContext, useNavigate, Navigate } from 'react-router-dom';
import SHA256 from 'crypto-js/sha256';
import '../CluePage.css';
import societyLogo from '../../assets/aps-logo.svg';
import clueImage from '../../assets/images/2Clue4.jpg';
// --- Clue Configuration ---
const CLUE_ID = 4;

// --- Clue Data (PASTE YOUR NEW DATA HERE) ---
const clueData = {
  title: "CLUE 4",
  storyText: "The ship's sensors screamed to life. A pale turquoise world, haloed in shimmering rings and bathed in distant starlight.\n\nAtmosphere: breathable.\nTemperature: stable.\nMagnetic field: unusually strong.\n\nIt's a remnant of an ancient civilization gone extinct by volcano eruption.\nYou search for its coordinates but all you find is an alien transmission.\n\n“We are the inhabitants of this world.\n If you are seeing this message, it means we are gone.\n Our home once thrived, but the fire beneath our world rose faster than we could escape. The eruption ended our age, and with it, our kind.\nBefore the end, we built a system, a machine that will reshape the land, renew the air, and make this planet ready for life once more.\nTo guide those who might come after us, we created an artificial intelligence.\n It has been programmed to communicate in a form you would understand.\nTo bridge our worlds, it imitates one of your own, a historical being of wisdom and reason.\nThrough that voice, it will reveal our world's coordinates.\nYou may call it the World of The Fire.”",
  riddles: [
    {
      type: "",
      image: clueImage
    },
    {
      type: "Map Guidance",
      text: "Salvete, voyagers of time and space.\n\nI extend to you the code of salvation , an encrypted script, use my cipher to unveil the place you so ardently seek.\n\nIn this realm where hope and despair, light and darkness entwine in fragile balance, the keys to the decryption are different for each word, first the number of white leaves, then number of dark leaves, then the difference between white and dark, look closely at the picture.\n\nDecode this message, and your destination shall unfold before you.\n\n“VUL DIVS ILYH”"
    },
    {
      type: "For the Answer to be Entered",
      text: "X is the product of the number of light leaves and dark leaves that I have.\nAnd Y is the answer to the ultimate question of life.\nReport X + Y"
    }
  ]
};

// --- Component ---
function Path2Clue4() {
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
          <span className="clue-text" style={{color:'rgb(214, 90, 28)'}}>{clueData.title.split(' ')[0]} </span>
          <span className="clue-digit" style={{color:'rgb(214, 90, 28)'}}>{clueData.title.split(' ')[1]}</span>
        </h2>
        
        <p style={{ whiteSpace: 'pre-wrap' }}>{clueData.storyText}</p>

        {clueData.riddles.map((riddle, index) => (
          <div key={index} className="riddle-section" style={{ borderLeft: '3px solid rgb(192, 80, 25)' }}>
            <h4 style={{color:'rgb(214, 90, 28)',whiteSpace: 'pre-wrap'}}>{riddle.type}</h4>
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

export default Path2Clue4;