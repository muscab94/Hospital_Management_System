import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import cardiologyImg from "../assets/images/image.png";
import neurologyImg from "../assets/image2.png";
import hepatologyImg from "../assets/image3.png";
import pediatricsImg from "../assets/image4.png";
import Eyecare from "../assets/image5.png";

const departments = [
  {
    name: "Cardiology",
    title: "Cardiology",
    shortDesc: "Specialized care for heart conditions and cardiovascular health.",
    longDesc:
      "Our Cardiology department provides comprehensive care for patients with heart diseases, including heart failure, arrhythmias, coronary artery disease, and more. We use advanced diagnostic tools, non-invasive procedures, and interventional cardiology techniques to ensure optimal heart health for every patient. Our team works closely with patients to manage lifestyle, medications, and preventive care.",
    image: cardiologyImg,
  },
  {
    name: "Neurology",
    title: "Neurology",
    shortDesc: "Expert care for brain, spine, and nervous system disorders.",
    longDesc:
      "The Neurology department specializes in the diagnosis and treatment of neurological disorders such as epilepsy, stroke, multiple sclerosis, migraines, and neurodegenerative diseases. Our neurologists employ the latest imaging technologies, EEG monitoring, and patient-centered therapies to manage complex neurological conditions effectively, while focusing on improving quality of life.",
    image: neurologyImg,
  },
  {
    name: "Hepatology",
    title: "Hepatology",
    shortDesc: "Focused care for liver, gallbladder, and bile duct diseases.",
    longDesc:
      "Our Hepatology department provides expert management of liver diseases including hepatitis, cirrhosis, fatty liver disease, and liver transplantation evaluation. We offer advanced diagnostic tools, personalized treatment plans, and ongoing monitoring to protect liver health. Patients receive compassionate care from a multidisciplinary team including hepatologists, dietitians, and support staff.",
    image: hepatologyImg,
  },
  {
    name: "Pediatrics",
    title: "Pediatrics",
    shortDesc: "Comprehensive healthcare for children and adolescents.",
    longDesc:
      "The Pediatrics department offers a full range of medical services for newborns, infants, children, and teenagers. We provide preventive care, vaccinations, routine check-ups, and management of acute and chronic illnesses. Our child-friendly environment ensures comfort and safety, while our pediatricians collaborate with parents to support healthy growth and development.",
    image: pediatricsImg,
  },
  {
    name: "Eye care",
    title: "Eye care",
    shortDesc: "Complete eye and vision care services.",
    longDesc:
      "Our Eye Care department provides advanced diagnostics and treatments for vision problems, cataracts, glaucoma, and other eye conditions. With modern laser technology and expert ophthalmologists, we ensure your eyes stay healthy and your vision remains clear.",
    image: Eyecare,
  },
];

function SectionDepartment() {
  const [selected, setSelected] = useState(departments[0]);

  return (
    <div className="px-6 md:px-12 py-16 font-sans mb-20 mt-10">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-4">
        Departments
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
      </p>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Menu */}
        <div className="flex flex-col gap-3 lg:w-1/4">
          {departments.map((dept) => (
            <p
              key={dept.name}
              onClick={() => setSelected(dept)}
              className={`cursor-pointer font-semibold py-2 px-3 rounded-lg transition-all
                ${
                  selected.name === dept.name
                    ? "text-blue-600 border-l-4 border-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
            >
              {dept.name}
            </p>
          ))}
        </div>

        {/* Details + Image */}
        <AnimatePresence mode="wait">
          {selected.name === "Cardiology" ? (
            // Cardiology: animate on scroll
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col lg:flex-row gap-10 lg:w-3/4"
            >
              <div className="lg:w-2/3 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-700">
                  {selected.title}
                </h3>
                <em className="text-gray-500">{selected.shortDesc}</em>
                <p className="text-gray-700">{selected.longDesc}</p>
              </div>
              <motion.img
                src={selected.image}
                alt={selected.title}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/3 rounded-lg shadow-lg object-cover"
              />
            </motion.div>
          ) : (
            // Other departments: animate on click
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row gap-10 lg:w-3/4"
            >
              <div className="lg:w-2/3 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-700">
                  {selected.title}
                </h3>
                <em className="text-gray-500">{selected.shortDesc}</em>
                <p className="text-gray-700">{selected.longDesc}</p>
              </div>
              <motion.img
                key={selected.image}
                src={selected.image}
                alt={selected.title}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:w-1/3 rounded-lg shadow-lg object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SectionDepartment;
