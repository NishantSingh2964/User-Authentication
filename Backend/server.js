import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import cors from "cors";
import BlogRouter from "./Routes/blogRoutes.js";
import commentRouter from "./Routes/commentRoutes.js";
import bookRouter from "./Routes/bookRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import favoriteRouter from "./Routes/favouriteRoutes.js";
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://user-authentication-yrl6.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/comments", commentRouter);
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/favorites", favoriteRouter);

app.get("/", (req, res) => {
  res.status(200).send("API is running 🚀");
});

export default app;