import College from "../models/College.js";

/* ========== GET ALL COLLEGES ========== */
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    res.json(colleges);
  } catch (err) {
    console.error("❌ Fetch colleges error:", err);
    res.status(500).json({ message: "Failed to fetch colleges" });
  }
};

/* ========== UPDATE COLLEGE FIELDS ========== */
export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    const { location, bioRelatedDepartment, outreachStatus, contactNumbers } =
      req.body;

    if (location !== undefined) updates.location = location;
    if (bioRelatedDepartment !== undefined)
      updates.bioRelatedDepartment = bioRelatedDepartment;
    if (outreachStatus !== undefined) updates.outreachStatus = outreachStatus;
    if (contactNumbers !== undefined) updates.contactNumbers = contactNumbers;

    const updatedCollege = await College.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedCollege)
      return res.status(404).json({ message: "College not found" });

    res.json(updatedCollege);
  } catch (err) {
    console.error("❌ Update college error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ========== ADD REVIEW ========== */
export const addCollegeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, by } = req.body;
    if (!text) return res.status(400).json({ message: "Review text required" });

    const college = await College.findById(id);
    if (!college) return res.status(404).json({ message: "College not found" });

    college.reviews.push({ text, by: by || "Admin" });
    await college.save(); // important for subdocument array

    res.status(201).json(college);
  } catch (err) {
    console.error("❌ addCollegeReview error:", err);
    res.status(500).json({ message: "Failed to add review" });
  }
};

/* ========== DELETE REVIEW ========== */
export const deleteCollegeReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const college = await College.findById(id);
    if (!college) return res.status(404).json({ message: "College not found" });

    college.reviews = college.reviews.filter(
      (r) => r._id.toString() !== reviewId
    );
    await college.save(); // important for subdocument array

    res.json(college);
  } catch (err) {
    console.error("❌ Delete review error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
