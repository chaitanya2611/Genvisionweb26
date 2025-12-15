import express from "express";
import {
  getStudents,
  getStudentById,
  registerStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// 🧭 Routes
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.post("/", registerStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;