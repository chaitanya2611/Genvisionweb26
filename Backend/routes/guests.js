import express from "express";
import Guest from "../models/Guest.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// 📝 Get all guests
router.get("/", async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ Add guest with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, designation, description, contact } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const guest = new Guest({
      name,
      designation,
      description,
      contact,
      image: imagePath,
    });

    await guest.save();
    res.status(201).json(guest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ Update guest
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, description, contact } = req.body;

    const guest = await Guest.findById(id);
    if (!guest) return res.status(404).json({ message: "Not found" });

    guest.name = name || guest.name;
    guest.designation = designation || guest.designation;
    guest.contact = contact || guest.contact;
    guest.description = description || guest.description;
    if (req.file) guest.image = `/uploads/${req.file.filename}`;

    await guest.save();
    res.json(guest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗑 Delete guest
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Guest.findByIdAndDelete(id);
    res.json({ message: "Guest deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

