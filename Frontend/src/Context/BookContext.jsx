import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const BookContext = createContext();
export const useBook = () => useContext(BookContext);

const API_URL = "https://user-authentication-ecru.vercel.app/api/books";

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // 🔹 Get all books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setBooks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Get books of logged-in user
  const fetchUserBooks = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/profile/${userId}`,
        getAuthHeader()
      );
      setUserBooks(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching user books");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add book (form-data for image)
  const addBook = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding book");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update book
  const updateBook = async (id, updatedData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${API_URL}/${id}`,
        updatedData,
        getAuthHeader()
      );
      setBooks((prev) =>
        prev.map((book) => (book._id === id ? data : book))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Error updating book");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete book
  const deleteBook = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        userBooks,
        loading,
        error,
        fetchBooks,
        fetchUserBooks,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};