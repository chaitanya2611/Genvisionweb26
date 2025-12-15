import express from "express";
import Participant from "../models/Participant.js";       // लक्षात ठेवा .js
import generatePassword from "../middleware/passwordGen.js";
import sendCredentials from "../middleware/mailer.js";

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await Participant.findOne({ email });
  if (!user) {
    return res.json({ message: "If email exists, password sent" });
  }

  const newPass = generatePassword();
  user.password = newPass;
  await user.save();

  await sendCredentials(email, newPass);

  res.json({ message: "New password sent to email" });
});

export default router;
