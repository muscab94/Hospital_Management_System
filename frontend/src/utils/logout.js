import axios from "axios";


const handleLogout = async (fn, path) => {
    try {
      // Call your backend logout API
      await axios.post(
        "https://hospital-management-system-9rt1.onrender.com/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Clear token from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user")

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