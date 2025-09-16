import axios from "axios";

const API_URL = 'http://localhost:5000/api/medical-records';
const token = localStorage.getItem("token");

export const getMedicalRecords = (page = 1, limit = 10, patientId = "") => {
  if (!token) {
    navigate("/login"); // redirect if no token
    return;
  }
  const query = `?page=${page}&limit=${limit}${
    patientId ? `&patient=${patientId}` : ""
  }`;
  return axios.get(API_URL + query, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMedicalRecord = (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};

export const createMedicalRecord = (data) => axios.post(API_URL, data);

export const updateMedicalRecord = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

export const addLabTest = (id, data) =>
  axios.post(`${API_URL}/${id}/lab-tests`, data);

export const getPatientMedicalHistory = (patientId, page = 1, limit = 10) =>
  axios.get(`${API_URL}/patient/${patientId}?page=${page}&limit=${limit}`);

export const getMedicalRecordStats = () => axios.get(`${API_URL}/stats`);
