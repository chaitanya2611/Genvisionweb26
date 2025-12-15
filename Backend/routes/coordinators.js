import express from "express";
import Coordinator from "../models/Coordinator.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// 📝 Get all coordinators
router.get("/", async (req, res) => {
  try {
    const coordinators = await Coordinator.find();
    res.json(coordinators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ Add coordinator with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, designation, contact } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const coordinator = new Coordinator({
      name,
      designation,
      contact,
      image: imagePath,
    });

    await coordinator.save();
    res.status(201).json(coordinator);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ Update coordinator
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, contact } = req.body;

    const coordinator = await Coordinator.findById(id);
    if (!coordinator) return res.status(404).json({ message: "Not found" });

    coordinator.name = name || coordinator.name;
    coordinator.designation = designation || coordinator.designation;
    coordinator.contact = contact || coordinator.contact;
    if (req.file) coordinator.image = `/uploads/${req.file.filename}`;

    await coordinator.save();
    res.json(coordinator);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗑 Delete coordinator
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Coordinator.findByIdAndDelete(id);
    res.json({ message: "Coordinator deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
