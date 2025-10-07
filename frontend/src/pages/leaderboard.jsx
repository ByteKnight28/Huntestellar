import React from 'react';
import './Leaderboard.css';
import Logo from '../components/Logo.jsx'; // Imports the Logo component

const Leaderboard = () => {
  // Dummy data for the leaderboard
  const leaderboardData = [
    { name: 'Team Name', score: 87 },
    { name: 'Team Name', score: 87 },
    { name: 'Team Name', score: 87 },
    { name: 'Team Name', score: 87 },
    { name: 'Team Name', score: 87 },
    { name: 'Team Name', score: 87 },
    { name: 'Team Name', score: 87 },
  ];

  return (
    // A main wrapper for the whole page content
    <div className="page-wrapper">
      <header className="page-header">
        <span className="header-title">Your Hunt Path</span>
        {/* Uses the Logo component instead of an img tag */}
        <Logo className="header-logo" />
      </header>

      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h1 className="leaderboard-title">LEADERBOARD</h1>
          <p className="leaderboard-subtitle">
            Mankind was born on Earth but was never meant to die here
          </p>
        </div>
        <ol className="leaderboard-list">
          {leaderboardData.map((entry, index) => {
            let itemClass = 'leaderboard-item';
            if (index === 0) {
              itemClass += ' first-place';
            } else if (index === 1) {
              itemClass += ' second-place';
            }

            return (
              <li key={index} className={itemClass}>
                <span className="rank">{index + 1}.</span>
                <span className="team-name">{entry.name}</span>
                <span className="score">{entry.score}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;