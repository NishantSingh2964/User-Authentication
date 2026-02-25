import React, { useState, useEffect } from "react";
import { useBook } from "../Context/BookContext";
import { useNavigate, useParams } from "react-router-dom";

const AddBook = () => {
  const { id } = useParams(); // 🔥 detect edit mode
  const navigate = useNavigate();

  const {
    addBook,
    updateBook,
    fetchSingleBook,
    singleBook,
    loading,
  } = useBook();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🔥 Fetch book data if editing
  useEffect(() => {
    if (isEditMode) {
      fetchSingleBook(id);
    }
  }, [id]);

  // 🔥 Prefill form when book loads
  useEffect(() => {
    if (isEditMode && singleBook) {
      setFormData({
        title: singleBook.title || "",
        author: singleBook.author || "",
        description: singleBook.description || "",
        price: singleBook.price || "",
        quantity: singleBook.quantity || "",
      });

      setPreview(singleBook.image);
    }
  }, [singleBook]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) =>
      data.append(key, formData[key])
    );

    if (image) {
      data.append("image", image);
    }

    if (isEditMode) {
      await updateBook(id, data);
    } else {
      await addBook(data);
    }

    navigate("/books");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          {isEditMode ? "Edit Book" : "Add New Book"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Book Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                required
                value={formData.author}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border border-gray-300 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                name="quantity"
                required
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border border-gray-300 rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Book Cover Image
              </label>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center cursor-pointer hover:border-indigo-500 transition">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  ) : (
                    <p className="text-gray-500">
                      Click to upload book cover
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* 🔥 Dynamic Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-8 w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-md ${isEditMode
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
            >
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                  ? "Update Book"
                  : "Publish Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;