import express from "express";
import { addComment, deleteComment, editComment, getComments } from "../Controller/commentController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/add", authMiddleware, addComment);
commentRouter.get("/:blogId", getComments);
commentRouter.put("/comment/:id", authMiddleware, editComment);
commentRouter.delete("/comment/:id", authMiddleware, deleteComment);

export default commentRouter;