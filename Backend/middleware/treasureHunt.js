import { google } from "googleapis";
import Hunter from "../models/Hunter.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

// 🔐 Google Auth
const auth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function syncHunters() {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID4,
    range: "'Sheet1'!A:Z",
  });

  const rows = res.data.values;
  if (!rows || rows.length <= 1) return;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const path_no = Number(row[1]); // Path_No
    const path_loc = Number(row[2]); // Location_No
    if (!path_no || !path_loc) continue;

    const hunter = await Hunter.findOne({ path_no });

    // 🆕 First time path_no
    if (!hunter) {
      await Hunter.create({
        path_no,
        locations: [path_loc],
        count: 1,
      });
      console.log(`🆕 Path ${path_no} first discovery at ${path_loc}`);
      continue;
    }

    // 🔁 Location already visited → ignore
    if (hunter.locations.includes(path_loc)) {
      console.log(`⏭️ Ignored: Path ${path_no} already visited ${path_loc}`);
      continue;
    }

    // ✅ New location → count it
    hunter.locations.push(path_loc);
    hunter.count += 1;
    await hunter.save();

    console.log(`✅ Path ${path_no} discovered new location ${path_loc}`);
  }
}

export default syncHunters;
