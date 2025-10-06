// apps/api-getGameData/services/game.service.js

const { getSheetsInstance } = require('../lib/sheets.client');
const crypto = require('crypto'); // <-- 1. Import the crypto library

async function buildGamePackage(phoneNumber) {
  // ... (The code to fetch data from the sheets remains the same) ...
  const sheets = await getSheetsInstance();
  const regRange = `'Registrations'!A:Z`;
  const registrationsResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: '1r2qv-X3ktDsH_MTLMlddvWTyBGifvaUP2wp3tvOI8dY', range: regRange,
  });
  const allRows = registrationsResponse.data.values || [];
  if (allRows.length === 0) { return null; }
  const headers = allRows.shift();
  const phoneIndex = headers.indexOf("Team Leader's Phone Number");
  const teamRow = allRows.find(row => row[phoneIndex] === phoneNumber);
  if (!teamRow) { return null; }

  // ... (The code to fetch progress remains the same) ...
  const progressRange = `'GameProgress'!A:B`;
  const progressResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: '1r2qv-X3ktDsH_MTLMlddvWTyBGifvaUP2wp3tvOI8dY', range: progressRange,
  });
  const progressRow = progressResponse.data.values?.find(row => row[0] === phoneNumber);
  const currentProgress = progressRow ? parseInt(progressRow[1], 10) : 0;
  
  const teamData = {
    phoneNumber: teamRow[headers.indexOf("Team Leader's Phone Number")],
    teamName: teamRow[headers.indexOf('Team Name')],
    assignedPath: teamRow[headers.indexOf('Path')],
  };

  // --- 2. HASHING LOGIC ---
  // A helper function to hash a string using SHA-256
  const hashAnswer = (answer) => {
    if (!answer) return null; // Handle empty answer cells
    return crypto.createHash('sha256').update(answer.toLowerCase().trim()).digest('hex');
  };

  // Create the game content, but hash the answers
  const gameContent = [
    {
      hintIndex: 1,
      hintImageUrl: hashAnswer(teamRow[headers.indexOf('Clue1_URL')]),
      answer: hashAnswer(teamRow[headers.indexOf('Clue1_Answer')]),
    },
    {
      hintIndex: 2,
      hintImageUrl: hashAnswer(teamRow[headers.indexOf('Clue2_URL')]),
      answer: hashAnswer(teamRow[headers.indexOf('Clue2_Answer')]),
    },
    {
      hintIndex: 3,
      hintImageUrl: hashAnswer(teamRow[headers.indexOf('Clue3_URL')]),
      answer: hashAnswer(teamRow[headers.indexOf('Clue3_Answer')]),
    },
    {
      hintIndex: 4,
      hintImageUrl: hashAnswer(teamRow[headers.indexOf('Clue4_URL')]),
      answer: hashAnswer(teamRow[headers.indexOf('Clue4_Answer')]),
    },
  ];

  const gamePackage = {
    teamData,
    gameContent,
    currentProgress,
  };

  return gamePackage;
}

module.exports = { buildGamePackage };