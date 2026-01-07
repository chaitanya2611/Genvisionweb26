import mongoose from "mongoose";

const HunterSchema = new mongoose.Schema({
  path_no: {
    type: Number,
    unique: true,
  },
  locations: {
    type: [Number], // visited locations
    default: [],
  },
  count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Hunter", HunterSchema);
