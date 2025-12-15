import { useEffect, useState } from "react";
import API from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-8">
      <h1
        className="text-3xl font-bold mb-4 text-white"
        style={{ textAlign: "center" }}
      >
        GenVision Events
      </h1>

      <div className="row g-4">
        {events.map((ev) => (
          <div key={ev._id} className="col-6 col-md-4 col-lg-3">
            <div
              className="card shadow"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              {ev.image && (
                <img
                  src={`https://genvision-26.onrender.com/${ev.image.replace(/^\/+/, "")}`}
                  alt={ev.name}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}