
import React from "react";
import { FaUserMd, FaAmbulance, FaHeartbeat, FaPills } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionFour from "../components/sectionFour";

const About = () => {
  return ( 
    
    <div className="mt-16">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Cumaan Hospital
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-blue-100">
          Providing compassionate healthcare services with state-of-the-art
          facilities and expert medical professionals.
        </p>
       
      </section>

      {/* 2. About Us Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://img.freepik.com/free-photo/modern-hospital-building_1127-3526.jpg"
          alt="Hospital"
          className="rounded-2xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            At Cumaan Hospital, we are committed to offering high-quality
            healthcare services to our patients. Our dedicated team of doctors,
            nurses, and staff ensure that every patient receives personalized
            care in a safe and friendly environment.
          </p>
          <p className="mt-4 text-gray-600">
            Our hospital is equipped with advanced medical technology and modern
            facilities to serve the community better.
          </p>
        </div>
      </section>

      {/* 3. Our Services Section */}
      <section className="py-16 bg-gray-0 px-6">
        <div>
              <SectionFour/>
       </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <FaUserMd className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Expert Doctors</h3>
            <p className="text-gray-600 text-sm mt-2">
              Highly qualified doctors providing quality care.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <FaAmbulance className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg">24/7 Emergency</h3>
            <p className="text-gray-600 text-sm mt-2">
              Emergency services available round the clock.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <FaHeartbeat className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Heart Care</h3>
            <p className="text-gray-600 text-sm mt-2">
              Specialized cardiology and heart health services.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
            <FaPills className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Pharmacy</h3>
            <p className="text-gray-600 text-sm mt-2">
              On-site pharmacy for all your medical needs.
            </p>
          </div>
        </div>
        
      </section>

      {/* 4. Our Team Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Dr. Ahmed Ali",
              role: "Cardiologist",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Dr. cabdi Noor",
              role: "Neurologist",
              img: "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-3.jpg",
            },
            {
              name: "Dr. faysal Omar",
              role: "Pediatrician",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
             {
              name: "Dr. Yusuf Omar",
              role: "Pediatrician",
              img:"https://themewagon.github.io/MediLab/assets/img/doctors/doctors-1.jpg",
            },
          ].map((doc, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition text-center p-6"
            >
              <img
                src={doc.img}
                alt={doc.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-blue-600"
              />
              <h3 className="font-semibold text-lg text-gray-800">
                {doc.name}
              </h3>
              <p className="text-gray-600 text-sm">{doc.role}</p>
            </div>
          ))}
        </div>
      </section>

                   

      {/* 5. Contact CTA Section */}
      <section className="py-20 bg-blue-600 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Treated?
        </h2>
        <p className="max-w-xl mx-auto text-blue-100 mb-6">
          Book an appointment with our specialists today and receive world-class
          healthcare services.
        </p>

      </section>
    </div>
  );
};

export default About;
