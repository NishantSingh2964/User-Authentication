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

  // NEW: Search & Filter
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const navigate = useNavigate();
  const isVerified = user?.isAccountVerified;

  useEffect(() => {
    if (user) {
      getMyBlogs();
    }
  }, [user]);

  useEffect(() => {
    let temp = [...blogs];

    if (searchText.trim() !== "") {
      temp = temp.filter((blog) =>
        blog.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (categoryFilter !== "") {
      temp = temp.filter((blog) => blog.category === categoryFilter);
    }

    setFilteredBlogs(temp);
  }, [searchText, categoryFilter, blogs]);

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

  const categories = [...new Set(blogs.map((b) => b.category))];

  return (
    <div className="h-screen bg-gray-50 px-6 py-10 overflow-hidden">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 h-full">
        {/* LEFT SIDE - PROFILE + Filters */}
        <div className="col-span-1">
          <div className="bg-white shadow-xl rounded-2xl p-8 sticky top-10 space-y-6">
            
            {/* PROFILE INFO */}
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

            {/* FILTERS */}
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Search your blogs..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* ACTION BUTTONS */}
            {isVerified ? (
              <button
                onClick={() => navigate("/write-blog")}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition font-medium shadow-md"
              >
                + Create Blog
              </button>
            ) : !showOtpInput ? (
              <button
                onClick={handleSendOtp}
                className="w-full bg-green-600 text-white py-2.5 rounded-xl hover:bg-green-700 transition font-medium shadow-md"
              >
                Verify Profile
              </button>
            ) : null}

            {showOtpInput && (
              <div className="space-y-2">
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
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - BLOGS */}
        <div className="col-span-2 h-full overflow-y-auto pr-2 hide-scrollbar">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Blogs
            </h2>
            {isVerified && (
              <button
                onClick={() => navigate("/write-blog")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
              >
                + New Blog
              </button>
            )}
          </div>

          {filteredBlogs?.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
              {!isVerified
                ? "Verify yourself first to write blogs."
                : "No blogs match your search/filter."}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 pb-6">
                {(showAll ? filteredBlogs : filteredBlogs.slice(0, 4)).map(
                  (blog) => <BlogCard key={blog._id} blog={blog} />
                )}
              </div>

              {filteredBlogs.length > 4 && (
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