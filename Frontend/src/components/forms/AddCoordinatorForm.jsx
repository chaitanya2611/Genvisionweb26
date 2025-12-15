import { useState, useEffect } from "react";
import API from "../../api";
const BASE = API.defaults.baseURL.replace("/api", "");
export default function AddCoordinatorForm() {
  const [form, setForm] = useState({ name: "", designation: "", contact: "" });
  const [imageFile, setImageFile] = useState(null);
  const [coordinators, setCoordinators] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
    try {
      const res = await API.get("/coordinators");
      setCoordinators(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("designation", form.designation);
      formData.append("contact", form.contact);
      if (imageFile) formData.append("image", imageFile);

      if (editingId) {
        await API.put(`/coordinators/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Coordinator updated successfully!");
      } else {
        await API.post("/coordinators", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Coordinator added successfully!");
      }

      setForm({ name: "", designation: "", contact: "" });
      setImageFile(null);
      setEditingId(null);
      fetchCoordinators();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Error adding/updating coordinator");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this coordinator?")) {
      await API.delete(`/coordinators/${id}`);
      alert("🗑️ Coordinator deleted!");
      fetchCoordinators();
    }
  };

  const handleEdit = (c) => {
    setForm({ name: c.name, designation: c.designation, contact: c.contact });
    setEditingId(c._id);
    setImageFile(null);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Manage Coordinators</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="row g-3 align-items-end">
        <div className="col-md-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Coordinator Name"
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Designation</label>
          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="form-control"
            placeholder="Designation"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Contact</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="form-control"
            placeholder="Contact"
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Image</label>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="form-control"
          />
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="img-thumbnail mt-2"
              style={{ width: "150px", height: "200px", objectFit: "cover" }}
            />
          )}
        </div>
        <div className="col-md-2">
          <button
            type="submit"
            className={`btn w-100 ${
              editingId ? "btn-warning" : "btn-primary"
            }`}
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      {/* Coordinator List */}
      <div className="row mt-5 g-4">
        {coordinators.map((c) => (
          <div key={c._id} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="card h-100 text-center">
              {c.image && (
               <img
               alt={c.name}
  src={
    c.image.startsWith("http")
      ? c.image
      : `${BASE}/${c.image.replace(/^\/+/, "")}`
  }
/>
              )}
              <div className="card-body p-2">
                <h6 className="card-title mb-1">{c.name}</h6>
                <p className="card-text mb-1" style={{ fontSize: "0.8rem" }}>
                  {c.designation}
                </p>
                <p className="card-text mb-2" style={{ fontSize: "0.7rem" }}>
                  {c.contact}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="btn btn-sm btn-warning"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-sm btn-danger"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
