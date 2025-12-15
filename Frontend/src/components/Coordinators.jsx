import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import API from "../api";
import "../css/coordinators.css";
const BASE = API.defaults.baseURL;

export default function Coordinators() {
  const [coordinators, setCoordinators] = useState([]);
  const [flippedId, setFlippedId] = useState(null); // फक्त एकच card flip होईल

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const res = await API.get("/coordinators");
        console.log("API RESPONSE → ", res.data);
        setCoordinators(res.data.data || res.data || []);
      } catch (err) {
        console.error("Error fetching coordinators:", err);
      }
    };
    fetchCoordinators();
  }, []);

  const handleFlip = (id) => {
    setFlippedId((prev) => (prev === id ? null : id)); // पुन्हा click केला तर flip बंद होईल
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold" style={{fontFamily:"Roboto", color:"#fff"}}>
        Meet Our Coordinators
      </h2>

      <div className="row g-4">
        {coordinators.map((c) => (
          <div key={c._id} className="col-6 col-md-6 col-lg-3">
            <div
              className={`flip-card ${flippedId === c._id ? "flipped" : ""}`}
              onClick={() => handleFlip(c._id)}
            >
              <div className="flip-card-inner shadow-lg">
                {/* FRONT */}
                <div className="flip-card-front bg-white border border-gray-200 front">
                  {c.image && (
<img
  src={
    c.image.startsWith("http")
      ? c.image
      : `${BASE.replace("/api", "")}/${c.image.replace(/^\/+/, "")}`
  }
  alt={c.name}
  className="card-img-top img-fluid"
  style={{ height: "300px", objectFit: "cover" }}
/>
                  )}
                </div>

                {/* BACK */}
                <div className="flip-card-back d-flex flex-column justify-content-center align-items-center text-center rounded back">
                  <div className="back-overlay back">
                    <h4 className="fw-bold text-white mb-2">{c.name}</h4>
                    <p className="text-light mb-1">{c.designation}</p>
                    <div className="decor-line my-3"></div>
                    <p className="small text-white-50">(Click to flip back)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
