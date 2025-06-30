// src/services/DonorService.js
import axios from "axios";

const DONOR_API_URL = 'http://localhost:8080/api/donors';

export const getAllDonors = () => axios.get(DONOR_API_URL);

export const getDonorById = (id) => axios.get(`${DONOR_API_URL}/${id}`);

export const createDonor = (donor) => axios.post(DONOR_API_URL, donor);

export const updateDonor = (id, donor) => axios.put(`${DONOR_API_URL}/${id}`, donor);

export const deleteDonor = (id) => axios.delete(`${DONOR_API_URL}/${id}`);