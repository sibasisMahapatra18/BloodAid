import React, { useState } from 'react';
import '../../styles/RequestBlood.css';
import { FaTint } from 'react-icons/fa'; // blood drop icon

const RequestBlood = () => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    units: '',
    hospital: '',
    contact: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Integrate API call to submit blood request here
    console.log('Form submitted:', formData);
    alert('Blood request submitted successfully!');

    setFormData({
      name: '',
      bloodGroup: '',
      units: '',
      hospital: '',
      contact: '',
      reason: '',
    });
  };

  return (
    <div className="request-blood-wrapper">
      <div className="sidebar-placeholder" />

      <div className="request-blood-content-wrapper">
        <div className="request-content">
          <h2><FaTint className="icon" /> Request Blood</h2>
          <form className="request-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <input
              type="number"
              name="units"
              placeholder="Units Needed"
              value={formData.units}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="hospital"
              placeholder="Hospital Name & Address"
              value={formData.hospital}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <textarea
              name="reason"
              placeholder="Reason for Request"
              value={formData.reason}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestBlood;
