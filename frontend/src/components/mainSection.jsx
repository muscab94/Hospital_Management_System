import React from "react";
import { motion } from "framer-motion";

function MainSection() {
  return (
    <section className="bg-gray-50 py-16 px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 leading-tight">
            Welcome to <span className="text-yellow-500">Cuman Hospital</span>
          </h2>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Cuman Hospital waa xarun caafimaad oo casri ah, ku qalabaysan
            adeegyo caafimaad oo dhameystiran, iyadoo la siinayo bukaanka
            daryeel tayo sare leh iyo adeeg degdeg ah.
          </p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <img
            src="https://st4.depositphotos.com/9999814/29511/i/450/depositphotos_295117956-stock-photo-healthcare-people-group-professional-doctor.jpg"
            alt="Hospital Illustration"
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default MainSection;
