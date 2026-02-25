import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const shortDescription =
    book.description?.length > 120
      ? book.description.substring(0, 120) + "..."
      : book.description;

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col">

      {/* Image Section */}
      {book.image && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />

          {/* Stock Badge */}
          {book.quantity > 0 ? (
            <span className="absolute top-2 left-2 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}

          {/* Price Badge */}
          <span className="absolute top-2 right-2 bg-indigo-100 text-indigo-600 text-sm font-semibold px-3 py-1 rounded-full">
            ₹ {book.price}
          </span>
        </div>
      )}

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">

        {/* Book Info */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          By <span className="font-medium">{book.author}</span>
        </p>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {shortDescription}
        </p>

        {/* View More Button */}
        <button
          onClick={() => navigate(`/single-book/${book._id}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300 mt-auto"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default BookCard;