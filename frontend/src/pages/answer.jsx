import React, { useState } from 'react';
import './answer.css'; // Import the CSS file

const Answer = () => {
  // State to hold the value of the input field
  const [userAnswer, setUserAnswer] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default page refresh
    alert(`Your answer was: ${userAnswer}`);
    // You can add your answer verification logic here
    setUserAnswer(''); // Optionally clear the input field after submission
  };

  return (
    <div className="answer-container">
      {/* Header Section */}
      <header className="answer-header">
        <div className="back-icon">&lt;</div>
        <h2 className="header-title">Answer</h2>
        {/* Placeholder for the circular logo on the right */}
        <div className="logo">
            <img src="\src\assets\aps-logo.svg" alt="Your App Logo"></img>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <h1 className="clue-title">CLUE IV</h1>
        
        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="text"
            placeholder="Enter your answer here"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Submit Answer
          </button>
        </form>

        <p className="story-text">
          Earth was dying—its core failing, storms unending, oceans rising. Humanity's only hope was to seek a new home among the stars.
        </p>
      </main>
    </div>
  );
};

export default Answer;