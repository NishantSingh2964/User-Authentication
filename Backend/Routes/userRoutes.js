import express, { Router } from 'express'
import { Login, logout, sendVerificationOtp, signUp, verifyOtp } from '../Controller/UserController.js';

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post('/login', Login);
userRouter.get('/logout', logout);
userRouter.post("/send-verification-otp", sendVerificationOtp);
userRouter.post("/verify-otp", verifyOtp);

export default userRouter;
