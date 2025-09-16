import React, { useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Saul Goodman",
    role: "CEO & Founder",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    feedback:
      "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh.",
  },
  {
    name: "Jane Doe",
    role: "Marketing Manager",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    feedback:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores hic rerum sed. Accusantium, fugit.",
  },
  {
    name: "John Smith",
    role: "Product Designer",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    feedback:
      "I love working with this team. Their professionalism and delivery was top-notch. Will work with them again!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonial = testimonials[currentIndex];

  return (
    <div className="bg-white py-12 px-6 md:px-20 flex mt-20 mb-10 flex-col lg:flex-row items-center gap-10">
      {/* Left Section */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Testimonials</h2>
        <p className="text-gray-600 leading-relaxed">
          Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gray-50 shadow-md rounded-lg p-6 max-w-xl">
        <div className="flex items-center gap-4 mb-2">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
            <div className="flex text-yellow-500 mt-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-gray-700 italic mt-4 relative">
          <FaQuoteLeft className="inline text-blue-400 mr-2" />
          {testimonial.feedback}
          <FaQuoteRight className="inline text-blue-400 ml-2" />
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === idx ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
