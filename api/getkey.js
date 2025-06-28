import { google } from 'googleapis';
import { readFileSync } from 'fs';

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(readFileSync('./service_account.json', 'utf-8')),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1ir8iM_bzzTfZGacx9leoNPgdEc_Wm1r6ZrJrhlx4YcY';

    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:A',
    });

    const rows = readRes.data.values;

    if (!rows || rows.length === 0) {
      return res.status(200).json({ key: null, message: 'Hết key rồi!' });
    }

    const key = rows[0][0];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A2',
      valueInputOption: 'RAW',
      resource: { values: [['']] },
    });

    return res.status(200).json({ key });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
