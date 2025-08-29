// apps/api-updateProgress/services/progress.service.js
const { getSheetsInstance } = require('../lib/sheets.client');

const SPREADSHEET_ID = '1r2qv-X3ktDsH_MTLMlddvWTyBGifvaUP2wp3tvOI8dY';
const GAME_PROGRESS_SHEET_NAME = 'GameProgress';

async function updateTeamProgress(phoneNumber, newHintsSolvedCount) {
  const sheets = await getSheetsInstance();
  const range = `'${GAME_PROGRESS_SHEET_NAME}'!A:C`; // PhoneNumber, HintsSolvedCount, LastCorrectAnswerTimestamp

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });

  const allRows = response.data.values || [];
  const headers = allRows.shift() || [];
  
  const rowIndex = allRows.findIndex(row => row[0] === phoneNumber);

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const valuesToInsert = [[phoneNumber, newHintsSolvedCount, timestamp]];

  if (rowIndex !== -1) {
    // Row exists, UPDATE it.
    const updateRange = `'${GAME_PROGRESS_SHEET_NAME}'!A${rowIndex + 2}`;
    return await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      resource: { values: valuesToInsert },
    });
  } else {
    // Row does not exist, APPEND a new one.
    return await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values: valuesToInsert },
    });
  }
}

module.exports = { updateTeamProgress };