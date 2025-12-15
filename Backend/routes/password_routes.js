import express from "express";
import bcrypt from "bcrypt";
import auth from "../middleware/participantAuth.js";
import Participant from "../models/Participant.js";

const router = express.Router();

router.post("/change-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Participant.findById(req.participant._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) {
      return res.status(400).json({ message: "Wrong old password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
