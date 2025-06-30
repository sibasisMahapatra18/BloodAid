import React from 'react';
import '../../styles/Profile.css';

const Profile = () => {
  const user = {
    name: "Udita Rath",
    email: "udita@example.com",
    bloodGroup: "B+",
    phone: "+91 9876543210",
    address: "Bhubaneswar, Odisha",
    age: 21,
    gender: "Female",
    registeredOn: "2024-02-10"
  };

  const handleEditClick = () => {
    alert("Edit Profile clicked!");
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">Your Profile</h2>
      <div className="profile-card">
        <div className="profile-item"><strong>Name:</strong> {user.name}</div>
        <div className="profile-item"><strong>Email:</strong> {user.email}</div>
        <div className="profile-item"><strong>Blood Group:</strong> {user.bloodGroup}</div>
        <div className="profile-item"><strong>Phone:</strong> {user.phone}</div>
        <div className="profile-item"><strong>Address:</strong> {user.address}</div>
        <div className="profile-item"><strong>Age:</strong> {user.age}</div>
        <div className="profile-item"><strong>Gender:</strong> {user.gender}</div>
        <div className="profile-item"><strong>Registered On:</strong> {user.registeredOn}</div>

        <button className="edit-btn" onClick={handleEditClick}>Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
