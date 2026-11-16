import "server-only";
import { google, sheets_v4 } from "googleapis";

export const LEAD_SHEET_HEADERS = [
  "تاريخ ووقت الطلب",
  "الاسم",
  "رقم الهاتف",
  "العرض المختار",
  "الوقت المفضل للاتصال",
  "مصدر الطلب",
  "مصدر الإعلان UTM",
  "الحملة الإعلانية",
  "الإعلان",
  "رابط الصفحة ومصدر الزيارة",
];

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google Sheets credentials are not configured (GOOGLE_SHEETS_CLIENT_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY).",
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function ensureSheetTabExists(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
): Promise<void> {
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = spreadsheet.data.sheets?.some(
    (s) => s.properties?.title === sheetName,
  );
  if (exists) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title: sheetName } } }],
    },
  });
}

export async function appendLeadRow(row: string[]): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "WhatsAppLeads";

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not configured.");
  }

  const sheets = getSheetsClient();

  await ensureSheetTabExists(sheets, spreadsheetId, sheetName);

  const existingHeader = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:A1`,
  });

  if (!existingHeader.data.values || existingHeader.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [LEAD_SHEET_HEADERS] },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });
}
