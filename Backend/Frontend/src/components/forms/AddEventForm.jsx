import { useState, useEffect } from "react";
import API from "../../api";

export default function AddEventForm() {
  const [form, setForm] = useState({ name: "", description: "", date:"", venue:""});
  const [imageFile, setImageFile] = useState(null);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // 🧩 Fetch all events when component loads
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
          const res = await API.get("/events");
          console.log("Events fetched:", res.data);
          setEvents(res.data);
        } catch (err) {
          console.error("FetchEvents error:", err.response || err);
        }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // 🧩 Add new event
  const handleSubmit = async (e) => {
  e.preventDefault();
const formData = new FormData();
Object.keys(form).forEach(key => formData.append(key, form[key]));

  if (imageFile) {
    console.log("Appending image:", imageFile); // 🔍 debug
    formData.append("image", imageFile); // key should exactly match backend multer
  }
 

if (editingId) {
  
    await API.put(`/events/${editingId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}else {
  try {
  await API.post("/events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Error adding/updating coordinator");
  }
}

    setForm({ name: "", description: "", date: "", venue: ""});
    setImageFile(null);
    setEditingId(null);
    fetchEvents();
};

  // 🧩 Delete event
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await API.delete(`/events/${id}`);
      alert("🗑️ Event deleted!");
      fetchEvents();
    }
  };

  // 🧩 Edit event (load data into form)
// 🧩 Edit event (load data into form)
const handleEdit = (event) => {
  setForm({
    name: event.name || "",
    description: event.description || "",
    date: event.date ? event.date.split("T")[0] : "", // yyyy-mm-dd format
    venue: event.venue || "",
  });
  setEditingId(event._id);
  setImageFile(null);
};


  return (
    <div className="card shadow-sm border-0 h-100">
      <h2 className="text-2xl font-bold">Manage Events</h2>

      {/* ✏️ Add/Edit Form */}
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="col-md-6 p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="col-md-6 p-4 border rounded"
        />
             <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="col-md-6 p-2 border rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="col-md-6 p-2 border rounded"
        />
        <input
          name="venue"
          value={form.venue}
          onChange={handleChange}
          placeholder="Venue"
          className="col-md-6 p-2 border rounded"
          required
        />
        <div className="col-md-2">
          <label className="form-label">Image</label>
         <input
  type="file"
  onChange={(e) => {
    console.log("File selected:", e.target.files[0]); // 🔍 debug
    setImageFile(e.target.files[0]);
  }}
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
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Event" : "Add Event"}
        </button>
      </form>

      {/* 📋 Events List */}
      <div className="row mt-5 g-4">
        {events.map((c) => (
          <div key={c._id} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="card h-100 text-center">
              {c.image && (
                 <img
    src={`https://genvision-26.onrender.com/${c.image.replace(/^\/+/, "")}`}
    className="card-img-top"
    alt={c.name}
    style={{ height: "250px", objectFit: "cover" }}
  />
              )}
              <div className="card-body p-2">
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
