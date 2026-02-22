import Comment from "../Models/commentModel.js";
import blogModel from "../Models/blogModel.js";

export const addComment = async (req, res) => {
  try {
    const { blogId, text } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Please login to comment.",
      });
    }

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment cannot be empty.",
      });
    }

    const comment = await Comment.create({
      blog: blogId,
      user: req.user._id,
      text: text.trim(),
    });
    const populatedComment = await comment.populate("user", "name");

    res.status(201).json({
      success: true,
      comment: populatedComment,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    const comments = await Comment.find({ blog: blogId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      comments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    const blog = await blogModel.findById(comment.blog);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const isCommentOwner =
      comment.user.toString() === req.user._id.toString();

    const isBlogOwner =
      blog.author.toString() === req.user._id.toString();

    if (!isCommentOwner && !isBlogOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment",
      });
    }

    await comment.deleteOne();

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const editComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own comment",
      });
    }

    comment.text = text;
    await comment.save();

    res.json({
      success: true,
      message: "Comment updated successfully",
      comment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};