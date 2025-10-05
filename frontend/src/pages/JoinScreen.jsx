// src/pages/JoinScreen.jsx
import React, { useState } from 'react';
import './JoinScreen.css';
import Logo from '../components/logo';

// 1. Accept a new prop `onJoinSuccess` to handle successful logins
function JoinScreen({ onJoinSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJoinTeam = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://asia-south1-treasurhunt.cloudfunctions.net/getGameData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 2. The backend expects `phoneNumber` as the key.
        body: JSON.stringify({ phoneNumber: `${phoneNumber}` }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Use the message from the API's JSON response, or a default one
        throw new Error(data.message || 'Team not found or an error occurred.');
      }
      
      console.log('API Success:', data);
      
      // 3. Instead of an alert, call the function passed from the parent App
      // This passes the game data up to the main App component.
      onJoinSuccess(data);

    } catch (err) {
      setError(err.message);
      console.error('API call failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-screen">
      <div className="join-content">
        <Logo className="title" />
        <form className="join-form" onSubmit={handleJoinTeam}>
          <label htmlFor="phone-number">Enter your Team Leader's Phone Number</label>
          <div className="phone-input-wrapper">
            <span>+91</span>
            <input
              id="phone-number"
              type="tel"
              placeholder="98XXXXXXXX"
              maxLength="10"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          {/* Display the error message if it exists */}
          {error && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          
          <button type="submit" disabled={loading}>
            {/* Change button text based on loading state */}
            {loading ? 'Joining...' : 'Join Team'}
          </button>
        </form>
      </div>
      <footer className="footer">
        <p>PRESENTED BY ASTRONOMY & PHYSICS SOCIETY</p>
      </footer>
    </div>
  );
}

export default JoinScreen;