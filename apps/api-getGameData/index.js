// apps/api-getGameData/index.js

const { getGameData } = require('./controllers/game.controller');

/**
 * Main entry point for the getGameData Google Cloud Function.
 * This now passes the request to our controller.
 */
exports.getGameData = getGameData;