// apps/api-getGameData/lib/sheets.client.js

const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

// The scope required for Google Sheets access
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Creates an authenticated JWT client for Google services.
 * @returns {Promise<JWT>} An authorized JWT client.
 */
async function getAuthClient() {
  const auth = new GoogleAuth({
    // You'll need to point to the credentials file you download from Google Cloud
    keyFile: 'credentials.json',
    scopes: SCOPES,
  });
  const client = await auth.getClient();
  return client;
}

/**
 * Creates an authenticated instance of the Google Sheets API.
 * @returns {Promise<sheets_v4.Sheets>} The Google Sheets API instance.
 */
async function getSheetsInstance() {
  const authClient = await getAuthClient();
  const { sheets } = google.sheets({
    version: 'v4',
    auth: authClient,
  });
  return sheets;
}

module.exports = { getSheetsInstance };