// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkServer } from "../utils/checker";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isServerUp, setIsServerUp] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const serverUp = await checkServer();
      if (!serverUp) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setIsServerUp(serverUp);
      setLoading(false);
    };
    verify();
  }, []);

  if (loading) return <p>Checking server...</p>;

  if (!isServerUp) return <Navigate to="/login" replace />;

  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  return children;
}

