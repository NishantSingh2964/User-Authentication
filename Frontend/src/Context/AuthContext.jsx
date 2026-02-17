import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const backendUrl = "http://localhost:4000/api/user";

    const signup = async (name, email, password) => {
        try {
            const res = await axios.post(`${backendUrl}/signup`, {
                name,
                email,
                password,
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", res.data.name);
                setUser({ name: res.data.name });
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
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", res.data.name);
                setUser({ name: res.data.name });
            }

            return res.data;
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message,
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const storedName = localStorage.getItem("name");

        if (storedName) {
            setUser({ name: storedName });
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
