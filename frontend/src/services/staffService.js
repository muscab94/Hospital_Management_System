import axios from 'axios';

const API_URL = 'http://localhost:5000/api/staff';

// Helper function to get headers with token
export const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchStaff = (params) => axios.get(API_URL, { params, ...getHeaders() });
export const fetchStaffMember = (id) => axios.get(`${API_URL}/${id}`, getHeaders());
export const updateStaffMember = (id, data) => axios.put(`${API_URL}/${id}`, data, getHeaders());
export const deactivateStaffMember = (id) => axios.delete(`${API_URL}/${id}`, getHeaders());
export const fetchDoctors = () => axios.get(`${API_URL}/doctors`, getHeaders());
export const fetchStaffStats = () => axios.get(`${API_URL}/stats`, getHeaders());


// Create staff (register)
export const createStaff = (data) =>
  axios.post("http://localhost:5000/api/auth/register", data, getHeaders());

// Update staff (admin updating staff by ID)
export const updateStaff = (id, data) =>
  axios.put(`http://localhost:5000/api/users/${id}`, data, getHeaders());
