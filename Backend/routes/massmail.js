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

    const SUBJECT = "Reminder: Genvision Event Registration";

    const MESSAGE = `
      <p>This is a gentle reminder regarding the Genvision events.</p>
      <p>If you are interested and have not registered yet, we encourage you to complete your event registration at the earliest.</p>
      <p>We have already shared login credentials.</p>
      <p>If you have already registered, kindly ignore this mail.</p>
      <br/>
      <p>We look forward to your participation.</p>
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
