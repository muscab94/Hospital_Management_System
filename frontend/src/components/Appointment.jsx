import { useState } from "react";

function SectionAppointment() {
  const [formData, setFormData] = useState({
    patient: "",
    staff: "",
    date: "",
    time: "",
    reason: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if JWT is used
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Appointment created successfully!");
        setFormData({ patient: "", staff: "", date: "", time: "", reason: "" });
      } else {
        setMessage(`❌ Error: ${data.error || data.message}`);
      }
    } catch (err) {
      setMessage("❌ Server error, please try again.");
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Appointment</h1>

      {message && (
        <p
          className={`mb-6 text-center font-semibold ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Patient ID</label>
            <input
              type="text"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              placeholder="Enter patient ObjectId"
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {/* Staff ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Staff ID</label>
            <input
              type="text"
              name="staff"
              value={formData.staff}
              onChange={handleChange}
              placeholder="Enter staff ObjectId"
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-400"
              required
            />
          </div>

          {/* Reason */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason"
              className="block w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-400"
              rows={4}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Save Appointment
          </button>
        </div>
      </form>
    </div>
  );
}

export default SectionAppointment;
