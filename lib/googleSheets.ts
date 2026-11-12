import "server-only";
import { google } from "googleapis";

export const LEAD_SHEET_HEADERS = [
  "تاريخ ووقت الطلب",
  "الاسم",
  "رقم الهاتف",
  "الباقة المختارة",
  "اختيار المنطقة الواحدة، إلا كان مناسباً",
  "الحي",
  "وقت البدء",
  "نية التواصل",
  "القدرة على المجيء للسنتر",
  "الوقت المناسب للاتصال",
  "الموافقة على التواصل",
  "حالة الطلب",
  "سبب تصنيف الطلب",
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

export async function appendLeadRow(row: string[]): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Leads";

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not configured.");
  }

  const sheets = getSheetsClient();

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
