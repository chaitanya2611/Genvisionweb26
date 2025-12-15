import express from "express";
import auth from "../middleware/participantAuth.js";
import Participant from "../models/Participant.js";
import Event from "../models/Event.js";
import generatePassword from "../middleware/passwordGen.js";
import sendCredentials from "../middleware/mailer.js";
import bcrypt from "bcryptjs";
import {
  getAllParticipants,
  addParticipant,
  updateParticipant,
  deleteParticipant,
} from "../controllers/participantController.js";
import syncParticipants from "../middleware/sheetSync.js";

const router = express.Router();

async function updatePasswordAndSendMail(participantId) {
  const participant = await Participant.findById(participantId);
  if (!participant) throw new Error("Participant not found");

  // Already sent check (optional)
  if (participant.confirmationEmailSent) {
    return { alreadySent: true };
  }

  // 1️⃣ Generate new password
  const plainPassword = generatePassword();

  // 2️⃣ Send email first
  await sendCredentials(participant.email, plainPassword);

  // 3️⃣ Hash password & update DB
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  participant.password = hashedPassword;
  participant.confirmationEmailSent = true;
  await participant.save();

  return { success: true };
}
// Admin CRUD
router.get("/", getAllParticipants);
router.post("/", addParticipant);
router.put("/:id", updateParticipant);
router.delete("/:id", deleteParticipant);

// GET dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    const participant = await Participant.findById(req.participant._id).select("-password");
    if (!participant) {
      return res.status(404).json({ message: "User not found" });
    }

    const allEvents = await Event.find();

    const events = allEvents.map((event) => ({
      _id: event._id,
      title: event.title,
      image: event.image,
      participated: participant.events
        .map((e) => e.toString())
        .includes(event._id.toString()),
    }));

    res.json({
      fullName: participant.fullName,
      email: participant.email,
      groupKeyword: participant.groupKeyword,
      paymentStatus: participant.paymentStatus || "Pending",
      accommodationRequired: participant.accommodationRequired,
      ismumbaikar: participant.isMumbaikar,
      events,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/participate/:eventId", auth, async (req, res) => {
  const { eventId } = req.params;
  const { cancel } = req.body;

  try {
    const participant = await Participant.findById(req.participant._id);
    const event = await Event.findById(eventId);

    if (!participant || !event)
      return res.status(404).json({ message: "Participant or Event not found" });

    const eventIdStr = eventId.toString();

    if (cancel) {
      // REMOVE
      participant.events = participant.events.filter(
        (e) => e.toString() !== eventIdStr
      );

      event.participants = event.participants.filter(
        (p) => p.toString() !== participant._id.toString()
      );
    } else {
      // ADD (SAFE)
      if (!participant.events.some(e => e.toString() === eventIdStr)) {
        participant.events.push(event._id);
      }

      if (!event.participants.some(p => p.toString() === participant._id.toString())) {
        event.participants.push(participant._id);
      }
    }

    await participant.save();
    await event.save();

    res.json({
      message: cancel
        ? "Participation cancelled"
        : "Participation confirmed",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/send-confirmation/:id", async (req, res) => {
  try {
    const result = await updatePasswordAndSendMail(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Optional: sync from Google Sheet
router.post('/sync', async (req, res) => {
  try {
    await syncParticipants();
    res.send('Participants synced successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Optional: admin get single participant by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id).select("-password");
    if (!participant) return res.status(404).json({ message: "User not found" });
    res.json(participant);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;


