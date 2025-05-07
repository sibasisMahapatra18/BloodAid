import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import "../styles/Register.css"; // Ensure this path is correct

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "DONOR",
    bloodType: "",
    location: "",
    available: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8090/auth/register", formData);
      alert("✅ " + res.data);
      // Optional: Redirect here if needed
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        {error && <div className="error">{error}</div>}

        <div className="input-group">
          <span className="icon"><FaUser /></span>
          <input
            type="text"
            name="userName"
            placeholder="Full Name"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon"><FaEnvelope /></span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon"><FaPhone /></span>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon"><FaLock /></span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon"><MdBloodtype /></span>
          <input
            type="text"
            name="bloodType"
            placeholder="Blood Type (e.g. A+, O-)"
            value={formData.bloodType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon"><FaMapMarkerAlt /></span>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <span className="icon"><FaTint /></span>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="DONOR">Donor</option>
            <option value="RECEIVER">Receiver</option>
            <option value="ADMIN">Admin</option>
            <option value="HOSPITAL_STAFF">Hospital Staff</option>
          </select>
        </div>

        <label className="checkbox-label" style={{ marginTop: "0.5rem" }}>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />{" "}
          Available to donate
        </label>

        <button type="submit" className="register-btn">Register</button>

        <div className="login-redirect">
          Already have an account? <span onClick={() => window.location.href = "/login"}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default Register;
