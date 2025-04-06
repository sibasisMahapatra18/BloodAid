import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTint, FaUser, FaHistory, FaSignOutAlt, FaClipboardList, FaUsers } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2>BloodAid</h2>
        <ul>
          <li>
            <NavLink to="request">
              <FaTint /> Request Blood
            </NavLink>
          </li>
          <li>
            <NavLink to="status">
              <FaClipboardList /> View Status
            </NavLink>
          </li>
          <li>
            <NavLink to="donors">
              <FaUsers /> Available Donors
            </NavLink>
          </li>
          <li>
            <NavLink to="profile">
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="history">
              <FaHistory /> History
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="sidebar-footer" onClick={handleSignOut}>
        <FaSignOutAlt className="signout-icon" />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default Sidebar;
