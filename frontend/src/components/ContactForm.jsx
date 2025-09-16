
// import React, { useState } from "react";
// import Footer from "./Footer";

// const ContactForm = () => {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <>
//       <section className="py-20 mt-20 px-4 max-w-5xl mx-auto text-center">
//         {/* Marka hore - Welcome */}
//         <div className="space-y-6 animate-fadeIn">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
//             Welcome to <span className="text-blue-600">Contact Page</span>
//           </h2>
//           <p className="text-gray-600 max-w-xl mx-auto">
//             We’d love to hear from you! Click the button below to get in touch
//             with us.
//           </p>
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105"
//           >
//             Open Contact Form
//           </button>
//         </div>

//         {/* Modal Form */}
//         {showForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//             <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative animate-slideUp">
//               {/* Close Button */}
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition"
//               >
//                 ✕
//               </button>

//               <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//                 Get in <span className="text-blue-600">Touch</span>
//               </h3>

//               {/* Form */}
//               <form className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="email"
//                     placeholder="Your Email"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Subject"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <textarea
//                   rows="5"
//                   placeholder="Message"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ></textarea>
//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </section>
      
//     </>
//   );
// };

// export default ContactForm;
import React, { useState } from "react";
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!", {
          position: "bottom-left",
          style: {
            background: "#4ade80",
            color: "#fff",
            fontWeight: "bold",
          },
          icon: "✅",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setShowForm(false);
      } else {
        toast.error("Something went wrong!", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error!", {
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      {/* Toast Container */}
      <Toaster />

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
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
