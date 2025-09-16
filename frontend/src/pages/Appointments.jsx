// src/pages/Appointments.jsx
import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Appointments() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [stats, setStats] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    type: "consultation",
    status: "scheduled",
    notes: "",
  });

  const token = localStorage.getItem("token");

  // Fetch patients, doctors, appointments, stats
  const fetchData = async () => {
    setLoading(true);
    try {
      const [patientsRes, doctorsRes, appointmentsRes, statsRes] =
        await Promise.all([
          fetch("http://localhost:5000/api/patients", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/staff", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/appointments/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      const patientsData = await patientsRes.json();
      const doctorsData = await doctorsRes.json();
      const appointmentsData = await appointmentsRes.json();
      const statsData = await statsRes.json();
      setPatients(patientsData.data || []);
      setDoctors(
        doctorsData.data.filter((data) => data.role === "doctor") || []
      );
      console.log(appointmentsData.data);
      setAppointments(appointmentsData.data || []);
      setStats(statsData.data || null);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle search (server-side)
  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchTerm.trim()) {
        fetchData();
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:5000/api/appointments?search=${searchTerm}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setAppointments(data.data || []);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };
    fetchSearch();
  }, [searchTerm]);

  // Handle form change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle availability check
  const checkAvailability = async () => {
    if (!formData.doctorId || !formData.appointmentDate) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/appointments/availability/${formData.doctorId}?date=${formData.appointmentDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setAvailableSlots(data.data.availableSlots || []);
    } catch (err) {
      console.error("Error fetching availability:", err);
    }
  };

  // Handle submit (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingAppointment ? "PUT" : "POST";
      const url = editingAppointment
        ? `http://localhost:5000/api/appointments/${editingAppointment._id}`
        : "http://localhost:5000/api/appointments";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patient: formData.patientId,
          doctor: formData.doctorId,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          type: formData.type,
          status: formData.status,
          reason: formData.notes,
        }),
      });
      const data = await res.json();
      console.log(data); // <-- debug backend response
      if (res.ok) {
        fetchData();
        setIsModalOpen(false);
        setEditingAppointment(null);
        setFormData({
          patientId: "",
          doctorId: "",
          appointmentDate: "",
          appointmentTime: "",
          type: "consultation",
          status: "scheduled",
          notes: "",
        });
      } else {
        const error = await res.json();
        alert(error.message || "Error saving appointment");
      }
    } catch (err) {
      console.error("Error saving appointment:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  if (loading) return <p className="p-6">Loading appointments...</p>;

  return (
    <div className="p-6">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow text-center">
            <h3 className="font-semibold">Today</h3>
            <p className="text-xl">{stats.todayAppointments}</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <h3 className="font-semibold">Pending</h3>
            <p className="text-xl">{stats.pendingAppointments}</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <h3 className="font-semibold">Completed</h3>
            <p className="text-xl">{stats.completedAppointments}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} /> Add Appointment
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="p-4">Patient</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt._id} className="border-t hover:bg-gray-50 text-sm">
                <td className="p-4">{apt.patient.patientId}</td>
                <td className="p-4">{apt.doctor?.name}</td>
                <td className="p-4">
                  {new Date(apt.appointmentDate).toLocaleDateString()}
                </td>
                <td className="p-4">{apt.appointmentTime}</td>
                <td className="p-4 capitalize">{apt.type}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      apt.status === "scheduled"
                        ? "bg-blue-100 text-blue-800"
                        : apt.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {apt.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button
                    className="p-2 border rounded hover:bg-gray-100"
                    onClick={() => navigate(`/Dashboard/appointments/view/${apt._id}`)}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-2 border rounded hover:bg-gray-100"
                    onClick={() => {
                      setEditingAppointment(apt);
                      setFormData({
                        patientId: apt.patient?._id || "",
                        doctorId: apt.doctor?._id || "",
                        appointmentDate: apt.appointmentDate.split("T")[0],
                        appointmentTime: apt.appointmentTime,
                        type: apt.type,
                        status: apt.status,
                        notes: apt.notes,
                      });
                      setIsModalOpen(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="p-2 border rounded hover:bg-gray-100"
                    onClick={() => handleDelete(apt._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingAppointment(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingAppointment ? "Edit Appointment" : "Add Appointment"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient */}
              <div>
                <label className="block text-sm font-medium">Patient</label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded"
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

              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium">Doctor</label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded"
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="mt-1 w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Appointment Time
                  </label>
                  <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className="mt-1 w-full border p-2 rounded"
                    required
                  />
                  {/* Show available slots */}
                  <button
                    type="button"
                    onClick={checkAvailability}
                    className="mt-2 text-xs px-2 py-1 border rounded hover:bg-gray-100"
                  >
                    Check Availability
                  </button>
                  {availableSlots.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      Available: {availableSlots.join(", ")}
                    </p>
                  )}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded"
                >
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="checkup">Checkup</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-1 w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded"
                >
                  {editingAppointment ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
