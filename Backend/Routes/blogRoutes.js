import express from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  toggleLike,
} from "../Controller/blogController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import upload from "../Middleware/multer.js";


const BlogRouter = express.Router();

BlogRouter.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  createBlog
);

BlogRouter.get("/my-blogs", authMiddleware, getMyBlogs);
BlogRouter.get("/", getAllBlogs);
BlogRouter.get("/:id", getSingleBlog);
BlogRouter.put("/update/:id", authMiddleware, upload.single("image"), updateBlog);
BlogRouter.delete("/delete/:id", authMiddleware, deleteBlog);
BlogRouter.put("/toggle-like/:id", authMiddleware, toggleLike);


export default BlogRouter;
