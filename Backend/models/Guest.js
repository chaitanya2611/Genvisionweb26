import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: String,
  description: String,
  contact: String,
  image: String,
  
});

export default mongoose.model("Guest", guestSchema);
