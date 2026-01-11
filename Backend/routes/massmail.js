// routes/massMail.js
import express from "express";
import Participant from "../models/Participant.js";
import transporter from "../middleware/transporter.js";
import { sendMail } from "../middleware/sendmail.js";
import { accommodationConfirmedTemplate } from "../middleware/mailTemplates.js";

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
        to: "25m0126@iitb.ac.in",
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

router.post("/accommodation-confirmed", async (req, res) => {
  try {
    const confirmedParticipants = await Participant.find({
      accommodationStatus: "pending",
    });

    if (confirmedParticipants.length === 0) {
      console.log("⚠️ Ekahi CONFIRMED participant nahi");
      return res.status(400).json({
        message: "Ekahi CONFIRMED participant nahi",
      });
    }

    console.log(
      `🚀 Mail process start | Total: ${confirmedParticipants.length}`
    );

    for (let i = 0; i < confirmedParticipants.length; i++) {
      const p = confirmedParticipants[i];

      console.log(
        `📨 [${i + 1}/${confirmedParticipants.length}] Initializing mail → ${
          p.email
        }`
      );

      await sendMail({
        to: p.email,
        subject: "Welcome to Genvision 2026",
        html: accommodationConfirmedTemplate(p.fullName),
      });

      console.log(
        `✅ [${i + 1}/${
          confirmedParticipants.length
        }] Mail sent successfully → ${p.email}`
      );
    }

    console.log("🎯 All accommodation mails sent successfully");

    res.json({
      message: `✅ ${confirmedParticipants.length} participants la mail pathavla`,
    });
  } catch (err) {
    console.error("💥 Mail process failed:", err);
    res.status(500).json({ message: "Mail failed" });
  }
});

router.post("/accommodation-test", async (req, res) => {
  try {
    console.log("🔥 BODY:", req.body);

    const { email } = req.body;

    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Valid email required" });
    }

    console.log(`🧪 Test mail initializing → ${email}`);

    await sendMail({
      to: email.trim(),
      subject: "Welcome to Genvision 2026",
      html: accommodationConfirmedTemplate("Test User"),
      // attachments: [
      //   "IIT Bombay Map_Genvision 2026.png",
      //   "schedule genvision 2026.pdf",
      // ],
    });

    console.log(`✅ Test mail sent successfully → ${email}`);

    res.json({ message: "Test mail sent successfully" });
  } catch (err) {
    console.error("💥 Test mail failed:", err);
    res.status(500).json({ message: "Test mail failed" });
  }
});

export default router;
