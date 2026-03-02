import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import { useBook } from "../Context/BookContext";
import { BlogContext } from "../Context/blogContext";
import BookCard from "../Components/BookCard";
import BlogCard from "../Components/BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Testimonials from "../Components/Testimonial";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { books, fetchBooks } = useBook();
  const { blogs, getAllBlogs } = useContext(BlogContext);

  const isVerified = user?.isAccountVerified;

  useEffect(() => {
    fetchBooks();
    getAllBlogs();
  }, []);

  const trendingBooks = books.slice(0, 3);
  const trendingBlogs = blogs.slice(0, 3);

  const handleCreateClick = () => {
    if (!user) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    if (!isVerified) {
      navigate("/profile");
      return;
    }

    navigate("/write-blog");
  };

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
<section
  className="relative w-full min-h-screen flex items-center justify-center px-6 text-white bg-cover bg-center"
  style={{ backgroundImage: "url('/hero.jpg')" }}
>

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Content */}
  <div className="relative text-center max-w-3xl z-10">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
      Buy, Sell & Share Knowledge 📚
    </h1>

    <p className="text-lg md:text-xl text-gray-200 mb-8">
      Discover trending books, explore insightful blogs, and connect with passionate readers.
    </p>

    <div className="flex flex-col md:flex-row justify-center gap-4">
      <button
        onClick={() => navigate("/books")}
        className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Explore Books
      </button>

      <button
        onClick={() => navigate("/blog")}
        className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition"
      >
        Read Blogs
      </button>
    </div>
  </div>

</section>

{/* ================= ABOUT US ================= */}
<section className="min-h-[50vh] flex items-center py-16 px-6 bg-white">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    {/* Left Content */}
    <div>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
        About Us
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        We are building a community where readers can buy and sell books 
        effortlessly while sharing knowledge through blogs. Our platform 
        connects passionate readers, writers, and learners in one place — 
        making knowledge accessible, affordable, and engaging for everyone.
        <br /><br />
        Whether you're looking for affordable books, insightful articles, 
        or a space to express your thoughts, this is your home for learning 
        and growth.
      </p>

      <button
        onClick={() => navigate("/about")}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Know More
      </button>
    </div>

    {/* Right Image */}
    <div className="relative">
      <img
        src="/hero2.jpg"
        alt="About Us"
        className="rounded-3xl shadow-md w-full h-[450px] object-cover"
      />
      <div className="absolute -bottom-8 -right-8 w-52 h-52 bg-indigo-100 rounded-full blur-3xl -z-10"></div>
    </div>

  </div>
</section>

      {/* ================= TRENDING BOOKS ================= */}
      <section className="py-16 px-6 max-w-7xl mx-auto bg-white">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            🔥 Trending Books
          </h2>
          <button
            onClick={() => navigate("/books")}
            className="text-indigo-600 hover:underline"
          >
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trendingBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </section>

      {/* ================= TRENDING BLOGS ================= */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              ✍️ Trending Blogs
            </h2>
            <button
              onClick={() => navigate("/blogs")}
              className="text-indigo-600 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trendingBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-indigo-600 text-white py-16 text-center px-6 rounded-[3%]">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Share Your Knowledge?
        </h2>
        <p className="text-gray-200 mb-6">
          List your books or write your first blog and become part of our growing community.
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Add a blog
        </button>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <Testimonials/>

      {/* ================= CONTACT ================= */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Get In Touch 📩
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Have questions about buying, selling, or blogging? 
        Our team is here to help you anytime.
      </p>
    </div>

    {/* Content */}
    <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* Left Info Section */}
      <div className="space-y-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-lg text-indigo-600 mb-2">
            📧 Email Us
          </h3>
          <p className="text-gray-600 text-sm">
            support@bookshare.com
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-lg text-indigo-600 mb-2">
            📍 Location
          </h3>
          <p className="text-gray-600 text-sm">
            Jaipur, Rajasthan, India
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h3 className="font-semibold text-lg text-indigo-600 mb-2">
            ⏰ Support Hours
          </h3>
          <p className="text-gray-600 text-sm">
            Monday – Saturday, 9:00 AM – 6:00 PM
          </p>
        </div>

      </div>

      {/* Right Form Section */}
      <div className="bg-white p-10 rounded-3xl shadow-lg">
        <form className="space-y-6">

          <div>
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Send Message 🚀
          </button>

        </form>
      </div>

    </div>
  </div>
</section>

      {/* ================= FLOATING BUTTON ================= */}
      <button
        onClick={handleCreateClick}
        className={`fixed bottom-6 right-6 px-5 py-3 rounded-full shadow-lg transition text-white
          ${
            !user
              ? "bg-gray-600 hover:bg-gray-700"
              : !isVerified
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {!user
          ? "Login to Write"
          : !isVerified
          ? "Verify Now"
          : "+ Write Blog"}
      </button>

    </div>
  );
};

export default Home;