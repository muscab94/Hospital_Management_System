

// export default Appointments
import { useEffect, useState } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // if you use JWT
          },
        });
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-lg font-semibold text-gray-600">
        Loading appointments...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="px-4 py-2">Patient</th>
                <th className="px-4 py-2">Staff</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr
                  key={appt._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-2">{appt.patient?.name || "N/A"}</td>
                  <td className="px-4 py-2">
                    {appt.staff?.name} ({appt.staff?.role})
                  </td>
                  <td className="px-4 py-2">
                    {new Date(appt.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{appt.time}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      appt.status === "Scheduled"
                        ? "text-yellow-600"
                        : appt.status === "Completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {appt.status}
                  </td>
                  <td className="px-4 py-2">{appt.reason || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Appointments;
