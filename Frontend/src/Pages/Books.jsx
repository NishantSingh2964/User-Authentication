import React, { useEffect } from "react";
import { useBook } from "../Context/BookContext";
import BookCard from "../Components/BookCard";

const Books = () => {
  const { books, fetchBooks, loading, error } = useBook();

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
         Explore Books
        </h2>

        {loading && <p className="text-center text-gray-600">Loading books...</p>}
        {error && <p className="text-center text-red-500 font-medium">{error}</p>}
        {!loading && books.length === 0 && (
          <p className="text-center text-gray-500">No books available</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 ">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;