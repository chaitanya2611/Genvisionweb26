import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  poster: { type: String, default: "" },
  description: { type: String, default: "" },
  gallery: { type: [String], default: [] },
  schedule: [
    {
      date: String,
      event: String,
      time: String,
    },
  ],
  sponsors: [
    {
      name: String,
      logo: String,
    },
  ],
});

export default mongoose.model("About", AboutSchema);
