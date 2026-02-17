import { json } from "express";
import userModel from "../Models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.json({
            success: false,
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
        name,
        email,
        password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true, token, user: user });
}

const Login = async (req, res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    const existingUser = await userModel.findOne({ email });

    if(!existingUser){
        return res.json({success: false, message: "user doesn't exist"});
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if(!isMatch){
        return res.json({success: false, message: "Invalid credentials"});
    }

    const token = jwt.sign(
        { id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ success: true, token, user: existingUser});
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: 'Logged Out' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export { signUp, Login };