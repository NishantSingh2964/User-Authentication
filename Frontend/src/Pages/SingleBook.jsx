import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBook } from "../Context/BookContext";
import { AuthContext } from "../Context/AuthContext";
import { useOrder } from "../Context/OrderContext";
import { useFavorite } from "../Context/favouriteContext";
import toast from "react-hot-toast";
import Comments from "../Components/Comments";

const SingleBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const {
        singleBook,
        fetchSingleBook,
        deleteBook,
        loading,
    } = useBook();

    const { orders, fetchUserOrders } = useOrder();
    const { toggleFavorite, isFavorited } = useFavorite();

    // Fetch book
    useEffect(() => {
        fetchSingleBook(id);
    }, [id]);

    // Fetch user orders (to check already purchased)
    useEffect(() => {
        if (user?._id) {
            fetchUserOrders(user._id);
        }
    }, [user]);

    if (loading)
        return <p className="text-center mt-20">Loading...</p>;

    if (!singleBook)
        return <p className="text-center mt-20">Book not found</p>;

    // Check if owner
    const isOwner =
        user && singleBook?.seller?._id === user?._id;

    // Check if already purchased
    const alreadyPurchased = orders?.some((order) =>
        order.books?.some(
            (item) => item.book?._id === singleBook._id
        )
    );

    const favorited = isFavorited(singleBook._id);

    const handleDelete = async () => {
        await deleteBook(singleBook._id);
        toast.success("Book deleted");
        navigate("/books");
    };

    return (
        <div className="max-w-6xl mx-auto mt-24 px-6">
            <div className="grid md:grid-cols-2 gap-10">

                {/* Book Image */}
                <div>
                    <img
                        src={singleBook.image}
                        alt={singleBook.title}
                        className="w-full h-[450px] object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Book Details */}
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

                    {/* Stock Badge */}
                    <div className="mb-6">
                        {singleBook.quantity === 0 ? (
                            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-red-100 text-red-600">
                                Out of Stock
                            </span>
                        ) : singleBook.quantity <= 5 ? (
                            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-orange-100 text-orange-600">
                                Only {singleBook.quantity} Left
                            </span>
                        ) : (
                            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-600">
                                In Stock 
                            </span>
                        )}
                    </div>

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

                            {/* OUT OF STOCK */}
                            {singleBook.quantity === 0 ? (
                                <button
                                    disabled
                                    className="bg-gray-400 text-white px-6 py-2 rounded-md cursor-not-allowed"
                                >
                                    Out of Stock
                                </button>
                            ) : alreadyPurchased ? (
                                /* ALREADY PURCHASED */
                                <button
                                    disabled
                                    className="bg-green-500 text-white px-6 py-2 rounded-md cursor-not-allowed"
                                >
                                    Already Purchased
                                </button>
                            ) : (
                                /* BUY NOW */
                                <button
                                    onClick={() =>
                                        navigate("/payment", {
                                            state: { book: singleBook },
                                        })
                                    }
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                                >
                                    Buy Now
                                </button>
                            )}

                            {/* FAVORITE BUTTON */}
                            <button
                                onClick={() =>
                                    toggleFavorite(singleBook._id)
                                }
                                className={`px-6 py-2 rounded-md transition ${favorited
                                        ? "bg-red-500 text-white"
                                        : "border border-red-500 text-red-500"
                                    }`}
                            >
                                {favorited
                                    ? "❤️ Remove Favorite"
                                    : "🤍 Add to Favorites"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Comments Section */}
            <Comments
                itemId={id}
                itemAuthorId={singleBook.seller?._id}
                model="Book"
            />
        </div>
    );
};

export default SingleBook;