// src/services/UserService.js
import axios from "axios";

const USER_API_URL = 'http://localhost:8080/user';

export const getUserById = (id) => axios.get(`${USER_API_URL}/${id}`);

export const updateUser = (id, user) => axios.put(`${USER_API_URL}/${id}`, user);

export const deleteUser = (id) => axios.delete(`${USER_API_URL}/${id}`);

export const getAllUsers = () => axios.get(USER_API_URL);

export const searchUsers = (query) => axios.get(`${USER_API_URL}/search`, { params: { query } });

export const greetUser = () => axios.get(`${USER_API_URL}/greet`);