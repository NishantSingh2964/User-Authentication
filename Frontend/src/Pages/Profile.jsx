import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Please login to view profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-md mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* User Details */}
        <div className="mt-6 space-y-4">

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">User ID</span>
            <span className="text-gray-800 text-sm">{user._id}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Email Verified</span>
            <span
              className={`text-sm font-medium ${
                user.isAccountVerified
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {user.isAccountVerified ? "Verified" : "Not Verified"}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
