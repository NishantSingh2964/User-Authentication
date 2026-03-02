import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Column 1: Logo + Description + Social */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">MyLogo</h2>
          <p className="text-gray-600 mt-4 text-sm leading-relaxed">
            Buy, sell, and share knowledge with a passionate community of readers.
            Discover books, write blogs, and connect with like-minded learners.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5 text-gray-600">
            <Facebook className="cursor-pointer hover:text-blue-600 transition" />
            <Twitter className="cursor-pointer hover:text-blue-600 transition" />
            <Instagram className="cursor-pointer hover:text-blue-600 transition" />
            <Linkedin className="cursor-pointer hover:text-blue-600 transition" />
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link to="/books" className="hover:text-blue-600 transition">Books</Link></li>
            <li><Link to="/blog" className="hover:text-blue-600 transition">Blogs</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Account Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li><Link to="/login" className="hover:text-blue-600 transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-blue-600 transition">Register</Link></li>
            <li><Link to="/profile" className="hover:text-blue-600 transition">My Profile</Link></li>
            <li><Link to="/purchased-books" className="hover:text-blue-600 transition">My Orders</Link></li>
            <li><Link to="/favourites" className="hover:text-blue-600 transition">Favourites</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Subscribe to Newsletter
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Get updates on new books and latest blogs.
          </p>

          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t text-center py-5 text-gray-500 text-sm bg-white">
        © {new Date().getFullYear()} MyLogo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;