// apps/api-updateLeaderboard/controllers/leaderboard.controller.js
const leaderboardService = require('../services/leaderboard.service');

async function generateLeaderboard(req, res) {
  try {
    const leaderboard = await leaderboardService.updateLeaderboard();
    res.status(200).json({ message: 'Leaderboard updated successfully.', leaderboard });
  } catch (error) {
    console.error('Error in generateLeaderboard controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = { generateLeaderboard };