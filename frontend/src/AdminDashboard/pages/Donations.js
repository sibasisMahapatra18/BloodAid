import React from "react";
import "../AdminDashboard.css";

const Donations = () => {
  const mockDonations = [
    {
      id: 101,
      donor: "Ravi Kumar",
      bloodType: "O+",
      date: "2025-06-10",
      location: "Kolkata",
    },
    {
      id: 102,
      donor: "Meera Singh",
      bloodType: "AB-",
      date: "2025-06-08",
      location: "Chennai",
    },
  ];

  return (
    <div className="admin-content">
      <h2 className="admin-heading">Blood Donations</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Donation ID</th>
            <th>Donor Name</th>
            <th>Blood Type</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {mockDonations.map((donation) => (
            <tr key={donation.id}>
              <td>{donation.id}</td>
              <td>{donation.donor}</td>
              <td>{donation.bloodType}</td>
              <td>{donation.date}</td>
              <td>{donation.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donations;
