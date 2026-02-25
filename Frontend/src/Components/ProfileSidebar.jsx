// Components/ProfileSidebar.jsx

import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileSidebar = () => {
  const {
    user,
    sendVerificationOtp,
    verifyOtp,
    deleteAccount,
    logout,
  } = useContext(AuthContext);

  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const navigate = useNavigate();
  const isVerified = user?.isAccountVerified;

  const handleSendOtp = async () => {
    const res = await sendVerificationOtp();
    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      setShowOtpInput(true);
    }
  };

  const handleVerifyOtp = async () => {
    const res = await verifyOtp(otp);
    toast[res.success ? "success" : "error"](res.message);

    if (res.success) {
      setShowOtpInput(false);
      setOtp("");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmed) return;

    const res = await deleteAccount();
    if (res.success) {
      logout();
      toast.success("Account deleted successfully");
      navigate("/");
    } else {
      toast.error(res.message);
    }
  };

  if (!user) return null;

  return (
    <div className="col-span-1">
      <div className="bg-white shadow-xl rounded-2xl p-8 sticky top-10 space-y-6">
        
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
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

        {/* Account Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between border-b pb-2">
            <span>User ID</span>
            <span className="text-gray-600 truncate max-w-[120px]">
              {user._id}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Email Verified</span>
            <span
              className={`font-medium ${
                isVerified ? "text-green-600" : "text-red-500"
              }`}
            >
              {isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        {/* Verification Section */}
        {!isVerified && !showOtpInput && (
          <button
            onClick={handleSendOtp}
            className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition font-medium shadow-md"
          >
            Verify Profile
          </button>
        )}

        {showOtpInput && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Submit OTP
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t">
          <button
            onClick={() => navigate("/add-book")}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Book
          </button>

          <button
            onClick={()=> navigate('/write-blog')}
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Create Blog
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;