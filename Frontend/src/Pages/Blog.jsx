import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../Context/blogContext";
import BlogCard from "../Components/BlogCard";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const { getAllBlogs } = useContext(BlogContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllBlogs();
      if (res.success) {
        setBlogs(res.blogs);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Latest Blogs
      </h1>

      {blogs.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
          No blogs available.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
