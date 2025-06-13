// src/AdminDashboard/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // ✅ Important: CSS import

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple check — replace with real API logic later
    if (adminID === "admin" && password === "admin123") {
      navigate("/admin"); // Redirect to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Admin ID"
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
