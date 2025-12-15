import { useEffect, useState } from "react";
import API from "../api";
import "../css/guests.css"; // 👈 CSS इथे लिहायचं आहे

export default function Guests() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    API.get("/guests")
      .then((res) => setGuests(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-center mb-5 fw-bold text-white">Special Guests</h1>

      {guests.length === 0 ? (
        <p className="text-center text-muted">No guests added yet...</p>
      ) : (
        <div className="d-flex flex-wrap gap-4">
          {guests.map((g) => (
            <div key={g._id} className="guest-card">
              <div className="guest-img-wrapper">
                <img
  src={`https://genvision-26.onrender.com${g.image.startsWith("/") ? g.image : "/" + g.image}`}
  alt={g.name}
  className="card-img-top"
  style={{ height: "400px", objectFit: "cover" }}
/>
                <div className="guest-overlay">
                  <h4>{g.name}</h4>
                  <p className="designation">{g.designation}</p>
                  <p className="desc">{g.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
