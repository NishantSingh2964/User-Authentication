import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const FavoriteContext = createContext();
export const useFavorite = () => useContext(FavoriteContext);

const API_URL = "https://user-authentication-ecru.vercel.app/api/favorites";

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAuthHeader = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const fetchFavorites = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(API_URL, {
                ...getAuthHeader(),
                withCredentials: true, // ⚡ Add this
            });

            if (data.success) {
                setFavorites(data.favorites);
            }
        } catch (error) {
            console.error("Fetch Favorites Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async (bookId) => {
        try {
            const { data } = await axios.post(
                `${API_URL}/${bookId}`,
                {},
                {
                    ...getAuthHeader(),
                    withCredentials: true,
                }
            );

            if (data.success) {
                if (data.favorited) {
                    // Add to state
                    const { data: updated } = await axios.get(
                        API_URL,
                        getAuthHeader()
                    );
                    setFavorites(updated.favorites);
                    toast.success("Added to favorites ❤️");
                } else {
                    // Remove from state
                    setFavorites((prev) =>
                        prev.filter((book) => book._id !== bookId)
                    );
                    toast.success("Removed from favorites");
                }

                return data;
            }
        } catch (error) {
            toast.error("Failed to update favorites");
            console.error("Toggle Favorite Error:", error);
        }
    };

    const isFavorited = (bookId) => {
        return favorites.some((book) => book._id === bookId);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchFavorites();
        }
    }, []);

    return (
        <FavoriteContext.Provider
            value={{
                favorites,
                loading,
                fetchFavorites,
                toggleFavorite,
                isFavorited,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};