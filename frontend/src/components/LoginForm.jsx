import React, { useState } from "react";
import assets from "../assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [user, setuser] = useState({
    userName: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Send login request to your backend
      const res = await axios.post(
        "https://hospital-management-system-9rt1.onrender.com/api/auth/login",
        formData
      );

      const userData = {
        name: res.data.data.name,
        role: res.data.data.role,
        id: res.data.data._id
      };
      setuser(userData);
      // Save JWT token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      // Redirect to dashboard (or homepage)
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="bg-white w-2/6 shadow-lg p-7 rounded-2xl">
      <div className="grid place-items-center mb-8">
        <img src={assets.health_data_security} alt="" className="mb-2 w-20" />
        <h1 className="font-bold text-3xl mb-1">Cumaan Hospital </h1>
        <h3 className="font-thin text-2xl">Hospital Management System</h3>
      </div>
      <div className="mb-2.5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="pl-2 text-lg mb-0.5" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-5 py-2 text-xl border-2 border-black rounded-3xl"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="pl-2 text-lg mb-0.5" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-5 py-2 text-xl border-2 border-black rounded-3xl"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="pl-2 text-red-700 text-md">{error}</p>}
          <button
            className="mt-2.5 px-8 py-2 rounded-3xl text-xl font-bold bg-black text-white
                hover:bg-slate-50 hover:text-black hover:scale-105"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
