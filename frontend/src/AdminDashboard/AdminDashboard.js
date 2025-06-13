// src/AdminDashboard/AdminDashboard.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHome from "./pages/AdminHome";
import ManageUsers from "./pages/ManageUsers";
import BloodRequests from "./pages/BloodRequests";
import Donations from "./pages/Donations";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main-content">
        <Routes>
          <Route path="/" element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="requests" element={<BloodRequests />} />
          <Route path="donations" element={<Donations />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
