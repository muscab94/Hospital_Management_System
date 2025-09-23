// src/utils/checkServer.js
import axios from "axios";

export const checkServer = async () => {
  try {
    const res = await axios.get("https://hospital-management-system-9rt1.onrender.com/health"); // make a lightweight endpoint
    return res.status === 200;
  } catch (err) {
    return false; // server is unreachable
  }
};
export const calculateAge = (dob) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};