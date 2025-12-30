import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },

  collegeName: {
    type: String,
    required: true,
  },

  bioRelatedDepartment: {
    type: String,
  },

  location: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  contactNumbers: {
    type: [String], // array of numbers
    default: [],
  },

  outreachStatus: {
    type: String,
    default: "invited", // invited | approved | rejected
  },

  mailSent: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("College", collegeSchema);
