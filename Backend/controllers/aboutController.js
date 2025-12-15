import About from "../models/About.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Multer storage for poster, gallery, sponsor logos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store in /uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// GET About
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // create default if empty
      about = await About.create({
        poster: "",
        description: "",
        gallery: [],
        schedule: [],
        sponsors: [],
      });
    }
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// UPDATE About
export const updateAbout = async (req, res) => {
  try {
    const { description, schedule, sponsors } = req.body;

    let about = await About.findOne();
    if (!about) about = new About();

    // Poster
    if (req.files?.poster && req.files.poster.length > 0) {
  about.poster = "/uploads/" + req.files.poster[0].filename;
}

    // Gallery (append new)
    if (req.files?.gallery) {
      const galleryFiles = req.files.gallery.map((f) => "/uploads/" + f.filename);
      about.gallery = about.gallery.concat(galleryFiles);
    }

    // Sponsors
let sponsorsData = JSON.parse(sponsors || "[]");

if (req.files?.sponsorFiles) {
  req.files.sponsorFiles.forEach((file, idx) => {
    if (!sponsorsData[idx]) sponsorsData[idx] = {};
    sponsorsData[idx].logo = "/uploads/" + file.filename;
  });
}

about.sponsors = sponsorsData;

    // Schedule + description
    about.schedule = JSON.parse(schedule || "[]");
    about.description = description;

    
    await about.save();
    res.json({ message: "About updated successfully", about });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating about", error: err.message });
  }
};

