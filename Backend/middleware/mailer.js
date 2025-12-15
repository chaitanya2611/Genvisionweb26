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
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "GenVision Login Credentials",
    text: `Email: ${email}\nPassword: ${password}`,
  });
  console.log(`📨 Email sent to ${email}`);
}

export default sendCredentials;
