import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";

import userRouter from "./Routes/userRoutes.js";
import BlogRouter from "./Routes/blogRoutes.js";
import commentRouter from "./Routes/commentRoutes.js";
import bookRouter from "./Routes/bookRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import favoriteRouter from "./Routes/favouriteRoutes.js";

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || "https://user-authentication-yrl6.vercel.app",
  credentials: true, // Allow cookies / credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/comments", commentRouter);
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/favorites", favoriteRouter);

// Default route
app.get("/", (req, res) => {
  res.status(200).send("API is running 🚀");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});



export default app;