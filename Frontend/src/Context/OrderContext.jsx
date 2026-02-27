import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

const API_URL = "https://user-authentication-ecru.vercel.app/api/orders";

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // 🔹 Place order
  const placeOrder = async (books) => {
  try {
    setLoading(true);
    const { data } = await axios.post(
      API_URL,
      { books },
      getAuthHeader()
    );

    setOrders((prev) => [...prev, data]);

    return data; 
  } catch (err) {
    setError(err.response?.data?.message || "Error placing order");
    throw err; 
  } finally {
    setLoading(false);
  }
};

  // 🔹 Get user orders
  const fetchUserOrders = async (userId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/profile/${userId}`,
        getAuthHeader()
      );
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        placeOrder,
        fetchUserOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};