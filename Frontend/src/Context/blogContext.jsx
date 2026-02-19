import React, { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const BlogContext = createContext();

const backendUrl = "https://user-authentication-ecru.vercel.app/api/blog";

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  const createBlog = async (formData) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      toast.success(res.data.message);
      return res.data;

    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const getAllBlogs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${backendUrl}/`);

      if (res.data.success) {
        setBlogs(res.data.blogs);
      }

      return res.data;

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const getSingleBlog = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(`${backendUrl}/${id}`);

      if (res.data.success) {
        setSingleBlog(res.data.blog);
      }

      return res.data;

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async (id, formData) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${backendUrl}/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      toast.success(res.data.message);
      return res.data;

    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `${backendUrl}/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.data.success) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        setSingleBlog((prev) =>
          prev?._id === id ? null : prev
        );
      }
      return res.data;

    } catch (error) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      return { success: false, message };
    }
  };


  const getMyBlogs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendUrl}/my-blogs`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (res.data.success) {
        setBlogs(res.data.blogs);
      }

      return res.data;

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendUrl}?category=${category}`
      );

      if (res.data.success) {
        setBlogs(res.data.blogs);
      }

      return res.data;

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id) => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?._id;

    if (!userId) {
      return { success: false, message: "User not found" };
    }

    const res = await axios.put(
      `${backendUrl}/toggle-like/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );

    if (res.data.success) {

      setBlogs(prev =>
        prev.map(blog =>
          blog._id === id
            ? {
                ...blog,
                likes: res.data.liked
                  ? [...blog.likes, userId]
                  : blog.likes.filter(likeId => likeId !== userId)
              }
            : blog
        )
      );

      return res.data;
    }

  } catch (error) {
    console.error(error);
    return { success: false };
  }
};



  return (
    <BlogContext.Provider
      value={{
        blogs,
        singleBlog,
        loading,
        createBlog,
        getAllBlogs,
        getSingleBlog,
        updateBlog,
        deleteBlog,
        getMyBlogs,
        filterByCategory,
        toggleLike
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
