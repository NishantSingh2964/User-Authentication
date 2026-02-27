import React, { useEffect, useState, useContext } from "react";
import { useBook } from "../Context/BookContext";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserBooks = () => {
  const { user } = useContext(AuthContext);
  const { userBooks, fetchUserBooks } = useBook();
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const isVerified = user?.isAccountVerified;

  useEffect(() => {
    if (user?._id) {
      fetchUserBooks(user._id);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Listed Books
        </h2>

        {/* ✅ Show Add Book only if verified */}
        {isVerified ? (
          <button
            onClick={() => navigate("/add-book")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium shadow-md"
          >
            + Add Book
          </button>
        ) : (
          <div className="text-sm bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg">
            Verify your account to add books
          </div>
        )}
      </div>

      {/* Empty State */}
      {userBooks?.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow text-center text-gray-500">
          You haven't listed any books yet.
        </div>
      ) : (
        <>
          {/* Books Grid */}
          <div className="grid md:grid-cols-2 gap-6 pb-6">
            {(showAll ? userBooks : userBooks.slice(0, 4)).map((book) => (
              <div
                key={book._id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col"
              >
                {/* Image */}
                <div className="h-40 overflow-hidden rounded-lg mb-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{book.author}</p>

                <p className="text-indigo-600 font-bold text-lg mb-2">
                  ₹ {book.price}
                </p>

                {/* Stock Badge */}
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${
                    book.quantity > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {book.quantity > 0
                    ? `Stock Left: ${book.quantity}`
                    : "Out of Stock"}
                </span>

                <button
                  onClick={() => navigate(`/single-book/${book._id}`)}
                  className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* View More / Hide Button */}
          {userBooks.length > 4 && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                {showAll ? "Hide Books" : "View More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserBooks;