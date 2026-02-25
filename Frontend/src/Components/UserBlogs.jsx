import React from "react";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";

const UserBlogs = ({
  blogs,
  isVerified,
  showAll,
  setShowAll,
}) => {
  const navigate = useNavigate();

  return (
    <div>
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

      {blogs?.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
          No blogs found.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6 pb-6">
            {(showAll ? blogs : blogs.slice(0, 4)).map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

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
  );
};

export default UserBlogs;