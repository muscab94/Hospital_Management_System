
import { FaEnvelope, FaPhoneAlt, FaUser, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full shadow">
      {/* Top Header */}
      <div className="bg-blue-600  hidden text-white text-sm sm:flex justify-between items-center px-4 md:px-12 py-2">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <FaEnvelope /> contact@example.com
          </span>
          <span className="flex items-center gap-2">
            <FaPhoneAlt /> +1 5589 55488 55
          </span>
        </div>
        <div className="flex gap-4 text-lg">
          <AiOutlineTwitter className="cursor-pointer hover:text-gray-200" />
          <FaFacebook className="cursor-pointer hover:text-gray-200" />
          <FaInstagram className="cursor-pointer hover:text-gray-200" />
          <FaLinkedin className="cursor-pointer hover:text-gray-200" />
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white px-4 md:px-12 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800">Cumaan Hospital</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7 text-[20px] ml-12 items-center  text-gray-700">
          <Link to="/"><li className="hover:text-blue-600 cursor-pointer">Home</li></Link>
          <Link to="/About"><li className="hover:text-blue-600 cursor-pointer">About</li></Link>
          <Link to="/service"><li className="hover:text-blue-600 cursor-pointer">Services</li></Link>
          <Link to="/Department"><li className="hover:text-blue-600 cursor-pointer">Departments</li></Link>
          <Link to="/doctor"><li className="hover:text-blue-600 cursor-pointer">Doctors</li></Link>
          <Link to="/contact"><li className="hover:text-blue-600 cursor-pointer">Contact</li></Link>
        </ul>

        {/* Button */}
        <Link to="/appointment">
          <button className="bg-blue-60 text-white text-[0.9em] -ml-3 bg-blue-500 px-3 py-2 rounded-full hover:bg-blue-700">
            make an appointment
          </button>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="absolute top-full right-10 left-0 w-full bg-white flex flex-col gap-4 px-6 py-4 shadow-md md:hidden z-50">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
            </Link>
            <Link to="/About" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-600 cursor-pointer">About</li>
            </Link>
            <Link to="/service" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-600 cursor-pointer">Services</li>
            </Link>
            <Link to="/Department" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-600 cursor-pointer">Departments</li>
            </Link>
            <Link to="/doctor" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-600 cursor-pointer">Doctors</li>
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <li className="hover:text-blue-600 cursor-pointer">Contact</li>
            </Link>

            <li>
              <Link to="/appointment" onClick={() => setIsOpen(false)}>
                <button className="bg-blue-600 text-white px-5 py-2 rounded-full w-full hover:bg-blue-700">
                  Make an Appointment
                </button>
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
