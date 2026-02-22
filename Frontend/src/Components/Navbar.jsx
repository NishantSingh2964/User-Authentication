import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    toast.error("Logged out");
    navigate("/");
    setIsMenuOpen(false); 
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-600 transition";

  return (
    <nav className="bg-white shadow-md px-6 py-4 fixed w-full z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          MyLogo
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <NavLink to="/home" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact-us" className={navLinkClass}>Contact Us</NavLink>
          <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>

          {/* Profile Dropdown */}
          <div className="relative group">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer">
              {firstLetter || "U"}
            </div>
            <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md 
              opacity-0 group-hover:opacity-100 invisible group-hover:visible 
              transition-all duration-200 overflow-hidden z-50">
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

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-2xl text-gray-700 focus:outline-none"
          >
            <HiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-1/2 shadow-xl transform transition-transform duration-300 z-50
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Icon */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl text-gray-700"
          >
            <HiX />
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col space-y-6 mt-6 ml-6">
          <NavLink
            to="/home"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 text-lg hover:text-blue-600 transition"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 text-lg hover:text-blue-600 transition"
          >
            About
          </NavLink>
          <NavLink
            to="/contact-us"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 text-lg hover:text-blue-600 transition"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/blog"
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-700 text-lg hover:text-blue-600 transition"
          >
            Blog
          </NavLink>

          {/* Profile & Logout */}
          {user && (
            <>
              <NavLink
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 text-lg hover:text-blue-600 transition"
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-gray-700 text-left text-lg hover:text-blue-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;