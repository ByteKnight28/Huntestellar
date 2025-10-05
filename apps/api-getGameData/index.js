// apps/api-getGameData/index.js

/**
 * This file is the entry point for the 'getGameData' Google Cloud Function.
 * It exports the main controller function that handles HTTP requests.
 */
const { getGameData } = require('./controllers/game.controller');

exports.getGameData = getGameData;