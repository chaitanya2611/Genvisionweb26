import Event from "../models/Event.js";

// ✅ Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create a new event
export const createEvent = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    const event = await Event.create({ ...req.body, image: imagePath });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✏️ Update event
export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });

    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🗑️ Delete event
export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
