import React, { useEffect, useState } from 'react';
import '../../styles/History.css';

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // TODO: Replace this with API call to fetch request history
    // Example:
    // fetch('/api/user/history')
    //   .then(response => response.json())
    //   .then(data => setHistoryData(data))
    //   .catch(error => console.error("Error fetching history:", error));

    // Placeholder dummy data
    setHistoryData([
      {
        id: 1,
        bloodGroup: "B+",
        date: "2024-03-15",
        status: "Fulfilled"
      },
      {
        id: 2,
        bloodGroup: "B+",
        date: "2024-01-10",
        status: "Pending"
      }
    ]);
  }, []);

  return (
    <div className="history-container">
      <h2>Request History</h2>
      {historyData.length === 0 ? (
        <p className="no-history">No history records found.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.bloodGroup}</td>
                <td>{entry.date}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
