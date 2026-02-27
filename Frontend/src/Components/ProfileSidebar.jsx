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
      <div className="bg-white shadow-2xl rounded-3xl p-8 sticky top-10 space-y-6 border border-gray-100">

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-lg mb-4 ring-4 ring-gray-100"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {user.name}
          </h2>
          <p className="text-gray-500 text-sm">{user.email}</p>

          {/* Verification Badge */}
          <span
            className={`mt-2 px-3 py-1 text-xs font-medium rounded-full ${
              isVerified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isVerified ? "Verified Account" : "Not Verified"}
          </span>
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
          <div className="space-y-3">
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

          {/* ✅ Only visible if verified */}
          {isVerified ? (
            <>
              <button
                onClick={() => navigate("/add-book")}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition font-medium shadow-md"
              >
                + Add Book
              </button>

              <button
                onClick={() => navigate("/write-blog")}
                className="w-full bg-gray-700 text-white py-2.5 rounded-xl hover:bg-gray-800 transition font-medium shadow-md"
              >
                Create Blog
              </button>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm p-3 rounded-lg text-center">
              Please verify your account to add books or create blogs.
            </div>
          )}

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-2.5 rounded-xl hover:bg-red-700 transition font-medium shadow-md"
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileSidebar;