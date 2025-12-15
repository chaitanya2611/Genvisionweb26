import dotenv from "dotenv";
dotenv.config();
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendCredentials(email, password) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "GenVision Login Credentials",
      html: `
        <h2>Welcome to GenVision </h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <p>Please login and change your password.</p>
        <br/>
        <p>— Team GenVision</p>
      `,
    });

    console.log(`📨 Email sent to ${email}`);
  } catch (err) {
    console.error("❌ Resend email error:", err);
  }
}

export default sendCredentials;


