import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const backendUrl = "https://user-authentication-ecru.vercel.app";

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post(`${backendUrl}/signup`, {
                name,
                email,
                password,
            });

            if (res.data.success) {
                const { token, user } = res.data;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user)); // ✅ FIXED

                setUser(user);
            }

            return res.data;
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message || "Something went wrong",
            };
        }
    };


    const login = async (email, password) => {
        try {
            const res = await axios.post(`${backendUrl}/login`, {
                email,
                password,
            });

            if (res.data.success) {
                const { token, user } = res.data;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user)); // ✅ FIXED

                setUser(user);
            }


            return res.data;
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message || "Something went wrong",
            };
        }
    };


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // ✅ remove user too
        setUser(null);
    };


    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedUser !== "undefined") {
            setUser(JSON.parse(storedUser));
        }
    }, []);



    const value = {
        user,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
