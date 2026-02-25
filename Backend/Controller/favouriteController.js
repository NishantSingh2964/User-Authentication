import userModel from "../Models/userModels.js";
import Book from "../Models/bookModel.js";

export const toggleFavorite = async (req, res) => {
    try {
        const { bookId } = req.params;

        // Check login
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        // Find user
        const user = await userModel.findById(req.user._id);

        const alreadyFavorited = user.favorites.includes(bookId);

        if (alreadyFavorited) {
            // Remove from favorites
            user.favorites = user.favorites.filter(
                (id) => id.toString() !== bookId.toString()
            );

            await user.save();

            return res.status(200).json({
                success: true,
                message: "Removed from favorites",
                favorited: false,
            });
        } else {
            // Add to favorites
            user.favorites.push(bookId);
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Added to favorites",
                favorited: true,
            });
        }
    } catch (error) {
        console.error("Toggle Favorite Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getUserFavorites = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        const user = await userModel.findById(req.user._id)
            .populate({
                path: "favorites",
                model: "Book",
                populate: {
                    path: "seller",
                    select: "name",
                },
            });

        res.status(200).json({
            success: true,
            favorites: user.favorites,
        });
    } catch (error) {
        console.error("Get Favorites Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};