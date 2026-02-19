import blogModel from "../Models/blogModel.js";
import cloudinary from "../config/cloudinary.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        let imageUrl = "";

        if (req.file) {
            const result = await cloudinary.uploader.upload(
                req.file.path,
                { folder: "blogs" }
            );
            imageUrl = result.secure_url;
        }

        const blog = await blogModel.create({
            title,
            content,
            category,
            image: imageUrl,
            author: req.user._id,
        });

        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



export const getAllBlogs = async (req, res) => {
    try {
        const { category, search } = req.query;

        let filter = {
            isPublished: true, // always only published blogs
        };

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Search by title or content
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
            ];
        }

        const blogs = await blogModel
            .find(filter)
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: blogs.length,
            blogs,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getSingleBlog = async (req, res) => {
    try {
        const blog = await blogModel
            .findById(req.params.id)
            .populate("author", "name email");

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const updateBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        // Only author can edit
        if (blog.author.toString() !== req.user.id) {
            return res.json({ success: false, message: "Not authorized" });
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        res.json({ success: true, message: "Blog updated", blog: updatedBlog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.json({ success: false, message: "Not authorized" });
        }

        await blog.deleteOne();

        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getMyBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({ author: req.user.id })
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            blogs,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const toggleLike = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    const userId = req.user.id;

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();

    res.json({
      success: true,
      likesCount: blog.likes.length,
      liked: !alreadyLiked,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


