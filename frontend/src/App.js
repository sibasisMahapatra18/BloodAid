import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RequestBlood from "./components/DashboardContent/RequestBlood";
import ViewStatus from "./components/DashboardContent/ViewStatus";
import AvailableDonors from "./components/DashboardContent/AvailableDonors";
import Profile from "./components/DashboardContent/Profile";
import History from "./components/DashboardContent/History";

import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="request" element={<RequestBlood />} />
          <Route path="status" element={<ViewStatus />} />
          <Route path="donors" element={<AvailableDonors />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
