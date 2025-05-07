// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090', // your backend runs on port 8090
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
