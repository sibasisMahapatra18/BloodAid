import React, { useState } from "react";
import "../AdminDashboard.css";

const BloodRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      bloodType: "A+",
      location: "Delhi",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      bloodType: "B-",
      location: "Mumbai",
      status: "Pending",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
  };

  return (
    <div className="admin-content">
      <h2 className="admin-heading">Blood Requests</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Name</th>
            <th>Blood Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.name}</td>
              <td>{req.bloodType}</td>
              <td>{req.location}</td>
              <td>{req.status}</td>
              <td>
                <button
                  className="action-btn approve"
                  onClick={() => handleStatusChange(req.id, "Approved")}
                  disabled={req.status === "Approved"}
                >
                  Approve
                </button>
                <button
                  className="action-btn reject"
                  onClick={() => handleStatusChange(req.id, "Rejected")}
                  disabled={req.status === "Rejected"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodRequests;
/*If you later integrate a backend API, you can replace handleStatusChange() to make a real API call like:
fetch(`/api/admin/requests/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: newStatus }),
})
*/