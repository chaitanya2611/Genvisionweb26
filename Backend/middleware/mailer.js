import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,      
    pass: process.env.EMAIL_PASS       
  }
});

async function sendCredentials(email, password) {
  transporter.verify((err, success) => {
  if (err) console.log("Email transporter error:", err);
  else console.log("✅ Email transporter ready");
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'GenVision Login Credentials',
    text: `
Welcome to GenVision!

Email: ${email}
Password: ${password}

Please login and change your password.
`
  });

  console.log(`Email sent to ${email}`);
}

export default sendCredentials;

