// apps/api-getGameData/controllers/game.controller.js

const gameService = require('../services/game.service');

/**
 * Handles the GET /gameData request.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
async function getGameData(req, res) {
  try {
    // Get the phone number from the request's body
    const { phoneNumber } = req.body;

    // Check if a phone number was provided
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required.' });
    }

    // Call the service to do the actual work
    const gamePackage = await gameService.buildGamePackage(phoneNumber);

    // If the service returns nothing, the team wasn't found
    if (!gamePackage) {
      return res.status(404).json({ message: 'Team not found.' });
    }

    // Success! Send the game data back to the app
    return res.status(200).json(gamePackage);

  } catch (error) {
    console.error('Error in getGameData controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { getGameData };