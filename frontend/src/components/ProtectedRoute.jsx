// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // check if user has JWT token

  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login if not authenticated
  }

  return children; // allow access if authenticated
}

export default ProtectedRoute;
