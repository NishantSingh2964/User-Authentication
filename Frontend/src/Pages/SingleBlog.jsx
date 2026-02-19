import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogContext } from "../Context/blogContext";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const SingleBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        singleBlog,
        getSingleBlog,
        deleteBlog,
        toggleLike,
        loading,
    } = useContext(BlogContext);

    const { user } = useContext(AuthContext);

    const [likeLoading, setLikeLoading] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (id) {
            getSingleBlog(id);
        }
    }, [id]);

    // Sync likes from backend blog fetch
    useEffect(() => {
        if (singleBlog) {
            setLikesCount(singleBlog.likes?.length || 0);
            setLiked(
                user?._id
                    ? singleBlog.likes?.includes(user._id)
                    : false
            );
        }
    }, [singleBlog, user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Loading blog...
            </div>
        );
    }

    if (!singleBlog) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Blog not found
            </div>
        );
    }

    const isOwner =
        user?._id && singleBlog?.author?._id
            ? String(user._id) === String(singleBlog.author._id)
            : false;

    /* ===========================
       LIKE HANDLER
    ============================ */
    const handleLike = async () => {
        if (!user) {
            toast.error("Please login to like this blog");
            return;
        }

        if (likeLoading) return;

        setLikeLoading(true);

        const res = await toggleLike(id);

        if (res?.success) {
            setLikesCount(res.likesCount);
            setLiked(res.liked);
        } else {
            toast.error("Failed to update like");
        }

        setLikeLoading(false);
    };

    /* ===========================
       DELETE HANDLER
    ============================ */
    const handleDelete = async () => {
        toast(
            (t) => (
                <div className="flex flex-col gap-4">
                    <p className="text-white font-medium">
                        Are you sure you want to delete this blog?
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="bg-gray-500 px-3 py-1 rounded text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={async () => {
                                toast.dismiss(t.id);
                                const res = await deleteBlog(id);

                                if (res?.success) {
                                    toast.success("Blog deleted successfully");
                                    navigate("/profile", { replace: true });
                                } else {
                                    toast.error(res?.message || "Delete failed");
                                }
                            }}
                            className="bg-red-600 px-3 py-1 rounded text-white"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            ),
            {
                duration: 8000,
                style: { background: "#1f2937" },
            }
        );
    };

    const handleEdit = () => {
        navigate("/write-blog", {
            state: { blog: singleBlog },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ===== HERO SECTION ===== */}
            <div className="relative w-full h-[480px]">

                {singleBlog.image && (
                    <img
                        src={singleBlog.image}
                        alt="Blog"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Softer Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

                {/* Back Button */}
                <div className="absolute top-6 left-6 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/30 transition"
                    >
                        ← Back
                    </button>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-14 text-white">

                    {/* FLEX ROW - LEFT + RIGHT */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">

                        {/* LEFT SECTION */}
                        <div className="max-w-3xl">

                            <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                                {singleBlog.category}
                            </span>

                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                {singleBlog.title}
                            </h1>

                            <div className="mt-4 text-sm text-gray-200">
                                By{" "}
                                <span className="font-semibold text-white">
                                    {singleBlog.author?.name}
                                </span>{" "}
                                • {new Date(singleBlog.createdAt).toDateString()}
                            </div>

                        </div>

                        {/* RIGHT SECTION - LIKE */}
                        <div className="flex items-center justify-start md:justify-end">

                            <button
                                onClick={handleLike}
                                disabled={likeLoading}
                                className={`flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md border transition-all duration-200
                        ${liked
                                        ? "bg-red-500/20 border-red-400 text-red-400"
                                        : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                                    }
                        ${likeLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}
                    `}
                            >
                                <span className="text-2xl">
                                    {liked ? "❤️" : "🤍"}
                                </span>

                            </button>

                        </div>

                    </div>

                    {/* OWNER BUTTONS */}
                    {isOwner && (
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleEdit}
                                className="bg-yellow-500 px-5 py-2 rounded-lg hover:bg-yellow-600 transition text-sm font-semibold shadow-md"
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition text-sm font-semibold shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                </div>
            </div>


            {/* ===== CONTENT SECTION ===== */}
            <div className="max-w-4xl mx-auto px-6 py-20">
                <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl">

                    <div
                        className="prose prose-lg max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{
                            __html: singleBlog.content,
                        }}
                    />

                </div>
            </div>

        </div>
    );
};

export default SingleBlog;
