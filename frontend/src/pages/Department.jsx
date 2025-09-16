// function Department(){
//     return <div>
//         <h1>Department</h1>
//     </div>
// }
// export default Department
import React from "react";
import {
  FaHeartbeat,
  FaBrain,
  FaBaby,
  FaBone,
  FaXRay,
  FaUserMd,
} from "react-icons/fa";

const Department = () => {
  return (
    <div className="mt-16">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
          Our <span className="text-yellow-300">Departments</span>
        </h1>
        <p className="max-w-2xl mx-auto text-blue-100 animate-slideUp">
          Cumaan Hospital offers a wide range of specialized departments to
          ensure every patient receives the best healthcare possible.
        </p>
      </section>

      {/* 2. Department Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Explore Our Departments
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FaHeartbeat />,
              title: "Cardiology",
              desc: "Heart health and advanced cardiac treatments.",
              color: "from-red-500 to-rose-600",
            },
            {
              icon: <FaBrain />,
              title: "Neurology",
              desc: "Brain and nervous system care.",
              color: "from-purple-500 to-indigo-600",
            },
            {
              icon: <FaBaby />,
              title: "Pediatrics",
              desc: "Specialized care for infants and children.",
              color: "from-green-500 to-emerald-600",
            },
            {
              icon: <FaBone />,
              title: "Orthopedics",
              desc: "Bone, joint, and spine treatments.",
              color: "from-blue-500 to-cyan-600",
            },
            {
              icon: <FaXRay />,
              title: "Radiology",
              desc: "Modern imaging and diagnostics.",
              color: "from-pink-500 to-rose-600",
            },
            {
              icon: <FaUserMd />,
              title: "Surgery",
              desc: "State-of-the-art surgical operations.",
              color: "from-yellow-500 to-orange-600",
            },
          ].map((dept, i) => (
            <div
              key={i}
              className={`p-8 rounded-xl shadow-md text-center bg-gradient-to-r ${dept.color} text-white hover:shadow-2xl transition transform hover:-translate-y-2 duration-300`}
            >
              <div className="text-5xl mb-4">{dept.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{dept.title}</h3>
              <p className="text-sm opacity-90">{dept.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Special Facilities Section */}
      <section className="py-20 px-6 bg-white relative">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Special Facilities
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="font-semibold text-xl mb-2">ICU & Emergency</h3>
            <p className="text-sm">
              Intensive care units with 24/7 monitoring for critical patients.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="font-semibold text-xl mb-2">Laboratories</h3>
            <p className="text-sm">
              Advanced labs offering precise medical diagnostics.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-r from-pink-600 to-rose-700 text-white rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="font-semibold text-xl mb-2">Pharmacy</h3>
            <p className="text-sm">
              In-house pharmacy ensuring genuine and safe medicines.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-20 bg-blue-700 text-center text-white relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slideUp">
          Need Specialized Care?
        </h2>
        <p className="max-w-xl mx-auto text-blue-100 mb-6">
          Choose from our departments and receive professional care from expert
          doctors and staff.
        </p>
        <button className="px-8 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-full shadow-lg hover:bg-yellow-300 transition transform hover:scale-105">
          Book Appointment
        </button>
      </section>
    </div>
  );
};

export default Department;
