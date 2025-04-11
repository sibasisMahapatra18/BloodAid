import React, { useEffect, useState } from 'react';
import '../../styles/ViewStatus.css';

const ViewStatus = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // 🔴 Replace this URL with your backend endpoint when ready
    // fetch('/api/view-status')
    //   .then(res => res.json())
    //   .then(data => setRequests(data));
  }, []);

  return (
    <div className="view-status-container">
      <h2>Your Blood Requests</h2>
      {requests.length > 0 ? (
        <table className="status-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Blood Group</th>
              <th>Units</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.units}</td>
                <td className={`status ${req.status.toLowerCase()}`}>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default ViewStatus;
