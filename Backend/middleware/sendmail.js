// utils/sendMail.js
import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER1,
    pass: process.env.EMAIL_PASS1,
  },
});

export async function sendMail({ to, subject, html, attachments = [] }) {
  await transporter.sendMail({
    from: `"Team GenVision" <${process.env.EMAIL_USER1}>`,
    to,
    subject,
    html,
    // attachments: attachments.map((file) => ({
    //   filename: file, // mail madhe disel
    //   path: path.join(process.cwd(), "uploads", file), // uploads folder path
    // })),
  });
}
