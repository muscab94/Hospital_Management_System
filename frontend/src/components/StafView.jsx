import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getHeaders } from "../services/staffService";

export default function StaffView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/staff/${id}`, getHeaders());
        setStaff(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch staff details");
        navigate("/dashboard/staffs");
      } finally {
        setLoading(false);
      }
    };
    fetchStaffMember();
  }, [id, navigate]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!staff) return <p className="p-6">Staff not found</p>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Staff Details</h2>
      <div className="space-y-2">
        <p><strong>Employee ID:</strong> {staff.employeeId}</p>
        <p><strong>Name:</strong> {staff.name}</p>
        <p><strong>Email:</strong> {staff.email}</p>
        <p><strong>Phone:</strong> {staff.phone}</p>
        <p><strong>Address:</strong> {staff.address}</p>
        <p><strong>Role:</strong> {staff.role}</p>
        {staff.role === "doctor" && (
          <>
            <p><strong>Specialty:</strong> {staff.specialty}</p>
            <p><strong>License Number:</strong> {staff.licenseNumber}</p>
          </>
        )}
        <p><strong>Status:</strong> {staff.isActive ? "Active" : "Inactive"}</p>
      </div>

      <button
        onClick={() => navigate("/dashboard/staffs")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Back
      </button>
    </div>
  );
}