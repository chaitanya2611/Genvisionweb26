import express from "express";
import Hunter from "../models/Hunter.js";

const router = express.Router();

// 🔥 LIVE LEADERBOARD
router.get("/", async (req, res) => {
  try {
    const leaderboard = await Hunter.find({}, { _id: 0, path_no: 1, count: 1 })
      .sort({ count: -1, path_no: 1 }) // highest score first
      .limit(50); // optional top 50

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({
      success: false,
      message: "Leaderboard fetch failed",
    });
  }
});

export default router;
