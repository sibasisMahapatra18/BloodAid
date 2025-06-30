import React, { useState } from 'react';
import '../styles/Login.css';
// import { useNavigate } from 'react-router-dom'; // 🔁 Uncomment to enable navigation

const Login = () => {
  // const navigate = useNavigate(); // 🔁 Uncomment to enable navigation

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Dummy login logic — replace with real API call later
    console.log('Login Data:', formData);
    alert('Login Successful!');

    // 🔁 Dummy redirect to dashboard
    // navigate('/dashboard'); // Uncomment this line to enable redirection after login
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">BloodAid</h1>
        <p className="login-subtitle">User Login</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
