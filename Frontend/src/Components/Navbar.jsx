import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          MyLogo
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/home" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/contact-us" className="hover:text-blue-600 transition">
            Contact Us
          </Link>
          <Link to="/blog" className="hover:text-blue-600 transition">
            Blog
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative group">
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer">
            {firstLetter || "U"}
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
