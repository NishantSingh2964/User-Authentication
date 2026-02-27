import React from "react";

const Loader = ({ fullScreen = false, size = "medium" }) => {
  const sizeClasses = {
    small: "w-5 h-5 border-2",
    medium: "w-10 h-10 border-4",
    large: "w-16 h-16 border-4",
  };

  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "min-h-screen bg-gray-50" : ""
      }`}
    >
      <div
        className={`${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loader;