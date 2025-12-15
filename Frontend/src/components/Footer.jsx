import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Footer() {
  return (
        <footer
      style={{
        backgroundColor: "rgba(186,113,162,0.3)",
        color: "white",
        padding: "20px 0",
        borderRadius:"60px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Quick Links Section */}
        <div style={{ textAlign: "center", margin: "20px" }}>
          <h3>QUICK LINKS</h3>
          <br />
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <a
              href="https://www.facebook.com/symbiotek.org"
              style={{ textDecoration: "none" }}
            >
              <img src="https://genvision-26.onrender.com/uploads/facebook.png" alt="facebook" style= {{width: "40px", height:"40px"}} />
            </a>
            <a
              href="https://www.linkedin.com/in/symbiotek-iit-bombay/"
              style={{ textDecoration: "none" }}
            >
              <img
                src="https://genvision-26.onrender.com/uploads/linkdin.png"
                alt="LinkedIn"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
            <a
              href="https://www.youtube.com/@SymbiotekIITB"
              style={{ textDecoration: "none" }}
            >
              <img
                src="https://genvision-26.onrender.com/uploads/youtube.png"
                alt="YouTube"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
            <a
              href="https://www.instagram.com/genvision_iitb/?igshid=YmMyMTA2M2Y"
              style={{ textDecoration: "none" }}
            >
              <img
                src="https://genvision-26.onrender.com/uploads/instagram.png"
                alt="Instagram"
                style={{ width: "40px", height: "40px" }}
              />
            </a>
          </div>
        </div>

        {/* Google Map Section */}
        <div
          style={{
            textAlign: "center",
            flex: 1,
            maxWidth: "400px",
            margin: "20px",
          }}
        >
          <h3>OUR LOCATION</h3>
          <br />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.446108816232!2d72.91402602520675!3d19.13194013208417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f5c5583633%3A0x892b212b62b3b237!2sVictor%20Menezes%20Convention%20Centre!5e0!3m2!1sen!2sin!4v1734499586813!5m2!1sen!2sin"
            width="300"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Victor Menezes Convention Centre"
          ></iframe>
        </div>

        {/* Contact Section */}
        <div style={{ textAlign: "center", margin: "20px" }}>
          <h3>CONTACT US:</h3>
          <br />
          <p style={{ color: "white", fontSize: "110%" }}>
            Main Gate Rd, IIT
            <br />
            Area, Powai, Mumbai,
            <br />
            Maharashtra 400076
            <br />
            <a
              href="mailto:genvisioniitb@gmail.com"
              style={{ color: "white", textDecoration: "none" }}
            >
              genvisioniitb@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        &copy; Symbiotek Council 2026
      </div>
    </footer>
  );
}
  