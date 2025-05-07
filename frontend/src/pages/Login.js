// src/pages/Login.js
import React, { useState } from 'react';
import '../styles/Login.css';
import { loginUser } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(formData);
      localStorage.setItem('token', token);
      alert('Login Successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">BloodAid</h1>
        <p className="login-subtitle">User Login</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
