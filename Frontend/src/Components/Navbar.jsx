import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const firstLetter = user?.name?.charAt(0)?.toUpperCase();

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
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-2xl font-bold text-blue-600 flex-shrink-0">
          MyLogo
        </div>

        {/* NAV LINKS (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-gray-700 font-medium">
          <NavLink to="/home" className={navLinkClass}>Home</NavLink>
          <NavLink to="/books" className={navLinkClass}>Books</NavLink>
          <NavLink to="/favourites" className={navLinkClass}>Favourites</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact-us" className={navLinkClass}>Contact Us</NavLink>
          <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
        </div>

        {/* USER + HAMBURGER */}
        <div className="flex items-center space-x-4">

          {/* Desktop User Dropdown */}
          {user && (
            <div className="hidden md:block relative group">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer">
                {firstLetter || "U"}
              </div>

              <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md 
                opacity-0 group-hover:opacity-100 invisible group-hover:visible 
                transition-all duration-200 overflow-hidden z-50">
                  <NavLink
                  to="/purchased-books"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition"
                >
                  Orders
                </NavLink>
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
          )}

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-2xl text-gray-700 focus:outline-none flex items-center"
          >
            <HiMenu />
          </button>

          {/* Mobile User Icon */}
          {user && (
            <div className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold ml-3">
              {firstLetter || "U"}
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-white shadow-xl transform transition-transform duration-300 z-50
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-gray-700">
            <HiX />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-6 text-gray-700 font-medium text-lg">
          <NavLink to="/home" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact Us</NavLink>
          <NavLink to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</NavLink>

          {user && (
            <>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
        />
      )}
    </nav>
  );
};

export default Navbar;