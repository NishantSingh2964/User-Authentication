import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

import userRouter from "./Routes/userRoutes.js";
import BlogRouter from "./Routes/blogRoutes.js";
import commentRouter from "./Routes/commentRoutes.js";
import bookRouter from "./Routes/bookRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import favoriteRouter from "./Routes/favouriteRoutes.js";

dotenv.config();

const app = express();

// ========================
// Connect to Database
// ========================
connectDB();

// ========================
// Middlewares
// ========================

app.use(express.json());

// CORS (for Vite frontend running on 5174)
app.use(
  cors({
    origin: "https://user-authentication-yrl6.vercel.app",
    credentials: true,
  })
);

// ========================
// Routes
// ========================

app.use("/api/user", userRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/comments", commentRouter);
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/favorites", favoriteRouter);

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});


