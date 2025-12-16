import { google } from "googleapis";
import Participant from "../models/Participant.js";
import generatePassword from "./passwordGen.js";
import sendCredentials from "./mailer.js";

// 🔐 ENV-based Google Auth (SECURE)
const auth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Helper: Generate unique registration_id
async function generateUniqueRegId() {
  let regId;
  let exists = true;

  while (exists) {
    regId = "GV" + Math.floor(100000 + Math.random() * 900000);
    exists = await Participant.findOne({ registration_id: regId });
  }
  return regId;
}

async function syncParticipants() {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "'Form responses 1'!A:Z",
  });

  const rows = res.data.values;
  if (!rows || rows.length <= 1) return;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const email = row[1];
    const fullName = row[3];
    if (!email || !fullName) continue;

    const exists = await Participant.findOne({ email });
    if (exists) continue;

    const password = generatePassword();
    const regId = await generateUniqueRegId();

    const participant = new Participant({
      timestamp: Date.now(),
      email,
      fullName,
      password,
      mobileNumber: row[5],
      whatsappNumber: row[6],
      gender: row[7],
      isMumbaikar: row[8],
      accommodationRequired: row[9],
      institution: row[10],
      instituteAddress: row[11],
      district: row[12],
      degree: row[13],
      branch: row[14],
      governmentId: row[16],
      groupKeyword: row[17],
      transactionId: row[18],
      paymentStatus: "pending",
      registration_id: regId,
    });

    await participant.save();
    await sendCredentials(email, password);

    console.log(`✅ Participant added: ${email} | reg_id: ${regId}`);
  }
}

export default syncParticipants;
