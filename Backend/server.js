import express from "express";
import connectDB from "./Config/datsbase.js";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
connectDB();

// Routes
app.use('/api/user', userRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

