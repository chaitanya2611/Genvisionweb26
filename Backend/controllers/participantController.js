import Participant from "../models/Participant.js";
import Event from "../models/Event.js";

/* =====================================================
   🧠 GET ALL PARTICIPANTS (with populated events)
===================================================== */
export const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find()
      .populate("events", "name");

    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   ➕ ADD NEW PARTICIPANT
===================================================== */
export const addParticipant = async (req, res) => {
  try {
    const participant = new Participant({
      // 🔥 FIELD NAMES MUST MATCH FRONTEND
      fullName: req.body.fullName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      institution: req.body.institution,
      department: req.body.department,
      year: req.body.year,

      events: req.body.events || [], // array of event IDs
      social_link: req.body.social_link,

      paymentStatus: req.body.paymentStatus || "pending",
      accommodationRequired: req.body.accommodationRequired || false,
      accommodationStatus: req.body.accommodationStatus || "pending",
      travelStatus: req.body.travelStatus || "pending",

      registration_id:
        "GV" + Math.floor(100000 + Math.random() * 900000),
    });

    const savedParticipant = await participant.save();

    // 🔗 Link participant to events
    if (savedParticipant.events.length > 0) {
      await Event.updateMany(
        { _id: { $in: savedParticipant.events } },
        { $addToSet: { participants: savedParticipant._id } }
      );
    }

    res.status(201).json(savedParticipant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =====================================================
   ✏️ UPDATE PARTICIPANT (ADMIN SAFE UPDATE)
===================================================== */
export const updateParticipant = async (req, res) => {
  try {
    const updated = await Participant.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: req.body.paymentStatus,
        accommodationStatus: req.body.accommodationStatus,
        travelStatus: req.body.travelStatus,
      },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Participant not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =====================================================
   ❌ DELETE PARTICIPANT
===================================================== */
export const deleteParticipant = async (req, res) => {
  try {
    const deleted = await Participant.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Participant not found" });
    }

    // 🔥 Optional: remove participant from events
    await Event.updateMany(
      { participants: deleted._id },
      { $pull: { participants: deleted._id } }
    );

    res.json({ message: "Participant deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
