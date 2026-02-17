import React from "react";

const Home = () => {
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
    </div>
  );
};

export default Home;
