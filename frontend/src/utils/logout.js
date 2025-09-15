import axios from "axios";


const handleLogout = async (fn, path) => {
    try {
      // Call your backend logout API
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Clear token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      fn(path);
    } catch (err) {
      console.error("Logout failed:", err);
      // Fallback: still clear token and redirect
      localStorage.removeItem("token");
      fn(path);
    }
};

export default handleLogout;