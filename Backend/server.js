import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import cors from "cors";
import BlogRouter from "./Routes/blogRoutes.js";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://user-authentication-yrl6.vercel.app",
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/blog", BlogRouter)

app.get("/", (req, res) => {
  res.status(200).send("API is running 🚀");
});

export default app;


