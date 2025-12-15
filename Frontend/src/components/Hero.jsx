import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../hero.css";

export default function Hero() {
  return (
    <section className="hero d-flex align-items-center text-center">
      <div className="container">
        <h1 className="display-3 fw-bold text-white">GenVision 2025</h1>
        <p className="lead text-light mb-4">
          IIT Bombay’s Department of Biosciences & Bioengineering proudly presents
          <br />
          <span className="fw-semibold text-warning">GenVision Events</span> — Where Innovation Meets Inspiration!
        </p>
        <a href="/events" className="btn btn-primary btn-lg">
          Explore Events 🚀
        </a>
      </div>
    </section>
  );
}
