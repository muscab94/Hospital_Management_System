// function DoctorPages(){
//     return <div>
//         <h1>Doctor Pages</h1>
//     </div>
// }
// export default DoctorPages
import React from "react";
import { FaStethoscope, FaUserMd, FaHeartbeat, FaTooth, FaBaby, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const doctors = [
  {
    name: "Dr. Walter White",
    title: "Chief Medical Officer",
    specialty: "Cardiologist",
    image: "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-3.jpg",
  },
  {
    name: "Dr. Sarah Johnson",
    title: "Senior Pediatrician",
    specialty: "Pediatrics",
    image: "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-1.jpg",
  },
  {
    name: "Dr. caasha Hassan",
    title: "Neurosurgeon",
    specialty: "Neurology",
    image: "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-2.jpg",
  },
  {
    name: "Dr. Emily Brown",
    title: "Orthopedic Surgeon",
    specialty: "Orthopedics",
    image: "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-4.jpg",
  },
];

const DoctorPage = () => {
  return (
    <div className="mt-16">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-blue-700 text-white py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4"
        >
          Meet Our <span className="text-yellow-300">Doctors</span>
        </motion.h1>
        <p className="max-w-2xl mx-auto text-blue-100">
          Our hospital is proud to have the most qualified, experienced, and caring doctors 
          dedicated to your health and well-being.
        </p>
      </section>

      {/* 2. Doctors Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Medical Experts
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {doctors.map((doc, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800">{doc.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{doc.title}</p>
                <p className="text-gray-600 mt-2">{doc.specialty}</p>
                <Link to= "/Appointment" ><button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Book Appointment
                </button></Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Specialization Tabs */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Areas of Specialization
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-md">
            <FaHeartbeat className="text-4xl mb-3" />
            <h3 className="font-semibold text-xl mb-2">Cardiology</h3>
            <p>Heart care and advanced treatments for cardiovascular diseases.</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-md">
            <FaBaby className="text-4xl mb-3" />
            <h3 className="font-semibold text-xl mb-2">Pediatrics</h3>
            <p>Comprehensive care for infants, children, and adolescents.</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-md">
            <FaBrain className="text-4xl mb-3" />
            <h3 className="font-semibold text-xl mb-2">Neurology</h3>
            <p>Diagnosis and treatment for brain and nervous system conditions.</p>
          </div>
        </div>
      </section>

      {/* 4. Testimonial Section */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          What Our Patients Say
        </h2>
        <div className="max-w-3xl mx-auto bg-white shadow-xl p-8 rounded-2xl">
          <p className="text-lg italic text-gray-700 mb-6">
            "The doctors at Cumaan Hospital are exceptional! They not only treated me 
            with great professionalism but also with kindness and care."
          </p>
          <h3 className="font-semibold text-gray-800">– Aisha Mohamed</h3>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Book Your Appointment Today
        </h2>
        <p className="max-w-xl mx-auto text-blue-100 mb-6">
          Get professional care from the best doctors. Our specialists are ready to help you.
        </p>
     
      </section>
    </div>
  );
};

export default DoctorPage;
