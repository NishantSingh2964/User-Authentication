import React, { useEffect } from "react";
import { useFavorite } from "../Context/favouriteContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Favorites = () => {
    const { favorites, loading, fetchFavorites, toggleFavorite, isFavorited } = useFavorite();
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavorites();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Loading favorites...
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
                <p className="text-2xl mb-4">No favorites yet ❤️</p>
                <p>Explore books and add your favorites!</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-10 text-black text-center">My Favorites</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((book) => (
                    <div
                        key={book._id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col w-full"
                    >
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-6 flex flex-col justify-between flex-1">
                            {/* Title + Price row */}
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="font-semibold text-xl">{book.title}</h2>
                                <p className="text-blue-600 font-bold text-2xl">₹ {book.price}</p>
                            </div>

                            {/* Author and Seller */}
                            <div className="mb-4">
                                <p className="text-gray-600 text-sm mb-1">Author: {book.author}</p>
                                <p className="text-gray-600 text-sm mb-1">Seller: {book.seller?.name}</p>
                            </div>

                            {/* Buttons in a single row */}
                            <div className="mt-auto flex gap-3">
                                <button
                                    onClick={() => toggleFavorite(book._id)}
                                    className={`flex-1 py-2 rounded-md text-white font-semibold transition ${isFavorited(book._id)
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-gray-400 hover:bg-gray-500"
                                        }`}
                                >
                                    {isFavorited(book._id) ? "Remove" : "Add"}
                                </button>

                                <button
                                    onClick={() => navigate(`/single-book/${book._id}`)}
                                    className="flex-1 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;