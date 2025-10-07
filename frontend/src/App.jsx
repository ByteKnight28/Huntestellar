// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [gameData, setGameData] = useState(null);
  const navigate = useNavigate();

  // 1. --- CHECK FOR A SAVED SESSION ON APP LOAD ---
  useEffect(() => {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
      // If we find saved data, parse it and set it as our gameData
      setGameData(JSON.parse(savedData));
    }
  }, []); // The empty array [] means this runs only once when the app starts

  // This function is called from AuthScreen on a successful login
  const handleJoinSuccess = (data) => {
    console.log("Successfully joined! Saving data to state and localStorage:", data);
    // 2. --- SAVE THE SESSION ON LOGIN ---
    // Save the data to localStorage (must be a string)
    localStorage.setItem('gameData', JSON.stringify(data));
    // Save the data to React state to trigger a re-render
    setGameData(data);
  };

  // 3. --- CREATE A LOGOUT FUNCTION ---
  const handleLogout = () => {
    console.log("Logging out and clearing session.");
    // Remove the data from localStorage
    localStorage.removeItem('gameData');
    // Reset the state and navigate back to the login screen
    setGameData(null);
    navigate('/');
  };

  useEffect(() => {
    // This effect now navigates based on whether gameData exists
    if (gameData) {
      // If gameData is set (either from login or localStorage), go to the game.
      navigate('/starjourney');
    }
  }, [gameData, navigate]);

  return (
    <div className="app-container">
<<<<<<< HEAD
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
=======
      {/* Pass the gameData and the logout function to all child routes */}
      <Outlet context={{ onJoinSuccess: handleJoinSuccess, gameData, onLogout: handleLogout }} />
>>>>>>> c5d05a724428351a134da6e9b281c993bbc2e64e
    </div>
  );
}

export default App;
<<<<<<< HEAD
=======

// // src/App.jsx
// import React from 'react';
// import './App.css';

// // 1. Make sure this import path is CORRECT.
// //    If Answer.jsx is in a 'components' folder, the path should be './components/Answer.jsx'
// import Answer from './pages/answer.jsx'; 

// function App() {
//   // 2. We are now returning the Answer component directly,
//   //    bypassing the login logic.
//   return (
//     <Answer />
//   );
// }

// export default App;
>>>>>>> c5d05a724428351a134da6e9b281c993bbc2e64e
