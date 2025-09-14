
import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 shadow-lg">
      {/* Logo & Title */}
      <div className="flex items-center space-x-3">
        <h1 className="text-white text-3xl font-extrabold tracking-wide flex items-center gap-2">
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/hospital.png"
            alt="Hospital Logo"
            className="w-12 h-12"
          />
          Cuman Hospital
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-8">
        <a
          href="#home"
          className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
        >
          Home
        </a>
        <a
          href="#contact"
          className="text-white text-lg font-medium hover:text-yellow-300 transition duration-300"
        >
          Contact
        </a>
      </nav>

      {/* Login Button */}
      <button className="bg-yellow-400 text-blue-900 font-bold px-5 py-2 rounded-xl shadow-md hover:bg-yellow-300 transition duration-300">
        Login
      </button>
    </header>
  );
}

export default Header;

