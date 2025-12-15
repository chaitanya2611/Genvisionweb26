import { useState, useEffect } from "react";
import API from "../../api";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🧠 Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      alert("❌ Error fetching students");
    }
  };

  // ✏️ Set student for editing
  const handleEdit = (student) => {
    setEditing({ ...student });
  };

  // 💾 Save updated student
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/students/${editing._id}`, editing);
      alert("✅ Student updated successfully!");
      setEditing(null);
      fetchStudents();
    } catch (err) {
      alert("❌ Error updating student");
    }
  };

  // ❌ Delete student
  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      try {
        await API.delete(`/students/${id}`);
        alert("🗑️ Deleted successfully!");
        fetchStudents();
      } catch {
        alert("❌ Error deleting student");
      }
    }
  };

  // 🔄 Handle input changes in edit form
  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-3">🎓 Student Management</h2>

      {/* 📋 Students Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College</th>
              <th>Dept</th>
              <th>Year</th>
              <th>Place</th>
              <th>Social</th>
              <th>Reg ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone || "-"}</td>
                <td>{s.college || "-"}</td>
                <td>{s.department || "-"}</td>
                <td>{s.year || "-"}</td>
                <td>{s.place || "-"}</td>
                <td>
                  {s.social_link ? (
                    <a href={s.social_link} target="_blank" rel="noreferrer">
                      🌐 Link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>{s.registrationId}</td>
                <td className="d-flex gap-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="btn btn-sm btn-outline-warning"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🧾 Edit Form Modal */}
      {editing && (
        <div className="p-4 mt-4 border rounded bg-light shadow-sm">
          <h4>Edit Student: {editing.name}</h4>
          <form onSubmit={handleUpdate} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                name="name"
                value={editing.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                name="email"
                value={editing.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                value={editing.phone || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Place</label>
              <input
                name="place"
                value={editing.place || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">College</label>
              <input
                name="college"
                value={editing.college || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Department</label>
              <input
                name="department"
                value={editing.department || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Year</label>
              <input
                name="year"
                value={editing.year || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Social Link</label>
              <input
                name="social_link"
                value={editing.social_link || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-success px-4 fw-semibold">
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
