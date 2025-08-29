// apps/api-updateProgress/controllers/progress.controller.js
const progressService = require('../services/progress.service');

async function updateProgress(req, res) {
  try {
    const { phoneNumber, hintsSolvedCount } = req.body;
    if (!phoneNumber || hintsSolvedCount === undefined) {
      return res.status(400).json({ message: 'phoneNumber and hintsSolvedCount are required.' });
    }
    await progressService.updateTeamProgress(phoneNumber, hintsSolvedCount);
    return res.status(200).json({ message: 'Progress updated successfully.' });
  } catch (error) {
    console.error('Error in updateProgress controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = { updateProgress };