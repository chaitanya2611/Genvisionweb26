import express from "express";
// import {
//   getAllEvents,
//   createEvent,
//   updateEvent,
//   deleteEvent,
//   getEventById,
// } from "../controllers/eventController.js";
import Event from "../models/Event.js";
import upload from "../middleware/upload.js";
import Participant from "../models/Participant.js";


const router = express.Router();

// Routes
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ Add Event with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
  const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
  const event = await Event.create({ ...req.body, image: imagePath });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ Update event
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, venue,description } = req.body;

    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Not found" });

    event.name = name || event.name;
    event.date = date || event.date;
    event.venue = venue || event.venue;
    event.description = description || event.description;
    if (req.file) event.image = `/uploads/${req.file.filename}`;

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/participants", async (req, res) => {
  const eventId = req.params.id;

  try {
    const participants = await Participant.find({ events: eventId }).select("-password");
    res.json(participants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// 🗑 Delete event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




export default router;

