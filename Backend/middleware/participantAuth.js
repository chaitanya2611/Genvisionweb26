import jwt from "jsonwebtoken";
import Participant from "../models/Participant.js";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const participant = await Participant.findById(decoded._id);
    if (!participant) {
      return res.status(401).json({ message: "Participant not found" });
    }

    req.participant = participant; // 🔥 FULL OBJECT
    next();
  } catch (err) {
    console.log("JWT ERROR 👉", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
