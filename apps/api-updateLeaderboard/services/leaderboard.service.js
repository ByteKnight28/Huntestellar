// apps/api-updateLeaderboard/services/leaderboard.service.js
const { getSheetsInstance } = require('../lib/sheets.client');

// TODO: Replace with your actual Spreadsheet ID
const SPREADSHEET_ID = '1r2qv-X3ktDsH_MTLMlddvWTyBGifvaUP2wp3tvOI8dY'; 
const REGISTRATIONS_SHEET_NAME = 'Registrations'; // Or your form responses tab
const GAME_PROGRESS_SHEET_NAME = 'GameProgress';
const LEADERBOARD_SHEET_NAME = 'Leaderboard';

async function updateLeaderboard() {
  const sheets = await getSheetsInstance();

  // 1. Read all data from GameProgress and Registrations sheets at the same time
  const [progressResponse, registrationsResponse] = await Promise.all([
    sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: `'${GAME_PROGRESS_SHEET_NAME}'!A:C` }),
    sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: `'${REGISTRATIONS_SHEET_NAME}'!A:D` }) // Get name and team name
  ]);

  const progressData = progressResponse.data.values || [];
  const registrationData = registrationsResponse.data.values || [];
  if (progressData.length > 0) progressData.shift(); // Remove headers if sheet is not empty
  if (registrationData.length > 0) registrationData.shift();

  // 2. Create a map of PhoneNumber -> Team Name for easy lookup
  const teamNameMap = new Map(registrationData.map(row => [row[3], row[1]])); // Phone Number is column D (index 3), Team Name is col B (index 1)

  // 3. Combine the data
  let leaderboard = progressData.map(row => ({
    teamName: teamNameMap.get(row[0]) || 'Unknown Team',
    hintsSolved: parseInt(row[1], 10),
    lastTimestamp: new Date(row[2]),
  }));

  // 4. Sort the data
  leaderboard.sort((a, b) => {
    if (b.hintsSolved !== a.hintsSolved) {
      return b.hintsSolved - a.hintsSolved; // Sort by hints solved (descending)
    }
    return a.lastTimestamp - b.lastTimestamp; // Tie-breaker: sort by time (ascending)
  });

  // 5. Prepare the data for writing back to the sheet
  const valuesToWrite = leaderboard.map((team, index) => [
    index + 1, // Rank
    team.teamName,
    team.hintsSolved,
  ]);

  // Add a header row
  const headerRow = [['Rank', 'Team Name', 'Hints Solved']];
  const finalValues = headerRow.concat(valuesToWrite);

  // 6. Clear the old leaderboard sheet
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${LEADERBOARD_SHEET_NAME}'!A:C`,
  });

  // 7. Write the new leaderboard data
  if (finalValues.length > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `'${LEADERBOARD_SHEET_NAME}'!A1`,
      valueInputOption: 'USER_ENTERED',
      resource: { values: finalValues },
    });
  }

  return leaderboard;
}

module.exports = { updateLeaderboard };