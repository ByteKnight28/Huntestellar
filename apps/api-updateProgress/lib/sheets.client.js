const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');
const fs = require('fs'); // Import the 'fs' module for reading files

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

/**
 * Creates an authenticated JWT client for Google services.
 * @returns {Promise<JWT>} An authorized JWT client.
 */
async function getAuthClient() {
    // Corrected path to find credentials.json in the project root
    const keyPath = path.join(__dirname, '..', 'credentials.json');

    // Read the contents of the credentials file
    const keys = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

    const auth = new GoogleAuth({
      // Use the modern 'credentials' option instead of 'keyFile'
      credentials: keys,
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
    const sheets = google.sheets({
      version: 'v4',
      auth: authClient,
    });
    return sheets;
}

module.exports = { getSheetsInstance };