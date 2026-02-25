import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 0 },
    image: { type: String }, // Cloudinary URL
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;