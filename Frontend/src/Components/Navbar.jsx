import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    toast.error("Logged out")
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-600 transition";

  return (
    <nav className="bg-white shadow-md px-8 py-4 ">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          MyLogo
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact-us" className={navLinkClass}>
            Contact Us
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            Blog
          </NavLink>
        </div>

        {/* Profile Dropdown */}
        <div className="relative group">
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer">
            {firstLetter || "U"}
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md 
          opacity-0 group-hover:opacity-100 invisible group-hover:visible 
          transition-all duration-200 overflow-hidden 
          z-50">
            <NavLink
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition"
            >
              Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition"
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
