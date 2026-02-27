import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../Context/OrderContext";

const PurchasedBooks = () => {
  const { orders, fetchUserOrders, loading } = useOrder();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?._id) {
      fetchUserOrders(user._id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500 mt-2">
            Here are all the books you’ve purchased
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Empty */}
        {!loading && orders.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Orders Yet
            </h2>
            <p className="text-gray-500 mt-2">
              Your purchased books will appear here.
            </p>
          </div>
        )}

        {/* Orders */}
        <div className="space-y-10">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-8"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p className="font-semibold text-gray-800">
                    {order._id}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                    {order.status}
                  </span>
                  <p className="text-xl font-bold text-gray-900 mt-2">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Books List */}
              <div className="space-y-6">
                {order.books.map((item) => (
                  <div
                    key={item.book._id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 rounded-xl hover:shadow-md transition bg-gray-50"
                  >
                    {/* LEFT - Image */}
                    <div className="w-full md:w-40 flex-shrink-0">
                      <img
                        src={item.book.image}
                        alt={item.book.title}
                        className="w-full h-48 md:h-40 object-cover rounded-lg"
                      />
                    </div>

                    {/* RIGHT - Details */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {item.book.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        by {item.book.author}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
                        <p>
                          <span className="font-medium text-gray-800">
                            Quantity:
                          </span>{" "}
                          {item.quantity}
                        </p>

                        <p>
                          <span className="font-medium text-gray-800">
                            Price:
                          </span>{" "}
                          ₹{item.price}
                        </p>

                        <p>
                          <span className="font-medium text-gray-800">
                            Subtotal:
                          </span>{" "}
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div>
                      <button
                        onClick={() =>
                          navigate(`/single-book/${item.book._id}`)
                        }
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PurchasedBooks;