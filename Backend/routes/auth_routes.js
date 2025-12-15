import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import Participant from "../models/Participant.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Participant.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

const token = jwt.sign(
  { _id: user._id },   // 🔥 id नाही, _id
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

  res.json({
    token,
    participant: {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    }
  });
});

export default router;
