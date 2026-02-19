import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const getPlainText = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const excerpt = getPlainText(blog.content).slice(0, 120);

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">

      {/* Image */}
      {blog.image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
      )}

      <div className="p-6 flex justify-between gap-6">

        {/* LEFT SECTION */}
        <div className="flex-1">

          {/* Category */}
          <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
            {blog.category}
          </span>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mt-3 line-clamp-2">
            {blog.title}
          </h3>

          {/* Content */}
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {excerpt}...
          </p>

          {/* Author + Date */}
          <div className="mt-4 text-xs text-gray-400">
            By <span className="font-medium">{blog.author?.name}</span> •{" "}
            {new Date(blog.createdAt).toDateString()}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col items-end justify-between min-w-[90px]">

          {/* Like Count */}
          <div className="flex items-center gap-1 text-red-500 font-medium">
            <span className="text-lg">❤️</span>
            <span className="text-sm text-gray-600">
              {blog.likes?.length || 0}
            </span>
          </div>

          {/* Read More */}
          <button
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            Read →
          </button>
        </div>

      </div>
    </div>
  );
};

export default BlogCard;
