import axios from "axios";

const API_URL = "https://hospital-management-system-9rt1.onrender.com/api/medical-records";

const getTokenHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get records with optional patient filter
export const getMedicalRecords = (page = 1, limit = 10, patientId = "") => {
  const query = `?page=${page}&limit=${limit}${patientId ? `&patient=${patientId}` : ""}`;
  return axios.get(API_URL + query, getTokenHeaders());
};

// Get single record
export const getMedicalRecord = (id) => {
  return axios.get(`${API_URL}/${id}`, getTokenHeaders());
};

// Create new medical record
export const createMedicalRecord = (data) => {
  return axios.post(API_URL, data, getTokenHeaders());
};

// Update medical record
export const updateMedicalRecord = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data, getTokenHeaders());
};

// Add lab test to a record
export const addLabTest = (id, data) => {
  return axios.post(`${API_URL}/${id}/lab-tests`, data, getTokenHeaders());
};

// Get patient medical history
export const getPatientMedicalHistory = (patientId, page = 1, limit = 10) => {
  return axios.get(`${API_URL}/patient/${patientId}?page=${page}&limit=${limit}`, getTokenHeaders());
};

// Get medical record statistics
export const getMedicalRecordStats = () => {
  return axios.get(`${API_URL}/stats`, getTokenHeaders());
};
