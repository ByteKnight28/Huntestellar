import React from 'react';
import './CluePage.css';

const CluePage = () => {
  return (
    <div className="clue-page-container">
      <header className="clue-header">
        <div className="header-group"></div>
        <div className="back-arrow">&lt;</div>
        <h1 className="header-text">Your Journey</h1>
        <div className="logo">
            <img src="\src\assets\APS_SVG 1.svg" alt="Your App Logo"></img>
        </div>
      </header>

      <main className="clue-content">
        {/* UPDATED: "CLUE" and "1" are now in separate spans */}
        <h2 className="clue-number">
          <span>CLUE </span>
          <span className="clue-digit">I</span>
        </h2>
        
        <h3 className="clue-title">PROLOGUE</h3>
        <p>
          Earth was dying—its core failing, storms unending, oceans rising.
          Humanity's only hope was to seek a new home among the stars.
        </p>
        <p>
          For months your ship drifted through the void, searching, scanning,
          but finding nothing. Hope thinned with each passing day, as the crew
          gazed out at endless darkness, knowing their world was already lost....
        </p>
        <p>
          ...Then it came. A signal. Faint, fractured, carried on waves beyond
          the known spectrum. No beacon should exist this far from home...yet
          the transmission pulsed with purpose, as though waiting for you....
        </p>
        <p>
          It was no promise of safety, no voice of comfort. It was older,
          darker, something that should not be. And yet, within its haunting
          message lay a direction... a chance, perhaps, for renewal...
        </p>
      </main>

      <footer className="clue-footer">
        <button className="scan-button">Scan QR to Answer</button>
      </footer>
    </div>
  );
};

export default CluePage;