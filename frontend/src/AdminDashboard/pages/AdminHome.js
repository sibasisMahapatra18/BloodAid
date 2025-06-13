import React from "react";
import "./../AdminDashboard.css";

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h2 className="dashboard-heading">Welcome, Admin! 🩸</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card users">
          <h3>Total Users</h3>
          <p>128</p>
        </div>
        <div className="dashboard-card requests">
          <h3>Blood Requests</h3>
          <p>34</p>
        </div>
        <div className="dashboard-card donations">
          <h3>Total Donations</h3>
          <p>52</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
