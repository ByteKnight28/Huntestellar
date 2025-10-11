// src/App.jsx
import React, { useState, useEffect, Suspense } from 'react'; // 1. Import Suspense
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [gameData, setGameData] = useState(null);
  const navigate = useNavigate();

  // On app start, check for a saved session in localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
      setGameData(JSON.parse(savedData));
    }
  }, []);

  const handleJoinSuccess = (data) => {
    localStorage.setItem('gameData', JSON.stringify(data));
    setGameData(data);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('gameData');
    setGameData(null);
    navigate('/');
  };

  useEffect(() => {
    if (gameData) {
      navigate('/starjourney');
    }
  }, [gameData, navigate]);

  return (
    <div className="app-container">
      {/* 2. Wrap the Outlet in a Suspense component with a fallback */}
      <Suspense fallback={<div className="loading-fallback">Loading Mission...</div>}>
        <Outlet context={{ onJoinSuccess: handleJoinSuccess, gameData, onLogout: handleLogout }} />
      </Suspense>
    </div>
  );
}

export default App;