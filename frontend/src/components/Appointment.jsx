import { Link } from "react-router-dom";

function Appointment() {
  return (
    <div className="max-w-sm mx-auto mb-20 mt-8 bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="h-28 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
        <h2 className="text-xl md:text-2xl font-bold text-white">Cumaan Hospital</h2>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* About */}
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-1">About</h3>
          <p className="text-gray-600 text-xs leading-relaxed">
            Cumaan Hospital is a trusted healthcare provider in Mogadishu, 
            offering modern facilities, skilled doctors, and affordable care 
            for families.
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="text-blue-600">📍</span>
          Hodan District, Mogadishu
        </div>

        {/* Working Hours */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="text-green-600">🕒</span>
          Mon - Sat: 8:00 AM – 6:00 PM
        </div>

        {/* Departments */}
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-1">Departments</h3>
          <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
            <li>General Medicine</li>
            <li>Pediatrics</li>
            <li>Cardiology</li>
            <li>Gynecology</li>
            <li>Emergency</li>
          </ul>
        </div>

        {/* Button */}
        <Link to="/contact"><button className="w-full bg-blue-600 hover:bg-blue-700 mt-4   text-white py-2 rounded-lg text-sm font-medium transition">
          Please Visit the Hospital
        </button></Link>
      </div>
    </div>
  );
}

export default Appointment;
