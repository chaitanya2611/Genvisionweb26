import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const JWT_SECRET = process.env.JWT_SECRET || "genvision_secret";

// 📍 Register Admin (IITB only)
export const registerAdmin = async (req, res) => {
  try {
    console.log("REQ BODY 👉", req.body);
    const { email, password } = req.body;

    // 🔒 IITB email hard check
    if (!email.endsWith("@iitb.ac.in")) {
      return res
        .status(403)
        .json({ message: "Only @iitb.ac.in admin allowed" });
    }
console.log("REQ BODY 👉", req.body);
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
console.log("REQ BODY 👉", req.body);
    const newAdmin = new Admin({
      email,
      password: hashed,
    });
console.log("REQ BODY 👉", req.body);
    await newAdmin.save();
console.log("REQ BODY 👉", req.body);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📍 Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
