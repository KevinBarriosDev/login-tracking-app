import { google } from 'googleapis'

type LoginData = {
  usuario: string
  contraseña: string
  fecha: string
  hora: string
}

export async function appendLoginToSheet(data: LoginData) {
  try {
    const credentials = JSON.parse(
      process.env.GOOGLE_SHEETS_CREDENTIALS || '{}'
    )

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
      range: 'Sheet1!A:D',
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [data.usuario, data.contraseña, data.fecha, data.hora]
        ],
      },
    })

    console.log('✅ Login registrado en Google Sheets')
  } catch (error) {
    console.error('❌ Error al registrar en Google Sheets:', error)
    throw error
  }
}
