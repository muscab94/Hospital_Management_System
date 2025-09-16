// import React from "react";
// import Footer from "./Footer";

// const ContactForm = () => {
//   return ( <>
//     <section className="py-12  mt-20 px-4 max-w-7xl mx-auto">
//       <div className="grid md:grid-cols-2 gap-10">
//         {/* Left Side - Contact Info */}
//         <div className="space-y-8">
//           <div className="flex items-start space-x-4">
//             <div className="bg-blue-600 text-white p-4 rounded-full">
//               <i className="fas fa-map-marker-alt"></i>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">Location</h3>
//               <p>A108 Adam Street, New York, NY 535022</p>
//             </div>
//           </div>

//           <div className="flex items-start space-x-4">
//             <div className="bg-blue-600 text-white p-4 rounded-full">
//               <i className="fas fa-phone-alt"></i>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">Call Us</h3>
//               <p>+1 5589 55488 55</p>
//             </div>
//           </div>

//           <div className="flex items-start space-x-4">
//             <div className="bg-blue-600 text-white p-4 rounded-full">
//               <i className="fas fa-envelope"></i>
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold">Email Us</h3>
//               <p>info@example.com</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Contact Form */}
//         <form className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <input
//             type="text"
//             placeholder="Subject"
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <textarea
//             rows="6"
//             placeholder="Message"
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </section>
//     <Footer/>
//    </>
//   );
// };

// export default ContactForm;

import React, { useState } from "react";
import Footer from "./Footer";

const ContactForm = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="py-20 mt-20 px-4 max-w-5xl mx-auto text-center">
        {/* Marka hore - Welcome */}
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">Contact Page</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We’d love to hear from you! Click the button below to get in touch
            with us.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105"
          >
            Open Contact Form
          </button>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative animate-slideUp">
              {/* Close Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Get in <span className="text-blue-600">Touch</span>
              </h3>

              {/* Form */}
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  rows="5"
                  placeholder="Message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
      
    </>
  );
};

export default ContactForm;
