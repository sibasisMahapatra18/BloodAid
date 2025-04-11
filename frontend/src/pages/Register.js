import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // 🔁 Uncomment for navigation
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Register.css';

const Register = () => {
  // const navigate = useNavigate(); // 🔁 Uncomment for navigation

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError('');
      console.log('Registered:', formData);
      alert('Registration successful!');
      // 🔁 Dummy redirection to login after register
      // navigate('/login'); // Uncomment this line to enable navigation
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="register-btn" type="submit">Register</button>

        <p className="login-redirect">
          Already have an account? 
          {/* 🔁 Replace below with navigate('/login') to redirect programmatically */}
          <span onClick={() => alert('This would take you to login page.')}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
