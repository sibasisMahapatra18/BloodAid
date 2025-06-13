import React, { useEffect, useState } from "react";
import "./../AdminDashboard.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Dummy data (to be replaced with API call)
  useEffect(() => {
    const sampleUsers = [
      { id: 1, name: "Ravi Sharma", email: "ravi@example.com", bloodType: "A+", role: "Donor" },
      { id: 2, name: "Anita Das", email: "anita@example.com", bloodType: "B-", role: "Recipient" },
    ];
    setUsers(sampleUsers);
  }, []);

  // 🚨 Handle Delete
  const handleDelete = (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers); // Later this will call DELETE API
    }
  };

  // Placeholder Edit (can open a modal/form later)
  const handleEdit = (userId) => {
    alert(`Edit user with ID: ${userId} (Functionality coming soon)`);
  };

  return (
    <div className="admin-content">
      <h2 className="admin-page-title">Manage Users</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Blood Type</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.bloodType}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
