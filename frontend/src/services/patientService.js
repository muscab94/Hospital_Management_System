// src/services/patientService.js
import axios from "axios";

const API_URL = "https://hospital-management-system-9rt1.onrender.com/api/patients";

// Helper to include token
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Fetch all patients
export const fetchPatients = () => axios.get(API_URL, getHeaders());

// Fetch a single patient by ID
export const fetchPatient = (id) => axios.get(`${API_URL}/${id}`, getHeaders());

// Create a new patient
export const createPatient = (data) => axios.post(API_URL, data, getHeaders());

// Update patient by ID
export const updatePatient = (id, data) => axios.put(`${API_URL}/${id}`, data, getHeaders());

// Delete patient by ID
export const deletePatient = (id) => axios.delete(`${API_URL}/${id}`, getHeaders());
