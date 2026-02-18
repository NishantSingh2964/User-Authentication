import express, { Router } from 'express'
import { forgotPassword, Login, logout, resetPassword, sendVerificationOtp, signUp, verifyOtp, verifyResetOtp } from '../Controller/UserController.js';

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post('/login', Login);
userRouter.get('/logout', logout);
userRouter.post("/send-verification-otp", sendVerificationOtp);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/verify-reset-otp', verifyResetOtp);
userRouter.post('/reset-password', resetPassword);

export default userRouter;
