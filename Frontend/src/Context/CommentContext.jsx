import React, { createContext, useState } from "react";
import axios from "axios";

export const CommentContext = createContext();

const CommentContextProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const API = "https://user-authentication-ecru.vercel.app/api/comments";

  const getComments = async (blogId) => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API}/${blogId}`);

      if (data.success) {
        setComments(data.comments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (blogId, text) => {
    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${API}/add`,
        { blogId, text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setComments((prev) => [data.comment, ...prev]);
      }

      return data;
    } catch (error) {
      return { success: false };
    } finally {
      setActionLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `${API}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
      }

      return data;
    } catch (error) {
      return { success: false };
    } finally {
      setActionLoading(false);
    }
  };

  const editComment = async (commentId, text) => {
    try {
      setActionLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `${API}/comment/${commentId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? { ...comment, text: data.comment.text }
              : comment
          )
        );
      }

      return data;
    } catch (error) {
      return { success: false };
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        loading,
        actionLoading,
        getComments,
        addComment,
        deleteComment,
        editComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;