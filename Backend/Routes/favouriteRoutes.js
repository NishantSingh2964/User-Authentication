import express from "express";
import { toggleFavorite, getUserFavorites } from "../Controller/favouriteController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const favoriteRouter = express.Router();

favoriteRouter.post("/:bookId", authMiddleware, toggleFavorite);
favoriteRouter.get("/", authMiddleware, getUserFavorites);

export default favoriteRouter;