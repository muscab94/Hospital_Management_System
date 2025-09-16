import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import sectionOneBg from "../assets/doctor-s-hand-holding-stethoscope-closeup.jpg";
import sectionOneBg2 from "../assets/young-asian-female-dentist-white-coat-posing-clinic-equipment.jpg";
import SectionTwo from "./sectionTwo";
import SectionThree from "./sectionThree";
import SectionFour from "./sectionFour";
import Appointments from "../pages/Appointments";
import SectionAppointment from "./Appointment";
import SectionDepartment from "./SectionDepartment";
import SectionDoctors from "./SectionDoctors";
import Testimonials from "./Testinomial";
import ContactForm from "./ContactForm";
import Footer from "./Footer";

const slides = [
  {
    id: 1,
    title: "Small Injuries May Lead to Big Problem",
    subtitle: "Your environment could affect your fertility",
    image: sectionOneBg,
  },
  {
    id: 2,
    title: "One Stop Solution Medical Services",
    subtitle: "Call to schedule an appointment today",
    image: sectionOneBg2,
  },
  {
    id: 3,
    title: "Your Health, Our Priority",
    subtitle: "Trusted care from experienced professionals",
    image: sectionOneBg
    // "/assets/hospital-bg.jpg",
  },
];

function MainSection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return  (
    <>
    <section className="relative w-full h-[500px] overflow-hidden">
<AnimatePresence>
  <motion.div
    key={slides[current].id}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.6 }}
    className="relative w-full h-[700px] flex items-center justify-center overflow-hidden"
  >
    {/* ✅ Show image directly */}
    <img
      src={slides[current].image}
      alt={slides[current].title}
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Content */}
    <div className="relative z-10 ml-[600px] w-[600px] px-8 text-center md:text-left bg-white/70 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
        {slides[current].title}
      </h2>
      <p className="mt-4 text-lg text-gray-700">{slides[current].subtitle}</p>
      <button className="mt-6 bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg shadow-lg transition">
        Learn More
      </button>
    </div>
  </motion.div>
</AnimatePresence>


      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-3 shadow-md"
      >
        <ChevronLeft className="w-6 h-6 text-blue-800" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-3 shadow-md"
      >
        <ChevronRight className="w-6 h-6 text-blue-800" />
      </button>
    </section>
       <SectionTwo/>
       <SectionThree/>
       <SectionFour/>
       {/* <SectionAppointment/> */}
       <SectionDepartment/>
       <SectionDoctors/>
       <Testimonials/>
       {/* <ContactForm/> */}
       {/* <Footer/> */}
     </>
  );
   
}

export default MainSection;
