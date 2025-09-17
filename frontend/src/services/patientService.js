import axios from "axios";

const API_URL = "http://localhost:5000/api/patients";

const getTokenHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const fetchPatients = () => {
  return axios.get(API_URL, getTokenHeaders());
};
