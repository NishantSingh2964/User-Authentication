import express from "express";
import {
  addBook,
  getAllBooks,
  getUserBooks,
  updateBook,
  deleteBook,
  getSingleBook,
} from "../Controller/bookController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import upload from "../Middleware/multer.js";

const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.get("/profile/:userId", authMiddleware, getUserBooks);
bookRouter.post("/", authMiddleware, upload.single("image"), addBook);
bookRouter.put("/:id", authMiddleware, upload.single("image"), updateBook);
bookRouter.delete('/:id', authMiddleware, deleteBook)
bookRouter.get('/:id', getSingleBook);


export default bookRouter;