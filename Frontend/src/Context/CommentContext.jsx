import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const CommentContext = createContext();
export const useComment = () => useContext(CommentContext);

const API_URL = "https://user-authentication-ecru.vercel.app/api/comments";

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchComments = async (itemId, model) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API_URL}/${itemId}/${model}`
      );

      if (data.success) {
        setComments(data.comments);
      }

      return data;

    } catch (error) {
      toast.error("Failed to fetch comments");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (itemId, model, text) => {
    try {
      const { data } = await axios.post(
        API_URL,
        { itemId, model, text },
        getAuthHeader()
      );

      if (data.success) {
        setComments((prev) => [data.comment, ...prev]);
        toast.success("Comment added");
      }

      return data;

    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to add comment";

      toast.error(message);
      return { success: false };
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/${commentId}`,
        getAuthHeader()
      );

      if (data.success) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );

        toast.success("Comment deleted");
      }

      return data;

    } catch (error) {
      toast.error("Failed to delete comment");
      return { success: false };
    }
  };

  const editComment = async (commentId, newText) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/${commentId}`,
        { text: newText },
        getAuthHeader()
      );

      if (data.success) {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? data.comment
              : comment
          )
        );

        toast.success("Comment updated");
      }

      return data;

    } catch (error) {
      toast.error("Failed to update comment");
      return { success: false };
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        fetchComments,
        addComment,
        deleteComment,
        editComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};