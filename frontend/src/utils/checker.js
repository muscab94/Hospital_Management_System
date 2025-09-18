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
