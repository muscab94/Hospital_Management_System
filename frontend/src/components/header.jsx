import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 px-6 py-4 shadow-md">
      {/* Logo & Title */}
      <div className="flex items-center space-x-3">
        <img
          src="https://img.icons8.com/color/48/hospital-room.png" 
          alt="Hospital Logo"
          className="w-10 h-10"
        />
        <h1 className="text-white text-2xl font-bold">Cuman Hospital</h1>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <a href="#home" className="text-white hover:text-gray-200 text-lg">
          Home
        </a>
        <a href="#contact" className="text-white hover:text-gray-200 text-lg">
          Contact
        </a>

        {/* Login Button */}

      </nav>
              <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition">
          Login
        </button>
    </header>
  );
}

export default Header;
