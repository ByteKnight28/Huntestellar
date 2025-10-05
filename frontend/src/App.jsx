// src/App.jsx

import React, { useState, useEffect } from 'react';
import SplashScreen from './pages/SplashScreen';
import JoinScreen from './pages/JoinScreen';
import './App.css'; 

function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  // 1. Add state to hold the game data when the user joins.
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []); 

  // 2. Create a handler function to receive data from JoinScreen.
  const handleJoinSuccess = (data) => {
    console.log("Successfully joined! Data:", data);
    setGameData(data); // Save the game data
  };

  // 3. Update the rendering logic
  const renderContent = () => {
    if (showSplash) {
      return <SplashScreen />;
    }
    
    // If we have game data, show the main game. Otherwise, show the join screen.
    if (gameData) {
      // TODO: Create a GameScreen component to display the actual game
      return (
        <div>
          <h1>Welcome, {gameData.teamData.teamName}!</h1>
          <p>Game data loaded. Ready to play!</p>
          <pre>{JSON.stringify(gameData, null, 2)}</pre>
        </div>
      );
    }
    
    // 4. Pass the handler function as a prop to JoinScreen
    return <JoinScreen onJoinSuccess={handleJoinSuccess} />;
  };

  return (
    <div className="app-container">
      {renderContent()}
    </div>
  );
}

export default App;