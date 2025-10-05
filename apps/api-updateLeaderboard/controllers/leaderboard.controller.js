const functions = require('@google-cloud/functions-framework');
const leaderboardService = require('./services/leaderboard.service');

functions.http('updateLeaderboard', async (req, res) => {
    try {
        await leaderboardService.updateLeaderboard();
        res.status(200).send('Leaderboard updated successfully!');
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        res.status(500).send('Internal Server Error');
    }
});