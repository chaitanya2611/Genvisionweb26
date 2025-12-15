import { useState } from "react";
import API from "../api"; // axios instance

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    college: "",
    department: "",
    year: "",
    social_link: "",
  });

  const [loading, setLoading] = useState(false);

  // ✏️ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💾 Submit student
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/students", form);
      alert("✅ Student added successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        place: "",
        college: "",
        department: "",
        year: "",
        social_link: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error , Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="text-center mb-4">Notify Us</h3>

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center gap-3"
          >
            {/* 🔹 Basic Info */}
            <input
              type="text"
              className="form-control w-75"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              className="form-control w-75"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="form-control w-75"
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control w-75"
              placeholder="Place"
              name="place"
              value={form.place}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control w-75"
              placeholder="College"
              name="college"
              value={form.college}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control w-75"
              placeholder="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control w-75"
              placeholder="Year"
              name="year"
              value={form.year}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control w-75"
              placeholder="LinkedIn / Instagram link"
              name="social_link"
              value={form.social_link}
              onChange={handleChange}
            />

            {/* 🔘 Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-success px-5 fw-semibold mt-3"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
