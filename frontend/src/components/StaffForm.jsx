// src/components/StaffForm.jsx
import React, { useEffect, useState } from "react";
import { createStaff, updateStaff } from "../services/staffService";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getHeaders } from "../services/staffService";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function StaffForm() {
  const { id } = useParams(); // if present → edit mode
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
    specialty: "none",
    licenseNumber: 0,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // If editing, fetch staff details
  useEffect(() => {
    const fetchStaffMember = async () => {
      if (!id) return;
      try {
        const res = await axios.get(
          `https://hospital-management-system-9rt1.onrender.com/api/staff/${id}`,
          getHeaders()
        );
        setFormData({
          ...res.data.data,
          password: "", // don’t show password
        });
      } catch (err) {
        console.error("Failed to load staff:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load staff member",
        });
      }
    };

    fetchStaffMember();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Doctor validation
      if (
        formData.role === "doctor" &&
        (!formData.specialty || !formData.licenseNumber)
      ) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Doctors must have Specialty and License Number!",
        });
        setLoading(false);
        return;
      }

      if (id) {
        await updateStaff(id, formData);
        toast.success("Staff updated successfully!");
      } else {
        await createStaff(formData);
        toast.success("Staff created successfully!");
      }
      navigate("/dashboard/staffs");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong. Check console.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-3xl p-6 bg-white rounded shadow">
        {/* Top bar with Heading on left, Back button on right */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{id ? "Edit Staff" : "Add Staff"}</h2>
          <button
            type="button"
            onClick={() => navigate("/dashboard/staffs")}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid layout for common fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              className="w-full border p-2 rounded"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {!id && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
                value={formData.password}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full border p-2 rounded"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full border p-2 rounded"
              value={formData.address}
              onChange={handleChange}
            />
            <select
              name="role"
              className="w-full border p-2 rounded"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
              <option value="cashier">Cashier</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Grouped doctor fields */}
          {formData.role === "doctor" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded bg-gray-50">
              <select
                name="specialty"
                className="w-full border p-2 rounded"
                value={formData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Select Specialty</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Neurology">Neurology</option>
                <option value="Oncology">Oncology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Radiology">Radiology</option>
                <option value="Surgery">Surgery</option>
                <option value="Urology">Urology</option>
                <option value="General Medicine">General Medicine</option>
              </select>
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                className="w-full border p-2 rounded"
                value={formData.licenseNumber}
                onChange={handleChange}
                required={formData.role === "doctor"}
              />
            </div>
          )}

          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : id ? "Update Staff" : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
