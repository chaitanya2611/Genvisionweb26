// utils/sendMail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER1,
    pass: process.env.EMAIL_PASS1,
  },
});

export async function sendMail({ to, subject, html }) {
  await transporter.sendMail({
    from: `"Team Genvision" <${process.env.EMAIL_USER1}>`,
    to,
    subject,
    html,
  });
}
