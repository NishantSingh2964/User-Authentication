import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isVerified = user?.isAccountVerified;

  const handleCreateClick = () => {
    if (!user) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    if (!isVerified) {
      navigate("/profile"); // redirect user to verify
      return;
    }

    navigate("/write-blog");
  };

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

      {/* Floating Action Button */}
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