import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-6">
      <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mt-4">
        Oops! Page not found
      </p>
      <p className="text-gray-600 mt-2 text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800"
      >
        <Home size={18} /> Back to Home
      </button>
    </div>
  );
}

export default NotFound;
