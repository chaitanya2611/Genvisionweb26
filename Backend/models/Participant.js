import mongoose, { isObjectIdOrHexString } from "mongoose";
import bcrypt from "bcrypt";

const participantSchema = new mongoose.Schema({

  // 🔹 Google Form metadata
  timestamp: {
    type: String,
  },

  // 🔹 Identity & Login
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  collegeId: {
    type: String
  },

  // 🔹 Contact
  mobileNumber: String,
  whatsappNumber: String,

  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },

  isMumbaikar: {
    type: String,
  },

  // 🔹 Accommodation (only for outside Mumbai)
  accommodationRequired: {
    type: String,
  },

  accommodationStatus: {
    type: String,
    enum: ["pending", "confirmed", "rejected"],
    default: "pending"
  },

  // 🔹 Education
  institution: String,
  instituteAddress: String,
  district: String,
  degree: String,
  branch: String,

  // 🔹 Documents
  governmentId: String, // Aadhar / Gov ID

  // 🔹 Group Registration
  groupKeyword: String,

  // 🔹 Payment
  transactionId: String,

  paymentStatus: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending"
  },

  // 🔹 Event Linking
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ],

  confirmationEmailSent: {
  type: Boolean,
  default: false,
},

  // 🔹 System fields
  registration_id: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});



participantSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.model("Participant", participantSchema);
