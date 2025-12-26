import express from "express";
import Event from "../models/Event.js";
import upload from "../middleware/upload.js";
import Participant from "../models/Participant.js";

const router = express.Router();

/* ================= GET ALL EVENTS ================= */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ================= CREATE EVENT ================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, date, time, venue, maxParticipants } = req.body;

    // 🔥 RULES HANDLE (array or single)
    let rules = req.body.rules || [];
    if (!Array.isArray(rules)) {
      rules = [rules];
    }

    if (!maxParticipants) {
      return res.status(400).json({ message: "maxParticipants is required" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const event = new Event({
      name,
      description,
      date,
      time,
      venue,
      image: imagePath,
      maxParticipants: Number(maxParticipants),
      currentParticipants: 0,
      rules, // 🔥 SAVED TO DB
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE EVENT ================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, date, time, venue, maxParticipants } = req.body;

    let rules = req.body.rules;
    if (rules && !Array.isArray(rules)) {
      rules = [rules];
    }

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.venue = venue || event.venue;

    if (maxParticipants !== undefined) {
      event.maxParticipants = Number(maxParticipants);
    }

    if (rules) {
      event.rules = rules; // 🔥 UPDATE RULES
    }

    if (req.file) {
      event.image = `/uploads/${req.file.filename}`;
    }

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ================= EVENT PARTICIPANTS ================= */
router.get("/:id/participants", async (req, res) => {
  try {
    const participants = await Participant.find({
      events: req.params.id,
    }).select("-password");

    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= DELETE EVENT ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
