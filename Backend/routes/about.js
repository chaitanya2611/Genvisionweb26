import express from "express";
import { getAbout, updateAbout, upload } from "../controllers/aboutController.js";

const router = express.Router();

// GET About page
router.get("/", getAbout);

// UPDATE About page
// Fields: poster (single), gallery (multiple), sponsorFiles (multiple)
router.put(
  "/update",
  upload.fields([
    { name: "poster", maxCount: 1 },
    { name: "gallery", maxCount: 20 },
    { name: "sponsorFiles", maxCount: 20 },
  ]),
  updateAbout
);

export default router;

