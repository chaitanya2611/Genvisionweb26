import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendCredentials(email, password) {
  // 🔥 SANITIZE EMAIL (VERY IMPORTANT)
  const cleanEmail = email.replace(/['"\s]/g, "").trim();

  console.log("📧 Sending to:", cleanEmail);

  await transporter.sendMail({
    from: `"GenVision Team" <${process.env.EMAIL_USER}>`,
    to: cleanEmail, // ✅ NO QUOTES
    subject: "GenVision Login Credentials",
    text: `Email: ${cleanEmail}\nPassword: ${password}`,
  });

  console.log(`📨 Email sent to ${cleanEmail}`);
}

export default sendCredentials;

