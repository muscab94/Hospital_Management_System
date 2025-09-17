// src/utils/checkServer.js
import axios from "axios";

export const checkServer = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/health"); // make a lightweight endpoint
    return res.status === 200;
  } catch (err) {
    return false; // server is unreachable
  }
};
