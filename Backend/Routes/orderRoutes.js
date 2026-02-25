import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { placeOrder, getUserOrders } from "../Controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/', authMiddleware, placeOrder)
orderRouter.get('/profile/:userId', authMiddleware, getUserOrders)

export default orderRouter;