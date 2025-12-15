import Coordinator from "../models/Coordinator.js";

// ✅ Get all coordinators
export const getAllCoordinators = async (req, res) => {
  try {
    const coordinators = await Coordinator.find();
    res.json(coordinators);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create a new coordinator
export const createCoordinator = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    const coordinator = await Coordinator.create({ ...req.body, image: imagePath });
    await coordinator.save();
    res.status(201).json(coordinator);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✏️ Update coordinator
export const updateCoordinator = async (req, res) => {
  try {
    const updatedCoordinator = await Coordinator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCoordinator)
      return res.status(404).json({ message: "Coordinator not found" });

    res.json(updatedCoordinator);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🗑️ Delete coordinator
export const deleteCoordinator = async (req, res) => {
  try {
    const deletedCoordinator = await Coordinator.findByIdAndDelete(req.params.id);

    if (!deletedCoordinator)
      return res.status(404).json({ message: "Coordinator not found" });

    res.json({ message: "Coordinator deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
