import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const BookContext = createContext();
export const useBook = () => useContext(BookContext);

const API_URL = "https://user-authentication-ecru.vercel.app/api/books";

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [singleBook, setSingleBook] = useState(null);
  const [userBooks, setUserBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setBooks(data.books);

    } catch (err) {
      setError(err.response?.data?.message || "Error fetching books");
    } finally {
      setLoading(false);
    }
  };
  const fetchSingleBook = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/${id}`);
      setSingleBook(data.book || data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching book");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBooks = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/profile/${userId}`,
        getAuthHeader()
      );
      setUserBooks(data.books || data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching user books");
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setBooks((prev) => [...prev, data.book]);
      toast.success("Book added successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding book");
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (id, updatedData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API_URL}/${id}`,
        updatedData,
        getAuthHeader()
      );

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id ? data.book : book
        )
      );

      toast.success("Book updated");
    } catch (err) {
      setError(err.response?.data?.message || "Error updating book");
      toast.error("Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());

      setBooks((prev) => prev.filter((book) => book._id !== id));
      toast.success("Book deleted");
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting book");
      toast.error("Failed to delete book");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (book) => {
    setCart((prev) => [...prev, book]);
    toast.success("Added to cart");
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const addToFavorites = (book) => {
    setFavorites((prev) => [...prev, book]);
    toast.success("Added to favorites");
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <BookContext.Provider
      value={{
        books,
        singleBook,
        userBooks,
        favorites,
        cart,
        loading,
        error,
        fetchBooks,
        fetchSingleBook,
        fetchUserBooks,
        addBook,
        updateBook,
        deleteBook,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};