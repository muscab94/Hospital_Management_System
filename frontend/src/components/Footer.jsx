import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10 text-gray-700 pt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-5 gap-8 pb-10 border-b border-gray-300">
          {/* Logo and Contact */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cumaan Hospital</h2>
            <p>A108 Adam Street<br />New York, NY 535022</p>
            <p className="mt-4"><strong>Phone:</strong> +1 5589 55488 55</p>
            <p><strong>Email:</strong> info@example.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-700 hover:text-white hover:bg-gray-600 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-700 hover:text-white hover:bg-gray-600 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-700 hover:text-white hover:bg-gray-600 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-8 h-8 border rounded-full flex items-center justify-center text-gray-700 hover:text-white hover:bg-gray-600 transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#">Web Design</a></li>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Product Management</a></li>
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Graphic Design</a></li>
            </ul>
          </div>

          {/* Hic solutasetp */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hic solutasetp</h3>
            <ul className="space-y-2">
              <li><a href="#">Molestiae accusamus iure</a></li>
              <li><a href="#">Excepturi dignissimos</a></li>
              <li><a href="#">Suscipit distinctio</a></li>
              <li><a href="#">Dilecta</a></li>
              <li><a href="#">Sit quas consectetur</a></li>
            </ul>
          </div>

          {/* Nobis illum */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nobis illum</h3>
            <ul className="space-y-2">
              <li><a href="#">Ipsam</a></li>
              <li><a href="#">Laudantium dolorum</a></li>
              <li><a href="#">Dinera</a></li>
              <li><a href="#">Trodela</a></li>
              <li><a href="#">Flexo</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 text-center text-sm text-gray-600">
          <p>
            © Copyright <strong className="text-gray-800">Cumaan</strong> All Rights Reserved
          </p>
          <p className="mt-1">
            Designed by <a href="#" className="text-blue-600 hover:underline">BootstrapMade</a> Distributed by <a href="#" className="text-blue-600 hover:underline">ThemeWagon</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
