// apps/api-getGameData/services/game.service.js

const { getSheetsInstance } = require('../lib/sheets.client');

const SPREADSHEET_ID = '1r2qv-X3ktDsH_MTLMlddvWTyBGifvaUP2wp3tvOI8dY';
const REGISTRATIONS_SHEET_NAME = 'Registrations';
const GAME_PROGRESS_SHEET_NAME = 'GameProgress';

async function buildGamePackage(phoneNumber) {
  const sheets = await getSheetsInstance();

  // 1. Fetch all data from the Registrations sheet
  const regRange = `'${REGISTRATIONS_SHEET_NAME}'!A:Z`; // Read all possible columns
  const registrationsResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID, range: regRange,
  });
  const allRows = registrationsResponse.data.values || [];

  if (allRows.length === 0) {
    return null; // Sheet is empty
  }

  // 2. Find the correct row for the team
  const headers = allRows.shift(); // Get the header row to find column indexes
  const phoneIndex = headers.indexOf("Team Leader's Phone Number");
  const teamRow = allRows.find(row => row[phoneIndex] === phoneNumber);

  if (!teamRow) {
    return null; // Team not found
  }

  // 3. Fetch the team's current progress (this logic remains the same)
  const progressRange = `'${GAME_PROGRESS_SHEET_NAME}'!A:B`;
  const progressResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID, range: progressRange,
  });
  const progressRow = progressResponse.data.values?.find(row => row[0] === phoneNumber);
  const currentProgress = progressRow ? parseInt(progressRow[1], 10) : 0;

  // 4. Parse the single team row into the game package
  const teamData = {
    phoneNumber: teamRow[headers.indexOf("Team Leader's Phone Number")],
    teamName: teamRow[headers.indexOf('Team Name')],
    assignedPath: teamRow[headers.indexOf('Path')],
  };

  const gameContent = [
    {
      hintIndex: 1,
      hintImageUrl: teamRow[headers.indexOf('Clue1_URL')],
      answer: teamRow[headers.indexOf('Clue1_Answer')],
    },
    {
      hintIndex: 2,
      hintImageUrl: teamRow[headers.indexOf('Clue2_URL')],
      answer: teamRow[headers.indexOf('Clue2_Answer')],
    },
    {
      hintIndex: 3,
      hintImageUrl: teamRow[headers.indexOf('Clue3_URL')],
      answer: teamRow[headers.indexOf('Clue3_Answer')],
    },
    {
      hintIndex: 4,
      hintImageUrl: teamRow[headers.indexOf('Clue4_URL')],
      answer: teamRow[headers.indexOf('Clue4_Answer')],
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