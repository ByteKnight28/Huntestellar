// apps/api-getGameData/test-sheet-access.js

const { getSheetsInstance } = require('./lib/sheets.client');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
// TODO: Replace with your actual Spreadsheet ID and the name of a sheet that has data.
const SPREADSHEET_ID = '1r2qv-X3ktDsH_MTLMlddvWTyBGifvaUP2wp3tvOI8dY';
const SHEET_NAME = 'Registrations' // Use a sheet name that exists

/**
 * A simple function to test read access to the Google Sheet.
 */
async function testAccess() {
    console.log('Attempting to connect to Google Sheets...');
    try {
      const sheets = await getSheetsInstance();
      
      // First, get the spreadsheet metadata to see all sheet names
      const spreadsheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });
      
      console.log('Available sheets:');
      spreadsheetInfo.data.sheets.forEach(sheet => {
        console.log('- "' + sheet.properties.title + '"');
      });
      
      // Then try to access data (you can comment this out first)
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:C2`,
      });
  
      console.log('✅ Success! Connection established and data retrieved.');
      console.log('Data:', response.data.values);
  
    } catch (error) {
      console.error('❌ Error! Failed to connect or retrieve data.');
      console.error('Detailed Error:', error.message);
    }
}

// Run the test
testAccess();