// src/pages/PatientDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Phone, Mail, MapPin, User } from "lucide-react";
import { calculateAge } from "../utils/checker";

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/patients/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatient(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch patient");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id, navigate]);

  if (loading) return <p className="p-6">Loading patient details...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">{patient.fullName}</h1>
        <p className="text-gray-500 mb-4">Patient ID: {patient._id}</p>

        {/* Info grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <User size={16} /> Gender: {patient.gender}
              </li>
              <li>Date of Birth: {patient.dateOfBirth?.split("T")[0]}</li>
              <li>Age: {calculateAge(patient.dateOfBirth)}</li>
              <li>Blood Group: {patient.bloodGroup}</li>
              <li>
                Status:{" "}
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    patient.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {patient.isActive ? "Active" : "Inactive"}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Phone size={16} /> {patient.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> {patient.email || "N/A"}
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> {patient.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Registered By */}
        {patient.registeredBy && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Registered By</h2>
            <p className="text-gray-700">
              {patient.registeredBy.name} ({patient.registeredBy.email})
            </p>
          </div>
        )}

        {/* Created At */}
        <div className="mt-6 text-sm text-gray-500">
          Registered on:{" "}
          {patient.createdAt
            ? new Date(patient.createdAt).toLocaleDateString()
            : "N/A"}
        </div>
        
      </div>
    </div>
  );
}

export default PatientDetail;
