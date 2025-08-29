// apps/api-updateLeaderboard/index.js
const { generateLeaderboard } = require('./controllers/leaderboard.controller');
exports.updateLeaderboard = generateLeaderboard;