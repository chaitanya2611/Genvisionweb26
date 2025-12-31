import express from "express";
import {
  getAllColleges,
  updateCollege,
  addCollegeReview,
  deleteCollegeReview,
} from "../controllers/collegeController.js";

const router = express.Router();

router.get("/", getAllColleges);
router.put("/:id", updateCollege);

router.post("/:id/reviews", addCollegeReview);
router.delete("/:id/reviews/:reviewId", deleteCollegeReview);

export default router;
