import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
    const { sendResetOtp, verifyResetOtp, resetPassword } = useContext(AuthContext);
    const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        const res = await sendResetOtp(email);
        toast[res.success ? "success" : "error"](res.message);
        if (res.success) setStep(2);
    };

    const handleVerifyOtp = async () => {
        const res = await verifyResetOtp(email, otp);
        toast[res.success ? "success" : "error"](res.message);
        if (res.success) setStep(3);
    };

    const handleResetPassword = async () => {
        const res = await resetPassword(email, otp, newPassword);

        if (res.success) {
            toast.success("Password changed Successfully", { duration: 2000 });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                {step === 1 && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full mb-4 rounded"
                        />
                        <button
                            onClick={handleSendOtp}
                            className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition"
                        >
                            Send OTP
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Verify OTP</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="border p-2 w-full mb-4 rounded text-center"
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700 transition"
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 w-full mb-4 rounded"
                        />
                        <button
                            onClick={handleResetPassword}
                            className="bg-purple-600 text-white p-2 rounded w-full hover:bg-purple-700 transition"
                        >
                            Reset Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
