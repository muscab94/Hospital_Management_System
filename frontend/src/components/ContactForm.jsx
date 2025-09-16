import React from "react";

const ContactForm = () => {
  return (
    <section className="py-12  mt-20 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Side - Contact Info */}
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Location</h3>
              <p>A108 Adam Street, New York, NY 535022</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p>+1 5589 55488 55</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white p-4 rounded-full">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email Us</h3>
              <p>info@example.com</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="6"
            placeholder="Message"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
