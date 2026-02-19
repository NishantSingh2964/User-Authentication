import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "../Context/blogContext";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import RichTextEditor from "../Components/RichTextEditor.jsx";

const WriteBlog = () => {
  const { createBlog, updateBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  const location = useLocation();

  const existingBlog = location.state?.blog;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Travel",
    "Lifestyle",
    "Games",
    "Fashion",
    "Technology",
    "Food",
    "Health",
    "Education",
    "Business",
    "Other",
  ];

  // Prefill data when editing
  useEffect(() => {
    if (existingBlog) {
      setTitle(existingBlog.title);
      setContent(existingBlog.content);

      if (categories.includes(existingBlog.category)) {
        setCategory(existingBlog.category);
      } else {
        setCategory("Other");
        setCustomCategory(existingBlog.category);
      }
    }
  }, [existingBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    if (!title.trim() || !content.trim()) {
      toast.error("Title and Content are required");
      return;
    }

    const finalCategory =
      category === "Other" ? customCategory : category;

    if (!finalCategory) {
      toast.error("Please select a category");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", finalCategory);

    if (image) {
      formData.append("image", image);
    }

    try {
      let res;

      if (existingBlog) {
        res = await updateBlog(existingBlog._id, formData);
      } else {
        res = await createBlog(formData);
      }

      if (res?.success) {
        toast.success(
          existingBlog
            ? "Blog updated successfully"
            : "Blog published successfully"
        );

        navigate(
          existingBlog
            ? `/blog/${existingBlog._id}`
            : `/blog/${res.blog._id}`,
          { replace: true }
        );
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

        {/* ===== LEFT SIDE - EDITOR ===== */}
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-8">
            {existingBlog ? "Edit Your Blog ✏️" : "Write Your Blog ✍️"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter blog title..."
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Category */}
            {category === "Other" && (
              <input
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            )}

            {/* Image */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Blog Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full border border-gray-300 p-3 rounded-xl bg-white"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-3 font-medium text-gray-700">
                Content
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 rounded-xl font-semibold text-white transition
                ${existingBlog
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"}
                ${submitting ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              {submitting
                ? existingBlog
                  ? "Updating..."
                  : "Publishing..."
                : existingBlog
                ? "Update Blog ✏️"
                : "Publish Blog 🚀"}
            </button>

          </form>
        </div>

        {/* ===== RIGHT SIDE - LIVE PREVIEW ===== */}
        <div className="bg-white p-8 rounded-3xl shadow-xl overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 border-b pb-3">
            Live Preview
          </h2>

          {/* Title */}
          <h3 className="text-4xl font-bold mb-3 text-gray-900">
            {title || "Your Blog Title"}
          </h3>

          {/* Category Badge */}
          <span className="inline-block mb-6 px-4 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
            {category === "Other"
              ? customCategory || "Custom Category"
              : category || "Category"}
          </span>

          {/* Image Preview */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-64 object-cover rounded-2xl mb-8 shadow-md"
            />
          )}

          {/* Rich HTML Preview */}
          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{
              __html:
                content ||
                "<p class='text-gray-400'>Your blog content preview will appear here...</p>",
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default WriteBlog;
