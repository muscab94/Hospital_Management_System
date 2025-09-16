
// Doctors.jsx
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const doctors = [
  {
    name: "Walter White",
    title: "Chief Medical Officer",
    description:
      "Explicabo voluptatem mollitia et repellat qui dolorem quasi",
    image:
      "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-1.jpg",
  },
  {
    name: "Sarah Jhonson",
    title: "Anesthesiologist",
    description:
      "Aut maiores voluptates amet et quis praesentium qui senda para",
    image:
      "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-2.jpg",
  },
  {
    name: "William Anderson",
    title: "Cardiology",
    description: "Quisquam facilis cum velit laborum corrupti fuga rerum quia",
    image:
      "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-3.jpg",
  },
  {
    name: "Amanda Jepson",
    title: "Neurosurgeon",
    description: "Dolorum tempora officiis odit laborum officiis et accusamus",
    image:
      "https://themewagon.github.io/MediLab/assets/img/doctors/doctors-4.jpg",
  },
];

const SectionDoctors = () => {
  return (
    <div className="py-10 px-5 bg-gray-50 min-h-screen">
      <h1 className="text-center font-semibold text-gray-700 text-3xl mb-6">
        Doctors
      </h1>
      <h1 className="text-center text-xl font-semibold text-gray-700 mb-6">
        Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
        consectetur velit
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex items-center gap-6 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-up"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-24 h-24 object-cover rounded-full transition-transform duration-500 hover:scale-150"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">{doc.name}</h2>
              <h4 className="text-sm text-gray-500 font-semibold mb-2">
                {doc.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
              <div className="flex gap-3 text-gray-500 text-lg">
                <FaXTwitter className="hover:text-blue-500 cursor-pointer transition-colors" />
                <FaFacebookF className="hover:text-blue-700 cursor-pointer transition-colors" />
                <FaInstagram className="hover:text-pink-600 cursor-pointer transition-colors" />
                <FaLinkedinIn className="hover:text-blue-600 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionDoctors;
