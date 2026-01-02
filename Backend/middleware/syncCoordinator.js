import { google } from "googleapis";
import Coordinator from "../models/Coordinator.js";

// 🔐 Google Auth
const auth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function syncCoordinators() {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID3, // same or separate sheet id
    range: "'Sheet1'!A:Z",
  });

  const rows = res.data.values;
  if (!rows || rows.length <= 1) return;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const name = row[1]; // B
    const contact = row[3]; // D
    const designation = row[4]; // E

    if (!name || !contact) continue;

    // 🔁 Duplicate check by contact number
    const exists = await Coordinator.findOne({ contact });
    if (exists) {
      console.log(`⚠️ Skipped duplicate coordinator: ${contact}`);
      continue;
    }

    const coordinator = new Coordinator({
      name,
      contact,
      designation,
    });

    await coordinator.save();
    console.log(`✅ Coordinator added: ${name} | ${contact}`);
  }
}

export default syncCoordinators;
