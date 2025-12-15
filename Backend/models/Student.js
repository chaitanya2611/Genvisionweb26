import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  place:{type: String },
  college: { type: String },
  department: { type: String },
  year: { type: String },

  // 🎯 Linking participant to a specific event
 

  createdAt: { type: Date, default: Date.now },
  social_link: String,

  registrationId: {
    type: String,
    unique: true
  },
});

export default mongoose.model("Student", studentSchema);
