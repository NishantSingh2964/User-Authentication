import express, { Router } from 'express'
import { Login, logout, signUp } from '../Controller/UserController.js';

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post('/login', Login);
userRouter.get('/logout', logout);

export default userRouter;
