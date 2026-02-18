import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const backendUrl = "https://user-authentication-ecru.vercel.app/api/user";


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

    // Send verification OTP (for email verification)
    const sendVerificationOtp = async () => {
        try {
            const res = await axios.post(`${backendUrl}/send-verification-otp`, { email: user.email });
            return res.data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    // Verify OTP (for email verification)
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

    // Send OTP for forgot password
    const sendResetOtp = async (email) => {
        try {
            const res = await axios.post(`${backendUrl}/forgot-password`, { email });
            return res.data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    // Verify OTP for forgot password
    const verifyResetOtp = async (email, otp) => {
        try {
            const res = await axios.post(`${backendUrl}/verify-reset-otp`, { email, otp });
            return res.data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    // Reset password
    const resetPassword = async (email, otp, newPassword) => {
        try {
            const res = await axios.post(`${backendUrl}/reset-password`, { email, otp, newPassword });
            return res.data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message };
        }
    };

    // Inside AuthProvider.jsx
    const deleteAccount = async () => {
        if (!user) return { success: false, message: "User not logged in" };

        try {
            const res = await axios.post(`${backendUrl}/delete-account`, {
                email: user.email,
            });
            
            return res.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(message);
            return { success: false, message };
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
                sendResetOtp,
                verifyResetOtp,
                resetPassword,
                deleteAccount
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
