import { useState } from "react";
import API from "../api";

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", form);
      localStorage.setItem("token", res.data.token);
      alert("✅ Logged in successfully!");
      onLogin(true);
    } catch (err) {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}

