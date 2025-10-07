// src/pages/AuthScreen.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'; // <-- 1. Import the hook
import './AuthScreen.css';
import Logo from '../components/Logo'; // Use your existing Logo component

function AuthScreen() {
  const { onJoinSuccess } = useOutletContext(); // <-- 2. Get the function from context
  const [showForm, setShowForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: `${phoneNumber}` }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Team not found.');
      }
      onJoinSuccess(data); // Call the function from App.jsx
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`auth-screen ${showForm ? 'show-form' : ''}`}>
      <div className="auth-content">
        <Logo className="auth-logo" />
        <p className="auth-tagline">Mankind was born on Earth but was never meant to die here</p>

        <form className="auth-form" onSubmit={handleJoinTeam}>
          <div className="form-content-wrapper">
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
                disabled={loading}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Joining...' : 'Join Team'}
            </button>
          </div>
        </form>
      </div>

      <footer className="auth-footer">
        <p>PRESENTED BY ASTRONOMY & PHYSICS SOCIETY</p>
      </footer>
    </div>
  );
}

export default AuthScreen;