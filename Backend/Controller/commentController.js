import mongoose from "mongoose";
import Comment from "../Models/commentModel.js";
import blogModel from "../Models/blogModel.js";
import Book from "../Models/bookModel.js";

/* =====================================================
   ADD COMMENT
===================================================== */
export const addComment = async (req, res) => {
  try {
    const { itemId, model, text } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login to comment.",
      });
    }

    if (!["Blog", "Book"].includes(model)) {
      return res.status(400).json({
        success: false,
        message: "Invalid model type.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty.",
      });
    }

    // Check if Blog or Book exists
    const Model = model === "Blog" ? blogModel : Book;
    const itemExists = await Model.findById(itemId);

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: `${model} not found.`,
      });
    }

    const comment = await Comment.create({
      item: itemId,
      onModel: model,
      user: req.user._id,
      text: text.trim(),
    });

    const populatedComment = await comment.populate("user", "name");

    res.status(201).json({
      success: true,
      comment: populatedComment,
    });

  } catch (error) {
    console.error("Add Comment Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


/* =====================================================
   GET COMMENTS
===================================================== */
export const getComments = async (req, res) => {
  try {
    const { itemId, model } = req.params;

    if (!["Blog", "Book"].includes(model)) {
      return res.status(400).json({
        success: false,
        message: "Invalid model type.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const comments = await Comment.find({
      item: itemId,
      onModel: model,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      comments,
    });

  } catch (error) {
    console.error("Get Comments Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


/* =====================================================
   DELETE COMMENT
===================================================== */
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID.",
      });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    // Find related Blog or Book
    const Model = comment.onModel === "Blog" ? blogModel : Book;
    const item = await Model.findById(comment.item);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${comment.onModel} not found.`,
      });
    }

    const userId = req.user._id.toString();

    const isCommentOwner =
      comment.user.toString() === userId;

    let isItemOwner = false;

    if (comment.onModel === "Blog") {
      isItemOwner =
        item.author?.toString() === userId;
    }

    if (comment.onModel === "Book") {
      isItemOwner =
        item.seller?.toString() === userId;
    }

    if (!isCommentOwner && !isItemOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment.",
      });
    }

    await comment.deleteOne();

    res.json({
      success: true,
      message: "Comment deleted successfully.",
    });

  } catch (error) {
    console.error("Delete Comment Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


/* =====================================================
   EDIT COMMENT
===================================================== */
export const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID.",
      });
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own comment.",
      });
    }

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty.",
      });
    }

    comment.text = text.trim();
    await comment.save();

    const populatedComment = await comment.populate("user", "name");

    res.json({
      success: true,
      message: "Comment updated successfully.",
      comment: populatedComment,
    });

  } catch (error) {
    console.error("Edit Comment Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};