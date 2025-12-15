import Guest from "../models/Guest.js";

// ✅ Get all guests
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add new guest
export const createGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json(guest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✏️ Update guest
export const updateGuest = async (req, res) => {
  try {
    const updated = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Guest not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🗑️ Delete guest
export const deleteGuest = async (req, res) => {
  try {
    const deleted = await Guest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Guest not found" });
    res.json({ message: "Guest deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

