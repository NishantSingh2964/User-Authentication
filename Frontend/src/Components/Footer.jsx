import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">MyLogo</h2>
          <p className="text-gray-600 mt-3 text-sm">
            Building modern web applications with clean UI and powerful backend.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-blue-600 transition">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-gray-600">
            <Facebook className="cursor-pointer hover:text-blue-600 transition" />
            <Twitter className="cursor-pointer hover:text-blue-600 transition" />
            <Instagram className="cursor-pointer hover:text-blue-600 transition" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} MyLogo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
