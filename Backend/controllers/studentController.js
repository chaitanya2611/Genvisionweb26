import Student from "../models/Student.js";

// 🧾 Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// 🔍 Get single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// ➕ Register new student
export const registerStudent = async (req, res) => {
  try {
    const { name, email, phone, place, college, department, year, social_link } = req.body;

    // auto-generate registration ID (example: GVSTU1234)
    const registrationId = "GVSTU" + Math.floor(1000 + Math.random() * 9000);

    const student = new Student({
      name,
      email,
      phone,
      place,
      college,
      department,
      year,
      social_link,
      registrationId,
    });

    await student.save();
    res.status(201).json({ message: "Student registered successfully", student });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email or Registration ID already exists" });
    } else {
      res.status(500).json({ message: "Error registering student", error });
    }
  }
};

// ✏️ Update student
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student updated", updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// ❌ Delete student
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};