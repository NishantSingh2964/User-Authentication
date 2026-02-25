import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBook } from "../Context/BookContext";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Comments from "../Components/Comments";
import { useFavorite } from "../Context/favouriteContext";

const SingleBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const {
        singleBook,
        fetchSingleBook,
        addToCart,
        addToFavorites,
        deleteBook,
        loading,
    } = useBook();

    const { toggleFavorite, isFavorited } = useFavorite();
    const favorited = singleBook ? isFavorited(singleBook._id) : false;

    useEffect(() => {
        fetchSingleBook(id);
    }, [id]);

    if (loading)
        return <p className="text-center mt-20">Loading...</p>;

    if (!singleBook)
        return <p className="text-center mt-20">Book not found</p>;

    // 🔥 Check if current user is owner
    const isOwner =
        user && singleBook?.seller?._id === user?._id;

    const handleDelete = async () => {
        await deleteBook(singleBook._id);
        toast.success("Book deleted");
        navigate("/books");
    };

    return (
        <div className="max-w-6xl mx-auto mt-24 px-6">

            <div className="grid md:grid-cols-2 gap-10">

                {/* Image */}
                <div>
                    <img
                        src={singleBook.image}
                        alt={singleBook.title}
                        className="w-full h-[450px] object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">
                        {singleBook.title}
                    </h1>

                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Author:</span>{" "}
                        {singleBook.author}
                    </p>

                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Seller:</span>{" "}
                        {singleBook.seller?.name}
                    </p>

                    <p className="text-2xl text-blue-600 font-bold mb-4">
                        ₹ {singleBook.price}
                    </p>

                    <p className="text-gray-700 mb-6">
                        {singleBook.description}
                    </p>

                    <p className="mb-4">
                        <span className="font-semibold">Available Quantity:</span>{" "}
                        {singleBook.quantity}
                    </p>

                    {/* OWNER BUTTONS */}
                    {isOwner ? (
                        <div className="flex gap-4">
                            <button
                                onClick={() =>
                                    navigate(`/edit-book/${singleBook._id}`)
                                }
                                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <button
                                onClick={() => addToCart(singleBook)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={() => toggleFavorite(singleBook._id)}
                                className={`px-6 py-2 rounded-md transition ${favorited
                                    ? "bg-red-500 text-white"
                                    : "border border-red-500 text-red-500"
                                    }`}
                            >
                                {favorited ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Comments
                itemId={id}
                itemAuthorId={singleBook.seller?._id}
                model="Book"
            />

        </div>
    );
};

export default SingleBook;