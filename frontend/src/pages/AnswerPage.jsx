// src/pages/AnswerPage.jsx
import React, { useState } from 'react';
import { useOutletContext, useParams, useNavigate, Navigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './answer.css'; 

const planetDataMap = {
  '1': { name: "ORION'S ODYSSEY", color: 'deepskyblue' },
  '2': { name: 'ENDLESS WHISPERS', color: 'rgba(233, 78, 0, 1)' },
  '3': { name: "WHATNEY'S VOYAGE", color: 'limegreen' },
  '4': { name: "BOHR'S FRONTIER", color: 'crimson' }
};

function AnswerPage() {


  const { pathId, clueId } = useParams();
  const { gameData, onJoinSuccess } = useOutletContext();
  const navigate = useNavigate();
  const assignedPath = gameData?.teamData?.assignedPath;
  const planetInfo = planetDataMap[assignedPath];
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!gameData) {
    return <Navigate to="/" replace />;
  }

  const handleSubmitAnswer = async (event) => {
    event.preventDefault();
    setError('');

    // 1. Get the correct HASHED answer from the gameData object.
    const correctAnswerHash = gameData.gameContent[gameData.currentProgress].answer;

    // 2. Hash the user's input to see if it matches.
    const userAnswerHash = CryptoJS.SHA256(answer.toLowerCase().trim()).toString();

    // 3. Compare the hashes on the frontend FIRST.
    if (userAnswerHash !== correctAnswerHash) {
      setError('Incorrect answer. Please try again.');
      return; // Stop the function if the answer is wrong.
    }
    
    // 4. If the hashes match, THEN call the API to update the player's progress.
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_UPDATE_PROGRESS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: gameData.teamData.phoneNumber,
          // THIS IS THE FIX: Send 'hintsSolved' with the clueId as its value.
          hintsSolved: clueId,
        }),
      });

      const update = await fetch(import.meta.env.VITE_API_GET_GAME_DATA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: gameData.teamData.phoneNumber}),
      });

      const updatedData = await update.json();

      if (!update.ok) {
        throw new Error(updatedData.message || 'Could not update progress on the server.');
      }

      console.log('Progress updated successfully!', updatedData);
      // Update the global state with the new data from the server.
      onJoinSuccess(updatedData);
      // The `useEffect` in App.jsx will automatically redirect to /starjourney.

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clue-page-container">
      <header className="clue-header">
        <div className="back-arrow" onClick={() => navigate(-1)}>&lt;</div>
        <h1 className="header-text">SUBMIT ANSWER</h1>
      </header>

      <main className="clue-content">
        <h2 className="clue-number" style={{ color: planetInfo.color }}>
          <span className="clue-text">CLUE </span>
          <span className="clue-digit" style={{fontFamily:'Bebas Neue'}} >{clueId}</span>
        </h2>
        
        <form onSubmit={handleSubmitAnswer} className="key-form">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter Final Answer"
            className="key-input"
            disabled={loading}
          />
          <button type="submit" className="scan-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Answer'}
          </button>
          {error && <p className="error-message" style={{color: 'red', marginTop: '1rem'}}>{error}</p>}
        </form>
      </main>
    </div>
  );
}

export default AnswerPage;