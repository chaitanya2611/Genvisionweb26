import express from "express";
import Coordinator from "../models/Coordinator.js";
import upload from "../middleware/upload.js";
import syncCoordinators from "../middleware/syncCoordinator.js";

const router = express.Router();

/* =========================
   📝 Get all coordinators
   ========================= */
router.get("/", async (req, res) => {
  try {
    const coordinators = await Coordinator.find();
    res.json(coordinators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   ➕ Add coordinator (2 images)
   ========================= */
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, designation, contact } = req.body;

      const image = req.files?.image
        ? `/uploads/${req.files.image[0].filename}`
        : "";

      const image2 = req.files?.image2
        ? `/uploads/${req.files.image2[0].filename}`
        : "";

      const coordinator = new Coordinator({
        name,
        designation,
        contact,
        image,
        image2,
      });

      await coordinator.save();
      res.status(201).json(coordinator);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/* =========================
   ✏️ Update coordinator (2 images)
   ========================= */
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, designation, contact } = req.body;

      const coordinator = await Coordinator.findById(id);
      if (!coordinator) {
        return res.status(404).json({ message: "Coordinator not found" });
      }

      coordinator.name = name || coordinator.name;
      coordinator.designation = designation || coordinator.designation;
      coordinator.contact = contact || coordinator.contact;

      if (req.files?.image) {
        coordinator.image = `/uploads/${req.files.image[0].filename}`;
      }

      if (req.files?.image2) {
        coordinator.image2 = `/uploads/${req.files.image2[0].filename}`;
      }

      await coordinator.save();
      res.json(coordinator);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

/* =========================
   🗑 Delete coordinator
   ========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Coordinator.findByIdAndDelete(req.params.id);
    res.json({ message: "Coordinator deleted successfully 🗑️" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   🔄 Sync coordinators from Google Sheet
   ========================= */
router.post("/sync", async (req, res) => {
  try {
    await syncCoordinators();
    res.status(200).json({
      message: "Coordinators synced successfully ✅",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Sync failed ❌",
    });
  }
});

export default router;
