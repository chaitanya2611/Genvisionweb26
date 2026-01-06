// utils/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER1,
    pass: process.env.EMAIL_PASS1, // app password
  },
});

export default transporter;
