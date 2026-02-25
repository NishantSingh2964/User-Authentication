import Order from "../Models/orderModel.js";
import Book from "../Models/bookModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { books } = req.body; 

    if (!books || books.length === 0) {
      return res.status(400).json({ message: "No books selected" });
    }

    let totalAmount = 0;
    const orderBooks = [];

    for (const item of books) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res.status(404).json({ message: `Book not found: ${item.bookId}` });
      }

      if (book.quantity < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough quantity for ${book.title}` });
      }

      // Reduce quantity
      book.quantity -= item.quantity;
      await book.save();

      orderBooks.push({
        book: book._id,
        quantity: item.quantity,
        price: book.price,
      });

      totalAmount += book.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      buyer: req.user._id,
      books: orderBooks,
      totalAmount,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("Place Order Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.userId }).populate(
      "books.book",
      "title author image"
    );

    return res.json(orders);
  } catch (error) {
    console.error("Get User Orders Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};