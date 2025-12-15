import { useState} from "react";
import API from "../api"; // axios instance

export default function AddParticipant() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "",
    social_link: "",
  });

  // const [events, setEvents] = useState([]); // events from backend

  // 🔄 Fetch events on load
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const res = await API.get("/events");
  //       setEvents(res.data);
  //     } catch (err) {
  //       console.error("Error fetching events:", err);
  //     }
  //   };
  //   fetchEvents();
  // }, []);

  // ✏️ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧩 Handle multi-event selection
  // const handleEventSelect = (e) => {
  //   const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
  //   setForm({ ...form, events: selected });
  // };

  // 💾 Submit participant
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/participants", form);
      alert("We will Contact you for further details");
      setForm({
        name: "",
        email: "",
        phone: "",
        college: "",
        department: "",
        year: "",
        social_link: "",
        events: [],
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding participant");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="text-center mb-4">Be a Part of the GenVision</h3>

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center gap-3"
          >
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
              type="string"
              className="form-control w-75"
              placeholder="LinkedIn / Instagram link"
              name="social_link"
              value={form.social_link}
              onChange={handleChange}
            />

            {/* 🌐 Multi-event selector */}
            {/* <div className="w-75">
              <label className="form-label fw-semibold">Select Events</label>
              <select
                multiple
                className="form-select"
                value={form.events}
                onChange={handleEventSelect}
              >
                {events.map((ev) => (
                  <option key={ev._id} value={ev._id}>
                    {ev.name}
                  </option>
                ))}
              </select>
            </div> */}

            <button type="submit" className="btn btn-success px-5 fw-semibold mt-3">
              Count Me In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

