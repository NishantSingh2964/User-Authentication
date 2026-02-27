import Book from "../Models/bookModel.js";

export const addBook = async (req, res) => {
  try {
    const { title, description, author, price, quantity } = req.body;
    const image = req.file?.path;

    // 🔐 1. Check if user is verified
    if (!req.user?.isAccountVerified) {
      return res.status(403).json({
        message: "Please verify your account before adding books",
      });
    }

    // 🔎 2. Validate required fields
    if (!title || !author || !price || !quantity || !image) {
      return res.status(400).json({
        message: "All fields including image are required",
      });
    }

    // 🔢 3. Convert & validate numbers
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: "Price must be a positive number",
      });
    }

    if (isNaN(parsedQuantity) || parsedQuantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be negative",
      });
    }

    // 📦 4. Create book
    const book = await Book.create({
      title: title.trim(),
      description: description?.trim() || "",
      author: author.trim(),
      price: parsedPrice,
      quantity: parsedQuantity,
      image,
      seller: req.user._id,
    });

    return res.status(201).json(book);

  } catch (error) {
    console.error("Add Book Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ quantity: { $gt: 0 } })
      .populate("seller", "name email");

    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("Get All Books Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.params.userId });
    return res.json(books);
  } catch (error) {
    console.error("Get User Books Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (req.file) {
      book.image = req.file.path;
    }
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.description = req.body.description || book.description;
    book.price = req.body.price || book.price;
    book.quantity = req.body.quantity || book.quantity;

    const updatedBook = await book.save();

    res.status(200).json({
      success: true,
      book: updatedBook,
    });
  } catch (error) {
    console.error("Update Book Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Book.deleteOne({ _id: book._id });
    return res.json({ message: "Book removed" });
  } catch (error) {
    console.error("Delete Book Error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error.message,
    });
  }
};