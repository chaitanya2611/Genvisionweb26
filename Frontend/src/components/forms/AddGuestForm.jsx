import { useState, useEffect } from "react";
import API from "../../api";

export default function AddGuestForm() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [guests, setGuests] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const res = await API.get("/guests");
      setGuests(res.data);
    } catch (err) {
      console.error("❌ Error fetching guests:", err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("designation", form.designation);
    formData.append("description", form.description);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingId) {
        await API.put(`/guests/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Guest updated successfully!");
      } else {
        await API.post("/guests", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Guest added successfully!");
      }

      setForm({ name: "", designation: "", description: "" });
      setImageFile(null);
      setEditingId(null);
      fetchGuests();
    } catch (err) {
      console.error("❌ Error submitting guest:", err);
      alert("Error adding/updating guest");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this guest?")) {
      await API.delete(`/guests/${id}`);
      alert("🗑️ Guest deleted!");
      fetchGuests();
    }
  };

  const handleEdit = (g) => {
    setForm({
      name: g.name,
      designation: g.designation,
      description: g.description,
    });
    setEditingId(g._id);
    setImageFile(null);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Manage Guests</h2>

      {/* Guest Form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Guest Name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="form-control"
            placeholder="Guest Designation"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows="3"
            placeholder="Brief description about the guest"
          ></textarea>
        </div>

        <div className="mb-3">
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

        <div className="text-center">
          <button
            type="submit"
            className={`btn w-50 ${editingId ? "btn-warning" : "btn-primary"}`}
          >
            {editingId ? "Update Guest" : "Add Guest"}
          </button>
        </div>
      </form>

      {/* Guest List */}
      <div className="row mt-5 g-4">
        {guests.map((g) => (
          <div key={g._id} style={{width:"300px"}} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="card h-100 text-center">
              {g.image && (
                <img
  src={`https://genvision-26.onrender.com${g.image.startsWith("/") ? g.image : "/" + g.image}`}
  alt={g.name}
  className="card-img-top"
  style={{ height: "400px", objectFit: "cover" }}
/>
              )}
              <div className="card-body p-2">
                <h6 className="card-title mb-1">{g.name}</h6>
                <p className="card-text mb-1" style={{ fontSize: "0.8rem" }}>
                  {g.designation}
                </p>
                <p className="card-text mb-2" style={{ fontSize: "0.7rem" }}>
                  {g.description}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    onClick={() => handleEdit(g)}
                    className="btn btn-sm btn-warning"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(g._id)}
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
