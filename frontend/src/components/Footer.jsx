
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      {/* Top Grid */}
      <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: Hospital Name */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Comaan Hospital</h1>
          <p className="text-gray-400">
            Your health is our top priority. We provide the best medical
            services with expert doctors and modern facilities.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="ml-20">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/departments" className="hover:text-white">
                Departments
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="hover:text-white">
                Doctors
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <ul className="space-y-2">
            <li>📍 Mogadishu, Somalia</li>
            <li>
              <a href="mailto:info@comaanhospital.com" className="hover:text-white">
                📧 info@comaanhospital.com
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/comaanhospital"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                📷 Instagram: @comaanhospital
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400">
        © {new Date().getFullYear()} Comaan Hospital. All Rights Reserved.
      </div>
    </footer>
  );
}
