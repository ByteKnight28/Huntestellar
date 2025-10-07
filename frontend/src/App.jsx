// src/App.jsx
import React, { useState } from 'react';
import AuthScreen from './pages/AuthScreen.jsx';
import './App.css';

function App() {
  const [gameData, setGameData] = useState(null);

  // This function is called by AuthScreen on a successful login
  const handleJoinSuccess = (data) => {
    console.log("Successfully joined! Data:", data);
    setGameData(data);
  };

  return (
    <div className="app-container">
      {/* If we have game data, show the Welcome message.
        Otherwise, show the AuthScreen and pass it the success handler function.*/
      }
      {gameData ? (
        <div>
          <h1>Welcome, {gameData.teamData.teamName}!</h1>
          <p>Game data loaded. Ready to play!</p>
        </div>
      ) : (
        <AuthScreen onJoinSuccess={handleJoinSuccess} />
      )}
    </div>
  );
}

export default App;
