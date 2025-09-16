import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

function ViewAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/appointments/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAppointment(res.data.data);
      } catch (err) {
        console.error("Error fetching appointment:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-lg font-semibold text-gray-600">
        Loading appointment...
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Appointment not found.
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white shadow rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Appointment Details
        </h1>

        <div className="flex gap-40">
          {/* Patient Info */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Patient</h2>
            <p>
              <span className="font-medium">ID:</span>{" "}
              {appointment.patient?.patientId}
            </p>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {appointment.patient?.firstName} {appointment.patient?.lastName}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {appointment.patient?.phone}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {appointment.patient?.email}
            </p>
            <p>
              <span className="font-medium">Gender:</span>{" "}
              {appointment.patient?.gender}
            </p>
            <p>
              <span className="font-medium">DOB:</span>{" "}
              {appointment.patient?.dateOfBirth?.split("T")[0]}
            </p>
          </div>

          {/* Doctor Info */}
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Doctor</h2>
            <p>
              <span className="font-medium">Name:</span>{" "}
              {appointment.doctor?.name}
            </p>
            <p>
              <span className="font-medium">Specialty:</span>{" "}
              {appointment.doctor?.specialty}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {appointment.doctor?.phone}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {appointment.doctor?.email}
            </p>
          </div>
        </div>

        {/* Appointment Info */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-2">Appointment</h2>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(appointment.appointmentDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Time:</span>{" "}
            {appointment.appointmentTime}
          </p>
          <p>
            <span className="font-medium">Type:</span> {appointment.type}
          </p>
          <p>
            <span className="font-medium">Status:</span> {appointment.status}
          </p>
          <p>
            <span className="font-medium">Reason:</span> {appointment.reason}
          </p>
        </div>

        {/* Scheduled By */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-2">Scheduled By</h2>
          <p>
            {appointment.scheduledBy?.name} ({appointment.scheduledBy?.email})
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewAppointment;
