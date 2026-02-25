import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import userRouter from "./Routes/userRoutes.js";
import BlogRouter from "./Routes/blogRoutes.js";
import commentRouter from "./Routes/commentRoutes.js";
import bookRouter from "./Routes/bookRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import favoriteRouter from "./Routes/favouriteRoutes.js";

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(express.json());

const corsOptions = {
  origin: [
    "https://user-authentication-yrl6.vercel.app",
    "https://user-authentication-yrl6.vercel.app/",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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