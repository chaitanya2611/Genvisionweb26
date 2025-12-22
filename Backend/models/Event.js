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
  ],
    maxParticipants: {
    type: Number,
    required: true,
  },

  currentParticipants: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Event", eventSchema);

