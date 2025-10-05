// apps/api-updateLeaderboard/index.js

const leaderboardService = require('./services/leaderboard.service');

/**
 * Main entry point for the Cloud Function.
 * Handles HTTP requests to trigger a leaderboard update.
 * This function can be triggered by a scheduler (e.g., Cloud Scheduler) or a manual HTTP call.
 *
 * @param {Object} req Cloud Functions request context.
 * @param {Object} res Cloud Functions response context.
 */
exports.updateLeaderboard = async (req, res) => {
  try {
    // Call the service to perform the leaderboard update logic
    await leaderboardService.updateLeaderboard();
    
    console.log("Leaderboard update completed successfully.");
    return res.status(200).json({ message: 'Leaderboard updated successfully.' });

  } catch (error) {
    console.error('Error in updateLeaderboard function:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};