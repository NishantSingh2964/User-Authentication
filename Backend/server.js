import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 4000;

// Middleware
app.use(
  cors({
    origin: "https://user-authentication-yrl6.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
connectDB();

// Routes
app.use('/api/user', userRouter)

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

