import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { BlogContext } from "../Context/blogContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import BlogCard from "../Components/BlogCard.jsx";


const Profile = () => {
  const { user, sendVerificationOtp, verifyOtp, deleteAccount, logout } =
    useContext(AuthContext);

  const { blogs, getMyBlogs } = useContext(BlogContext);

  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getMyBlogs();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Please login to view profile.
      </div>
    );
  }

  const handleSendOtp = async () => {
    const res = await sendVerificationOtp();
    toast[res.success ? "success" : "error"](res.message);
    if (res.success) setShowOtpInput(true);
  };

  const handleVerifyOtp = async () => {
    const res = await verifyOtp(otp);
    toast[res.success ? "success" : "error"](res.message);
    if (res.success) setShowOtpInput(false);
  };

  const handleDeleteAccount = async () => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-3">
          <p className="text-white font-medium">
            Are you sure you want to delete your account?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-500 px-3 py-1 rounded text-white"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const res = await deleteAccount();
                if (res.success) {
                  logout();
                  toast.success("Account deleted successfully");
                  navigate("/");
                } else {
                  toast.error(res.message);
                }
              }}
              className="bg-red-600 px-3 py-1 rounded text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: 8000,
        style: { background: "#1f2937" },
      }
    );
  };

  return (
    <div className="h-screen bg-gray-50 px-6 py-10 overflow-hidden">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 h-full">

        {/* LEFT SIDE - PROFILE CARD (Sticky) */}
        <div className="col-span-1">
          <div className="bg-white shadow-xl rounded-2xl p-8 sticky top-10">

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

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>User ID</span>
                <span className="text-gray-600 truncate max-w-[120px]">
                  {user._id}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Email Verified</span>
                <span
                  className={`font-medium ${user.isAccountVerified
                    ? "text-green-600"
                    : "text-red-500"
                    }`}
                >
                  {user.isAccountVerified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>

            {/* Create Blog Button */}
            <button
              onClick={() => navigate("/write-blog")}
              className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition font-medium shadow-md"
            >
              + Create Blog
            </button>

            {!user.isAccountVerified && !showOtpInput && (
              <button
                onClick={handleSendOtp}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Verify Email
              </button>
            )}

            {showOtpInput && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border p-2 rounded-lg text-center"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Submit OTP
                </button>
              </div>
            )}

            <button
              onClick={handleDeleteAccount}
              className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete Account
            </button>

          </div>
        </div>

        {/* RIGHT SIDE - SCROLLABLE BLOG SECTION */}
        <div className="col-span-2 h-full overflow-y-auto pr-2 hide-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Recent Blogs
            </h2>

            <button
              onClick={() => navigate("/write-blog")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
            >
              + New Blog
            </button>
          </div>

          {blogs?.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
              You haven't written any blogs yet.
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 pb-6">
                {(showAll ? blogs : blogs.slice(0, 4)).map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* View More / Hide Button */}
              {blogs.length > 4 && (
                <div className="text-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    {showAll ? "Hide Blogs" : "View More"}
                  </button>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );

};

export default Profile;
