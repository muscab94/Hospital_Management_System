// src/pages/MedicalRecordsList.jsx
import { useState, useEffect } from "react";
import { getMedicalRecords, createMedicalRecord } from "../services/medicalRecord";
import { fetchPatients } from "../services/patientService"; // use service 
import { fetchDoctors } from "../services/staffService";
import toast from "react-hot-toast";

export default function MedicalRecordsList() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);
 
  useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("user")));
  },[])
  useEffect(() => {
   
     console.log(user)
  }, [])

  const [newRecord, setNewRecord] = useState({
    patientId: "",
    doctorId: JSON.parse(localStorage.getItem("user")),
    diagnosis: "",
    treatment: "",
  });

  // Fetch existing records
  const fetchRecordsData = async () => {
    try {
      const res = await getMedicalRecords(page);
      setRecords(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load medical records");
    }
  };

  useEffect(() => {
    fetchRecordsData();
  }, [page]);

  // Fetch patients and doctors when form opens
  const handleAddNewClick = async () => {
    setShowForm(!showForm);

    if (!showForm) { // only fetch when opening
      try {
        // ✅ Fetch patients using patientService
        const patientsRes = await fetchPatients();
        console.log(patientsRes.data.data)
        setPatients(patientsRes.data.data);

        // Fetch doctors
        // const doctorsRes = await fetchDoctors();
        // setDoctors(doctorsRes.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load patients or doctors");
      }
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newRecord.patientId || !newRecord.doctorId) {
      toast.error("Please select patient and doctor");
      return;
    }

    try {
      await createMedicalRecord(newRecord);
      toast.success("Medical record added successfully!");
      setShowForm(false);
      setNewRecord({ patientId: "", doctorId: "", diagnosis: "", treatment: "" });
      fetchRecordsData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create medical record");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Medical Records</h2>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleAddNewClick}
        >
          + Add New Record
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 border rounded shadow space-y-4 bg-gray-50"
        >
          <div>
            <label className="block mb-1 font-medium">Patient</label>
            <select
              value={newRecord.patientId}
              onChange={(e) =>
                setNewRecord({ ...newRecord, patientId: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* <div>
            <label className="block mb-1 font-medium">Doctor</label>
            <select
              value={newRecord.doctorId}
              onChange={(e) =>
                setNewRecord({ ...newRecord, doctorId: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div> */}

          <div>
            <label className="block mb-1 font-medium">Diagnosis</label>
            <input
              type="text"
              value={newRecord.diagnosis}
              onChange={(e) =>
                setNewRecord({ ...newRecord, diagnosis: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Treatment</label>
            <input
              type="text"
              value={newRecord.treatment}
              onChange={(e) =>
                setNewRecord({ ...newRecord, treatment: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Record
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {records.map((record) => (
          <div key={record._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">
              {record.patient.firstName} {record.patient.lastName}
            </h3>
            <p>Doctor: {record.doctor.name}</p>
            <p>Diagnosis: {record.diagnosis}</p>
            <p>Treatment: {record.treatment}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
