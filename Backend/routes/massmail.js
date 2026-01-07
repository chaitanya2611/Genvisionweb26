// routes/massMail.js
import express from "express";
import Participant from "../models/Participant.js";
import transporter from "../middleware/transporter.js";

const router = express.Router();

router.post("/send-mass-mail", async (req, res) => {
  try {
    const participants = await Participant.find(
      { email: { $exists: true, $ne: "" } },
      { email: 1, fullName: 1 }
    );

    console.log("📩 Mass mail initialization started");
    console.log(`👥 Total recipients: ${participants.length}`);

    const SUBJECT = "Join Genvision Community for Event Updates 🚀";

    const MESSAGE = `
  <p>We’re excited to have you with us for <strong>Genvision</strong> events! 🎉</p>

  <p>To stay updated with important announcements, schedules, and live updates, we invite you to join our official Genvision WhatsApp Community.</p>

  <p><strong>👉 Join here:</strong><br/>
  <a href="https://chat.whatsapp.com/EKGdRB2F6DkBQCf8qtC7hE">
    Genvision WhatsApp Community
  </a></p>

  <p><strong>Note:</strong> Before joining the group, please make sure you have enrolled and registered for the events.</p>
  <p>Kindly ignore this message if you have already joined the group.</p>

  <br/>
  <p>See you at the Genvision! 🚀</p>
  <p>— Team Genvision</p>
`;

    for (let i = 0; i < participants.length; i++) {
      const p = participants[i];

      // 1️⃣ initialization log
      console.log(
        `⏳ [${i + 1}/${participants.length}] Initializing mail → ${p.email}`
      );

      await transporter.sendMail({
        from: `"Genvision Team" <${process.env.EMAIL_USER1}>`,
        to: p.email,
        subject: SUBJECT,
        html: `
          <p>Hi ${p.fullName || " "},</p>
          ${MESSAGE}
        `,
      });

      // 2️⃣ success log
      console.log(
        `✅ [${i + 1}/${participants.length}] Mail sent successfully → ${
          p.email
        }`
      );
    }

    console.log("🎉 Mass mail process completed");

    res.json({
      success: true,
      sent: participants.length,
    });
  } catch (err) {
    console.error("❌ Mass mail failed:", err);
    res.status(500).json({ success: false });
  }
});

export default router;
