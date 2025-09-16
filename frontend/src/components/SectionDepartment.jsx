

import React, { useState } from "react";

// Import images from assets
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
    title: "Pediatrics",
    shortDesc: "Comprehensive healthcare for children and adolescents.",
    longDesc:
      "The Pediatrics department offers a full range of medical services for newborns, infants, children, and teenagers. We provide preventive care, vaccinations, routine check-ups, and management of acute and chronic illnesses. Our child-friendly environment ensures comfort and safety, while our pediatricians collaborate with parents to support healthy growth and development.",
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

        {/* Details */}
        <div className="lg:w-2/4 space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-700">{selected.title}</h3>
          <em className="text-gray-500">{selected.shortDesc}</em>
          <p className="text-gray-700">{selected.longDesc}</p>
        </div>

        {/* Image */}
        <div className="lg:w-1/4">
          <img
            src={selected.image}
            alt={selected.title}
            className="w-full h-auto rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default SectionDepartment;
