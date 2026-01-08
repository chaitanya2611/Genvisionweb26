import mongoose from "mongoose";

const coordinatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: String,
  contact: { type: String, unique: true },
  image: String,
  image2: String,

  // multiple events he/she coordinates
});

export default mongoose.model("Coordinator", coordinatorSchema);
