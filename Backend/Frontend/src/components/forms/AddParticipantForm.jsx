import { useState, useEffect } from "react";
import API from "../../api";

export default function ManageParticipants() {
  const [participants, setParticipants] = useState([]);
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);

  // -----------------------------------------------
  // Fetch initial data
  // -----------------------------------------------
  useEffect(() => {
    (async () => {
      const [pRes, eRes] = await Promise.all([
        API.get("/participants"),
        API.get("/events"),
      ]);

      setParticipants(pRes.data);
      setEvents(eRes.data);
    })();
  }, []);

  // -----------------------------------------------
  // Open Edit Form
  // -----------------------------------------------
  const handleEdit = (p) => {
    setEditing({
      ...p,
      payment_status: p.payment_status?.toLowerCase() || "pending",
      accommodation_status: p.accommodation_status?.toLowerCase() || "pending",
      travel_status: p.travel_status?.toLowerCase() || "pending",
      events: p.events?.map((ev) => ev._id) || [],
    });
  };

  // -----------------------------------------------
  // Update Form Fields
  // -----------------------------------------------
  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  const handleEventSelect = (e) => {
    const selected = [...e.target.selectedOptions].map((o) => o.value);
    setEditing({ ...editing, events: selected });
  };

  // -----------------------------------------------
  // Save Updated Participant
  // -----------------------------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/participants/${editing._id}`, editing);
      alert("Updated successfully!");

      // refresh
      const res = await API.get("/participants");
      setParticipants(res.data);

      setEditing(null);
    } catch {
      alert("Error updating participant");
    }
  };

  // -----------------------------------------------
  // Delete Participant
  // -----------------------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this participant?")) return;

    await API.delete(`/participants/${id}`);
    alert("Deleted!");

    setParticipants((prev) => prev.filter((p) => p._id !== id));
  };

  // -----------------------------------------------
  // JSX Render
  // -----------------------------------------------
  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">🎓 Participants List</h2>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>College</th>
              <th>Event(s)</th>
              <th>Payment</th>
              <th>Accommodation</th>
              <th>Travel</th>
              <th>Reg ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {participants.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.email}</td>
                <td>{p.college}</td>
                <td>{p.events.map((ev) => ev.name).join(", ")}</td>
                <td>{p.payment_status}</td>
                <td>{p.accommodation_status}</td>
                <td>{p.travel_status}</td>
                <td>{p.registrationId}</td>

                <td className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleEdit(p)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT FORM */}
      {editing && (
        <div className="p-4 mt-4 border rounded bg-light shadow-sm">
          <h4>Edit Participant: {editing.name}</h4>

          <form className="row g-3" onSubmit={handleUpdate}>
            <div className="col-md-6">
              <input
                name="name"
                value={editing.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                name="email"
                value={editing.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>

            <div className="col-md-6">
              <select
                name="payment_status"
                value={editing.payment_status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="pending">Payment Pending</option>
                <option value="confirmed">Payment Confirmed</option>
              </select>
            </div>

            <div className="col-md-6">
              <select
                name="accommodation_status"
                value={editing.accommodation_status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="pending">Accommodation Pending</option>
                <option value="confirmed">Accommodation Confirmed</option>
                <option value="rejected">Accommodation Rejected</option>
              </select>
            </div>

            <div className="col-md-6">
              <select
                name="travel_status"
                value={editing.travel_status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="pending">Travel Pending</option>
                <option value="confirmed">Travel Confirmed</option>
                <option value="rejected">Travel Rejected</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold">Select Events</label>
              <select
                multiple
                className="form-select"
                value={editing.events}
                onChange={handleEventSelect}
              >
                {events.map((ev) => (
                  <option key={ev._id} value={ev._id}>
                    {ev.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center mt-3">
              <button className="btn btn-success px-4 fw-semibold">
                💾 Save Changes
              </button>

              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={() => setEditing(null)}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

