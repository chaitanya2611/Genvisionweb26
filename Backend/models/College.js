import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  by: { type: String, default: "Admin" },
  date: { type: Date, default: Date.now },
});

const collegeSchema = new mongoose.Schema(
  {
    collegeName: { type: String, required: true },
    bioRelatedDepartment: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    contactNumbers: { type: [String], default: [] },
    outreachStatus: {
      type: String,
      enum: ["pending", "invited", "replied", "ignored"],
      default: "pending",
    },
    mailSent: { type: Boolean, default: false },
    reviews: { type: [reviewSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("College", collegeSchema);
