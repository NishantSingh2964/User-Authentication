import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  },
  { timestamps: true }
);

const blogModel = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default blogModel;
