import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { user, sendVerificationOtp, verifyOtp } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [message, setMessage] = useState("");

  if (!user) {
    return <div className="text-center mt-20 text-gray-600">Please login to view profile.</div>;
  }

  const handleSendOtp = async () => {
    const res = await sendVerificationOtp();
    setMessage(res.message);
    if (res.success) setShowOtpInput(true);
  };

  const handleVerifyOtp = async () => {
    const res = await verifyOtp(otp);
    setMessage(res.message);
    if (res.success) setShowOtpInput(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <img src="https://i.pravatar.cc/150?img=3" alt="Profile" className="w-28 h-28 rounded-full shadow-md mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">User ID</span>
            <span className="text-gray-800 text-sm">{user._id}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Email Verified</span>
            <span className={`text-sm font-medium ${user.isAccountVerified ? "text-green-600" : "text-red-500"}`}>
              {user.isAccountVerified ? "Verified" : "Not Verified"}
            </span>
          </div>

          {!user.isAccountVerified && !showOtpInput && (
            <button
              onClick={handleSendOtp}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Verify Email
            </button>
          )}

          {showOtpInput && (
            <div className="flex flex-col space-y-2 mt-2">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 rounded-lg text-center"
              />
              <button
                onClick={handleVerifyOtp}
                className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Submit OTP
              </button>
            </div>
          )}

          {message && <p className="text-center text-gray-700 mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
