const progressService = require('../services/progress.service');

async function updateProgress(req, res) {

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }
  
  try {
    const { phoneNumber, hintsSolved } = req.body;
    if (!phoneNumber || hintsSolved === undefined) {
      return res.status(400).json({ message: 'Both phoneNumber and hintsSolved are required.' });
    }
    await progressService.updateTeamProgress(phoneNumber, hintsSolved);
    return res.status(200).json({ message: 'Progress updated successfully.' });
  } catch (error) {
    console.error('Error in updateProgress controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { updateProgress };