// src/AdminDashboard/AdminSidebar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Later: Clear auth token if using one
    navigate("/admin-login");
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-top">
        <h2 className="admin-title">
          <span role="img" aria-label="blood">🩸</span> Admin
        </h2>
        <nav className="admin-nav">
          <NavLink
            to="/admin/home"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/admin/requests"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            Blood Requests
          </NavLink>
          <NavLink
            to="/admin/donations"
            className={({ isActive }) =>
              isActive ? "admin-link active" : "admin-link"
            }
          >
            Donations
          </NavLink>
        </nav>
      </div>

      <div className="admin-sidebar-bottom">
        <button className="signout-btn" onClick={handleSignOut}>
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
