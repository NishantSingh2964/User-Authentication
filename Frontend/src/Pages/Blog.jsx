import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../Context/blogContext";
import BlogCard from "../Components/BlogCard";

const Blog = () => {
  const { getAllBlogs } = useContext(BlogContext);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllBlogs();
      if (res.success) {
        setBlogs(res.blogs);
        setFilteredBlogs(res.blogs);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

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
    setCurrentPage(1); 
  }, [searchText, categoryFilter, blogs]);

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Unique categories for dropdown
  const categories = [...new Set(blogs.map((b) => b.category))];

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Latest Blogs
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-500 p-3 rounded-xl w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category dropdown */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-500 p-3 rounded-xl w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Blog List */}
      {currentBlogs.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
          No blogs found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;