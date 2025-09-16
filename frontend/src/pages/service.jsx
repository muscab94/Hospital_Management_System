// function Service(){
//     return <div>
//         <h1>service</h1>
//     </div>
// }
// export default Service
import React from "react";
import {
  FaUserMd,
  FaAmbulance,
  FaHeartbeat,
  FaPills,
  FaMicroscope,
  FaHospital,
} from "react-icons/fa";

const Service = () => {
  return (
    <div className="mt-16">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-6 text-center overflow-hidden">
        <div className="animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-yellow-300">Medical Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-blue-100">
            We provide a wide range of healthcare services to meet all your
            medical needs under one roof.
          </p>
        </div>
      </section>

      {/* 2. Main Services Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-slideUp">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <FaUserMd />,
              title: "Expert Doctors",
              desc: "Professional and experienced specialists.",
            },
            {
              icon: <FaAmbulance />,
              title: "24/7 Emergency",
              desc: "Fast and reliable emergency response.",
            },
            {
              icon: <FaHospital />,
              title: "Surgery & Operations",
              desc: "Advanced surgical facilities and expert care.",
            },
            {
              icon: <FaPills />,
              title: "Pharmacy",
              desc: "In-house pharmacy with genuine medicines.",
            },
            {
              icon: <FaMicroscope />,
              title: "Laboratory Tests",
              desc: "Accurate diagnostics with modern equipment.",
            },
            {
              icon: <FaHeartbeat />,
              title: "Heart Care",
              desc: "Dedicated cardiology and heart health support.",
            },
          ].map((srv, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 animate-fadeIn"
            >
              <div className="text-5xl text-blue-600 mb-4">{srv.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {srv.title}
              </h3>
              <p className="text-gray-600 text-sm">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose <span className="text-blue-600">Cumaan Hospital</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="font-semibold text-lg mb-2">Affordable Care</h3>
            <p className="text-sm">
              Quality healthcare services at reasonable costs.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="font-semibold text-lg mb-2">Modern Facilities</h3>
            <p className="text-sm">
              Equipped with advanced medical technology and labs.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl shadow-lg hover:scale-105 transition duration-300">
            <h3 className="font-semibold text-lg mb-2">24/7 Availability</h3>
            <p className="text-sm">
              Always ready to assist you in any medical emergency.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="py-20 bg-blue-700 text-center text-white relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slideUp">
          Need Medical Assistance?
        </h2>
        <p className="max-w-xl mx-auto text-blue-100 mb-6">
          Book your appointment today and receive world-class medical services
          from our expert team.
        </p>
      
      </section>
    </div>
  );
};

export default Service;
