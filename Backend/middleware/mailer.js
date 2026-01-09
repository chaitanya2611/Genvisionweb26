import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER1,
    pass: process.env.EMAIL_PASS1,
  },
});

async function sendCredentials(email, password) {
  const cleanEmail = email.replace(/['"\s]/g, "").trim();

  console.log("📧 Sending to:", cleanEmail);

  await transporter.sendMail({
    from: `"Team Symbiotek | Genvision 2026" <${process.env.EMAIL_USER1}>`,
    to: cleanEmail,
    subject: "🎉 Genvision 2026 Registration Confirmed | Welcome to BIOFUSION",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; color:#222">
        <h2>🎉 Congratulations! 🎉</h2>

        <p>
          We’re excited to confirm that your registration for
          <strong>Genvision 2026</strong> has been successfully completed!
        </p>

        <h3>🌐 Theme: <span style="color:#6a00ff">BIOFUSION</span></h3>

        <p>
          BIOFUSION celebrates the electric intersection of biology, technology,
          engineering, chemistry, data science, and innovation.
          <br/><br/>
          Think <strong>DNA colliding with AI</strong>, <strong>molecules meeting machines</strong>,
          and <strong>cells teaming up with computation</strong>.
        </p>

        <p><strong>This is science without boundaries — this is BIOFUSION ⚡🤖</strong></p>

        <h3>🔥 What’s waiting for you?</h3>
        <ul>
          <li>🙅 Thrilling debates</li>
          <li>🧠 Sci-quiz battles</li>
          <li>🕵️‍♀️ Treasure Hunt</li>
          <li>👨‍🔬 Poster presentations & lab visits</li>
          <li>😮 Event X — a surprise!</li>
        </ul>

        <h3>📌 Event Registrations</h3>
        <p>
          Please register for events using the registration details provided below.
          Make sure to check event guidelines before registering.
        </p>

        <h3>🔐 Your Login Credentials</h3>
        <p>
          <strong>Email:</strong> ${cleanEmail}<br/>
          <strong>Password:</strong> ${password}
        </p>

        <h3>🔐 Login to Your Genvision Account</h3>
<p>
  You can log in using your credentials at the link below:
  <br/>
  👉 <a href="https://genvision2026.vercel.app/#/login" target="_blank">
    click here to login 
  </a>
</p>

        <p>
          🔗 <a href="https://linktr.ee/Genvision2026">Click here for events, speakers & schedule</a>
        </p>
        <p>To stay updated with important announcements, schedules, and live updates, we invite you to join our official Genvision WhatsApp Community.</p>

  <p><strong>👉 Join here:</strong><br/>
  <a href="https://chat.whatsapp.com/EKGdRB2F6DkBQCf8qtC7hE">
    Genvision WhatsApp Community
  </a></p>

  <p><strong>Note:</strong> Before joining the group, please make sure you have enrolled and registered for the events.</p>

        <h3>📍 Event Details</h3>
        <p>
          <strong>Venue:</strong> IIT Bombay<br/>
          <strong>Dates:</strong> 10th – 11th January 2026
        </p>

        <p>
          Genvision is your stage — come learn, compete, explore, and meet
          innovators from IIT Bombay and beyond 🌟
        </p>

        <p>
        You can see your accomodation status once you login.<br/>
  Please acknowledge the receipt of this email for confirmation.<br/>
          See you at <strong>Genvision 2026</strong>!<br/><br/>
          — <strong>Symbiotek Team</strong><br/>
          BSBE, IIT Bombay
        </p>
      </div>
    `,
  });

  console.log(`📨 Email sent to ${cleanEmail}`);
}

export default sendCredentials;
