// apps/api-updateProgress/index.js

/**
 * This file is the entry point for the 'updateProgress' Google Cloud Function.
 * It exports the main controller function that handles HTTP requests.
 */
const { updateProgress } = require('./controllers/progress.controller');

exports.updateProgress = updateProgress;