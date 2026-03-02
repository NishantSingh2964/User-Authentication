import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">

      <section
        className="relative min-h-[80vh] flex items-center justify-center text-center px-6 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/hero2.jpg')" }}
      >

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Our Community 📚
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            We’re building a space where readers connect, writers share,
            and books find new homes.
          </p>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            What started as a simple idea — helping students sell their
            old books — has grown into a vibrant community of readers,
            writers, and knowledge seekers.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe books should never gather dust. Instead, they should
            inspire new minds, spark conversations, and continue their journey
            from one reader to another.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img
            src="/hero.jpg"
            alt="Books"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="bg-white p-10 rounded-3xl shadow-md">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">
              🎯 Our Mission
            </h3>
            <p className="text-gray-600">
              To create a trusted marketplace where users can buy and sell
              books easily while fostering a knowledge-sharing blogging
              community.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-md">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              🌍 Our Vision
            </h3>
            <p className="text-gray-600">
              To become the go-to platform for book lovers — where learning,
              sharing, and community thrive together.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-14">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📚</div>
            <h4 className="font-semibold mb-2">Affordable Books</h4>
            <p className="text-gray-600 text-sm">
              Buy second-hand books at budget-friendly prices.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">✍️</div>
            <h4 className="font-semibold mb-2">Write & Share Blogs</h4>
            <p className="text-gray-600 text-sm">
              Share your thoughts, reviews, and knowledge with readers.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🤝</div>
            <h4 className="font-semibold mb-2">Trusted Community</h4>
            <p className="text-gray-600 text-sm">
              Connect with verified users in a safe environment.
            </p>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-20 bg-indigo-600 text-white text-center rounded-[2%]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="text-gray-200">Books Listed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">300+</h3>
            <p className="text-gray-200">Active Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">150+</h3>
            <p className="text-gray-200">Blogs Written</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">1,000+</h3>
            <p className="text-gray-200">Happy Readers</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Join Our Community Today 🚀
        </h2>
        <p className="text-gray-600 mb-8">
          Start buying, selling, and sharing knowledge with passionate readers.
        </p>

        <button
          onClick={() => navigate("/profile")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Get Started
        </button>
      </section>

    </div>
  );
};

export default About;