import React from "react";

const Blog = () => {
  return (
    <div className="min-h-[80vh] px-6 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Latest Blogs
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              Blog Title {item}
            </h2>
            <p className="text-gray-600 text-sm">
              This is a short description of the blog post. Click to read more
              about this topic.
            </p>
            <button className="mt-4 text-blue-600 hover:underline">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
