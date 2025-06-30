// src/services/AuthService.js
import axios from "axios";

const AUTH_API_URL = 'http://localhost:8080/auth';

export const registerUser = (user) => axios.post(`${AUTH_API_URL}/register`, user);

export const loginUser = (credentials) => axios.post(`${AUTH_API_URL}/login`, credentials);