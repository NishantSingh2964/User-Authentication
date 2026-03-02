import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, PenLine, Users, ShoppingCart } from "lucide-react";

const Landing = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/home");
        }
    }, []);

    return (
        <div className="bg-white text-gray-800">

            {/* ================= NAVBAR ================= */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    {/* Logo */}
                    <div
                        onClick={() => navigate("/")}
                        className="text-2xl font-bold text-indigo-600 cursor-pointer"
                    >
                        BookSphere
                    </div>

                    {/* Right Buttons */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate("/login")}
                            className="text-gray-700 hover:text-indigo-600 transition"
                        >
                            Login
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* ================= HERO SECTION ================= */}
            <section
                className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center pt-20"
                style={{ backgroundImage: "url('/hero5.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/65"></div>

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        <span>Buy, Sell & Share Knowledge</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 mb-10">
                        A powerful platform where readers connect, books find new homes,
                        and ideas turn into inspiring blogs.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button
                            onClick={() => navigate("/login")}
                            className="px-10 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-200 transition"
                        >
                            Get Started
                        </button>

                        <button
                            onClick={() => navigate("/register")}
                            className="px-10 py-3 border border-white rounded-xl hover:bg-white hover:text-indigo-600 transition"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section className="py-24 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Everything you need in one place — buying, selling, blogging and connecting.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-10 max-w-7xl mx-auto">
                    {[
                        { icon: <BookOpen size={40} />, title: "Buy Books", desc: "Discover affordable books from real users." },
                        { icon: <ShoppingCart size={40} />, title: "Sell Books", desc: "List your old books easily and earn money." },
                        { icon: <PenLine size={40} />, title: "Write Blogs", desc: "Share your thoughts and book reviews." },
                        { icon: <Users size={40} />, title: "Community", desc: "Connect with passionate readers & writers." },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition text-center"
                        >
                            <div className="text-indigo-600 mb-4 flex justify-center">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="py-32 px-6 min-h-[85vh] flex items-center bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                            Simple & Seamless Experience
                        </h2>

                        <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            Create your account, explore book listings, write engaging blogs,
                            connect with readers, and build your personal reading profile —
                            all in one powerful platform designed for book lovers.
                        </p>

                        <button
                            onClick={() => navigate("/register")}
                            className="bg-indigo-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition shadow-md"
                        >
                            Join Now
                        </button>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex justify-center">
                        <img
                            src="/hero2.jpg"
                            alt="Community"
                            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                        />
                    </div>

                </div>
            </section>

            {/* ================= FINAL CTA ================= */}
            <section className="py-24 px-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h2 className="text-4xl font-bold mb-6">
                    Ready to Start Your Journey?
                </h2>

                <p className="mb-10 max-w-2xl mx-auto text-gray-200">
                    Join our growing community of book lovers and knowledge seekers.
                </p>

                <button
                    onClick={() => navigate("/register")}
                    className="bg-white text-indigo-600 px-10 py-4 rounded-xl text-lg hover:bg-gray-200 transition shadow-lg"
                >
                    Create Your Account 🚀
                </button>
            </section>

            {/* ================= SMALL FOOTER ================= */}
            <footer className="bg-gray-900 text-gray-400 py-6 text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-sm">
                        © {new Date().getFullYear()} BookSphere. All rights reserved.
                    </p>
                </div>
            </footer>

        </div>
    );
};

export default Landing;