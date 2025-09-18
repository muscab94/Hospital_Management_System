import React, { useEffect, useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PatientTable() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);

        const res = await axios.get("https://hospital-management-system-9rt1.onrender.com/api/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPatients(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch patients");
        setLoading(false);
      }
    };

    fetchPatients();
  }, [navigate]);

  // 🔎 Search function
  const handleSearch = async (term) => {
    setSearchTerm(term);
    const token = localStorage.getItem("token");

    if (!term.trim()) {
      const res = await axios.get("https://hospital-management-system-9rt1.onrender.com/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data.data);
      return;
    }

    try {
      const res = await axios.get(
        `https://hospital-management-system-9rt1.onrender.com/api/patients/search/${term}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPatients(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading patients...</p>;
  if (error) return <p className="p-6 text-red-700">{error}</p>;

  // Action handlers
  const handleView = (id) => navigate(`/dashboard/patients/view/${id}`);
  const handleEdit = (id) => navigate(`/dashboard/patients/edit/${id}`);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://hospital-management-system-9rt1.onrender.com/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete patient");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-500 text-sm">
            Manage patient records and information
          </p>
        </div>
        {/* ✅ Add Patient (admin + receptionist allowed) */}
        {(user?.role === "admin" || user?.role === "receptionist") && (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800"
            onClick={() => navigate("/dashboard/patients/add")}
          >
            <Plus size={18} /> Add Patient
          </button>
        )}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search patients by name, email, or phone..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Patients ({patients.length})</h2>
          <p className="text-sm text-gray-500">
            All registered patients in the system
          </p>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="p-4">Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Age</th>
              <th className="p-4">Blood Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Registration</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient._id || patient.id}
                className="border-t hover:bg-gray-50 text-sm"
              >
                <td className="p-4">
                  <div className="font-medium">{patient.fullName}</div>
                  <div className="text-gray-500">{patient.gender}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Phone size={14} /> {patient.phone}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin size={14} /> {patient.address}
                  </div>
                </td>
                <td className="p-4">{patient.age}</td>
                <td className="p-4">
                  <span className="px-2 py-1 text-xs rounded-full border">
                    {patient.bloodGroup}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      patient.isActive
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {patient.isActive ? "Active" : "In-Active"}
                  </span>
                </td>
                <td className="p-4">
                  {patient.createdAt
                    ? new Date(patient.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-4 flex gap-2">
                  {/* ✅ Everyone can view */}
                  <button
                    className="p-2 border rounded hover:bg-gray-100"
                    onClick={() => handleView(patient._id)}
                  >
                    <Eye size={16} />
                  </button>

                  {/* ✅ Only admin + receptionist can edit */}
                  {(user?.role === "admin" || user?.role === "receptionist") && (
                    <button
                      className="p-2 border rounded hover:bg-gray-100"
                      onClick={() => handleEdit(patient._id)}
                    >
                      <Edit size={16} />
                    </button>
                  )}

                  {/* ✅ Only admin can delete */}
                  {user?.role === "admin" && (
                    <button
                      className="p-2 border rounded hover:bg-gray-100 text-red-600"
                      onClick={() => handleDelete(patient._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientTable;
