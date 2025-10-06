// apps/api-getGameData/controllers/game.controller.js

const gameService = require('../services/game.service');

async function getGameData(req, res) {
  // --- START CORS LOGIC ---
  // Set CORS headers to allow requests from any origin
  // In production, you should replace '*' with your actual frontend URL (e.g., 'https://your-app-name.vercel.app')
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }
  // --- END CORS LOGIC ---

  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required.' });
    }
    const gamePackage = await gameService.buildGamePackage(phoneNumber);
    if (!gamePackage) {
      return res.status(404).json({ message: 'Team not found.' });
    }
    return res.status(200).json(gamePackage);
  } catch (error) {
    console.error('Error in getGameData controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { getGameData };