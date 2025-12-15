import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: { type: String },
  date: { type: Date},
  venue: { type: String, },

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant"
    }
  ]
});

export default mongoose.model("Event", eventSchema);

