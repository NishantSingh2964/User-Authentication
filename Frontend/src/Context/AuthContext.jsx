import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const backendUrl = " https://user-authentication-ecru.vercel.app/api/user";

  // Signup
  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${backendUrl}/signup`, { name, email, password });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
      return res.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${backendUrl}/login`, { email, password });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
      return res.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Send OTP
  const sendVerificationOtp = async () => {
    try {
      const res = await axios.post(`${backendUrl}/send-verification-otp`, { email: user.email });
      return res.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  // Verify OTP
  const verifyOtp = async (otp) => {
    try {
      const res = await axios.post(`${backendUrl}/verify-otp`, { email: user.email, otp });
      if (res.data.success) {
        const updatedUser = { ...user, isAccountVerified: true };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      return res.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signup,
        login,
        logout,
        sendVerificationOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
