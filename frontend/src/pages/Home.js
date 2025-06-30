import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTint } from 'react-icons/fa'; // Blood drop icon
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handleUserLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">
          <FaTint className="blood-icon" />
          BloodAid
        </div>

        {/* 
        // Sign Out button is not needed here since no auth is set
        // <button className="signout-btn">Sign Out</button> 
        */}
      </nav>

      <div className="main-content">
        <h1 className="main-title">Donate Blood, Save Lives</h1>
        <p className="subtitle">Be the reason someone smiles again.</p>

        <div className="button-group">
          <button className="primary-btn" onClick={handleUserLogin}>
            Login as User
          </button>
          <button className="primary-btn" onClick={handleAdminLogin}>
            Login as Admin
          </button>
        </div>

        <div className="register-section">
          Don’t have an account?
          <span className="register-link" onClick={handleRegister}> Register</span>
        </div>
      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} BloodAid. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
