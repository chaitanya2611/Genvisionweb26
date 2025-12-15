import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// 🧱 Public components
import Navbar from "./components/Navbar";
import Events from "./components/Events";
import Participants from "./components/Participants";
import Students from "./components/Students";
import Guests from "./components/Guests";
import Coordinators from "./components/Coordinators";
import Footer from "./components/Footer";
import About from "./components/About"

// ⚙️ Admin components
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      {isAdminLoggedIn ? (
        // 🔐 Logged in as admin → Dashboard view
        <Dashboard />
      ) : (
        // 🌐 Normal public site view
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/students" element={<Students />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/coordinators" element={<Coordinators />} />
            <Route
              path="/admin"
              element={<AdminLogin onLogin={setIsAdminLoggedIn} />}
            />
            <Route path="/admin-register" element={<AdminRegister />} />

          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

