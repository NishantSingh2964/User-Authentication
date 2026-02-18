import { json } from "express";
import userModel from "../Models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

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

const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
        return res.json({ success: false, message: "user doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
        return res.json({ success: false, message: "Invalid credentials" });
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

    return res.json({ success: true, token, user: existingUser });
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

// Send OTP for verification
const sendVerificationOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expireAt = Date.now() + 10 * 60 * 1000; // OTP valid 10 mins

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = expireAt;
        await user.save();

        // Send OTP via email
        const message = `<p>Your OTP for email verification is: <b>${otp}</b></p>`;
        await sendEmail(user.email, "Email Verification OTP", message);

        res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }

        if (user.verifyOtp !== otp || Date.now() > user.verifyOtpExpireAt) {
            return res.json({ success: false, message: "Invalid or expired OTP" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        await user.save();

        res.json({ success: true, message: "Account verified successfully!" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.json({ success: false, message: "Email is required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expireTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetOtp = otp;
    user.resetOtpExpireAt = expireTime;
    await user.save();

    try {
        await sendEmail(
            email, 
            "Password Reset OTP", 
            `<p>Your OTP for password reset is <b>${otp}</b>. It is valid for 10 minutes.</p>` // html content
        );

        res.json({ success: true, message: "OTP sent to your email" });
    } catch (err) {
        console.log("Error sending email:", err);
        res.json({ success: false, message: "Failed to send OTP" });
    }

};

const verifyResetOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp)
        return res.json({ success: false, message: "Email and OTP required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.resetOtp !== otp) {
        return res.json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.resetOtpExpireAt) {
        return res.json({ success: false, message: "OTP expired" });
    }

    // OTP verified
    res.json({ success: true, message: "OTP verified, you can reset password now" });
};

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword)
        return res.json({ success: false, message: "All fields are required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.resetOtp !== otp) return res.json({ success: false, message: "Invalid OTP" });
    if (Date.now() > user.resetOtpExpireAt) return res.json({ success: false, message: "OTP expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
};

export { signUp, Login, sendVerificationOtp, verifyOtp, forgotPassword, verifyResetOtp, resetPassword };