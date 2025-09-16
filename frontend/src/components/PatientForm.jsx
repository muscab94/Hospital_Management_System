// PatientForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function PatientForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // get id from URL (for edit)
  const patientId = id;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: { name: "", relationship: "", phone: "" },
    bloodGroup: "",
    allergies: [""],
    medicalHistory: [""],
    isActive: true,
  });

  // Fetch patient data if editing
  useEffect(() => {
    const fetchPatient = async () => {
      console.log(!patientId);
      if (!patientId) return; // skip if adding
      console.log("seaching......");
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/patients/${patientId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data.data);
        setFormData(res.data.data);
      } catch (err) {
        console.error("Error fetching patient:", err);
        alert("Failed to load patient data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const url = patientId
        ? `http://localhost:5000/api/patients/${patientId}`
        : "http://localhost:5000/api/patients";
      const method = patientId ? "PUT" : "POST";

      const res = await axios({
        url,
        method,
        headers: { Authorization: `Bearer ${token}` },
        data: formData,
      });

      alert(patientId ? "Patient updated!" : "Patient added!");
      navigate("/dashboard/patients");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save patient");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow rounded-lg p-6 my-6 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-6">
            {patientId ? "Edit Patient" : "Add New Patient"}
          </h2>
          <button className="px-6 py-1.5 bg-black text-white text-xl 
          hover:scale-105 rounded-3xl"
          onClick={() => navigate("/dashboard/patients")}>Back</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={
                  formData.dateOfBirth ? formData.dateOfBirth.split("T")[0] : ""
                }
                onChange={handleChange}
                className="mt-1 w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 w-full border p-2 rounded"
                required
              >
                <option value="">Select...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 w-full border p-2 rounded"
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="font-semibold mb-2">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Relationship
                </label>
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded"
                  required
                />
              </div>
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="mt-1 w-full border p-2 rounded"
            >
              <option value="">Select...</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="w-4 h-4"
            />
            <label className="text-sm">Active Patient</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            {patientId ? "Update Patient" : "Save Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;
