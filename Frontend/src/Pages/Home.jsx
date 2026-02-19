import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Our Website 🚀
      </h1>
      <p className="text-gray-600 max-w-2xl">
        This is the home page of our application. You can navigate through
        About, Contact, and Blog sections using the navbar above.
      </p>

      <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Explore More
      </button>

      <button
        onClick={() => navigate("/write-blog")}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        + Write Blog
      </button>
    </div>
  );
};

export default Home;
