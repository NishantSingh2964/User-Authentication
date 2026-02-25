import express from "express";
import { addComment, deleteComment, editComment, getComments } from "../Controller/commentController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const commentRouter = express.Router();

commentRouter.post("/", authMiddleware, addComment);
commentRouter.get("/:itemId/:model", getComments);
commentRouter.delete("/:id", authMiddleware, deleteComment);
commentRouter.put("/:id", authMiddleware, editComment);

export default commentRouter;