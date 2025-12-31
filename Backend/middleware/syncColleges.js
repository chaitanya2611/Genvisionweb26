import { google } from "googleapis";
import College from "../models/College.js";
import sendCollegeInvite from "./collegemailer.js";

// 🔐 Google Auth (same as participants)
const auth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function syncColleges() {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID2,
    range: "'Draft- 2'!A:Z",
  });

  const rows = res.data.values;
  if (!rows || rows.length <= 1) return;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const collegeName = row[0]; // A
    const location = row[2]; // C
    const bioDept = row[4]; // E
    const email = row[6]; // G

    const contacts = [
      row[8], // I
      row[9], // J
      row[10], // K
      row[11], // L
    ].filter(Boolean); // remove empty ones

    if (!collegeName || !email) continue;

    // 🔁 duplicate avoid
    const exists = await College.findOne({ email });
    if (exists) continue;

    let mailSent = false;

    try {
      await sendCollegeInvite(email, collegeName);
      mailSent = true;
    } catch (err) {
      console.error(`📧 Mail failed: ${collegeName}`, err.message);
    }

    try {
      const college = new College({
        collegeName,
        location,
        bioRelatedDepartment: bioDept,
        email,
        contactNumbers: contacts,
        mailSent,
        outreachStatus: "invited",
      });

      await college.save();

      console.log(`✅ College saved: ${collegeName} | mailSent=${mailSent}`);

      // ⏳ Gmail safety delay
      await new Promise((res) => setTimeout(res, 3000));
    } catch (err) {
      console.error(`❌ DB save failed: ${collegeName}`, err.message);
    }
  }

  console.log("🚀 Colleges sync + DB + mailing completed");
}

export default syncColleges;
