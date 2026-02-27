import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";
import { toast } from "react-toastify";

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { book } = location.state || {};
    const { placeOrder } = useOrder();

    const [quantity, setQuantity] = useState(1);
    const [processing, setProcessing] = useState(false);

    const [address, setAddress] = useState({
        fullName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });

    const GST_PERCENTAGE = 0.05;
    const TAX_PERCENTAGE = 0.02;

    if (!book) {
        return (
            <div className="text-center mt-20 text-gray-700">
                No book selected. Go back to shop.
            </div>
        );
    }

    const subtotal = book.price * quantity;
    const gst = subtotal * GST_PERCENTAGE;
    const tax = subtotal * TAX_PERCENTAGE;
    const total = subtotal + gst + tax;

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        try {
            // 🔒 Validate Address Fields
            const isAddressValid = Object.values(address).every(
                (field) => field.trim() !== ""
            );

            if (!isAddressValid) {
                toast.error("Please fill all shipping details");
                return;
            }

            if (!book?._id) {
                toast.error("Invalid book");
                return;
            }

            setProcessing(true);

            const orderData = [
                {
                    bookId: book._id,
                    quantity: Number(quantity),
                },
            ];

            await placeOrder(orderData);

            toast.success("Book purchased successfully 🎉");

            navigate("/purchased-books");

        } catch (err) {
            console.error(err.response?.data || err);
            toast.error(err.response?.data?.message || "Payment failed");
            setProcessing(false);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                    <h2 className="text-3xl font-bold text-white">
                        Secure Checkout
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                        Complete your purchase safely
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 p-8">

                    {/* LEFT SIDE — Book Summary */}
                    <div className="space-y-6">

                        <div className="flex gap-6">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-36 h-48 object-cover rounded-lg shadow-md"
                            />

                            <div className="flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        ₹ {book.price}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 mt-4">
                                    <span className="text-sm font-medium text-gray-600">
                                        Quantity
                                    </span>
                                    <input
                                        type="number"
                                        min="1"
                                        max={book.quantity}
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                Math.min(
                                                    book.quantity,
                                                    Math.max(1, Number(e.target.value))
                                                )
                                            )
                                        }
                                        className="w-16 text-center border border-gray-300 rounded-md py-1 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-gray-50 p-6 rounded-xl border space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹ {subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>GST (5%)</span>
                                <span>₹ {gst.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-gray-600">
                                <span>Taxes (2%)</span>
                                <span>₹ {tax.toFixed(2)}</span>
                            </div>

                            <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                                <span>Total</span>
                                <span className="text-blue-600">
                                    ₹ {total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE — Shipping */}
                    <div className="space-y-6">

                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Shipping Information
                            </h3>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    "fullName",
                                    "street",
                                    "city",
                                    "state",
                                    "zip",
                                    "country",
                                ].map((field) => (
                                    <input
                                        key={field}
                                        type="text"
                                        name={field}
                                        placeholder={field
                                            .replace(/([A-Z])/g, " $1")
                                            .replace(/^./, (str) => str.toUpperCase())}
                                        value={address[field]}
                                        onChange={handleAddressChange}
                                        className={`px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${address[field].trim() === ""
                                                ? "border-gray-300 focus:ring-blue-500"
                                                : "border-green-400 focus:ring-green-400"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={handlePayment}
                            disabled={processing}
                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition flex justify-center items-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                `Pay ₹${total.toFixed(2)}`
                            )}
                        </button>

                        <p className="text-xs text-gray-400 text-center">
                            🔒 100% secure payment simulation
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;