import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../Context/CommentContext";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Comments = ({ blogId, blogAuthorId }) => {
  const {
    comments,
    getComments,
    addComment,
    deleteComment,
    editComment,
    loading,
    actionLoading,
  } = useContext(CommentContext);

  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (blogId) {
      getComments(blogId);
    }
  }, [blogId]);

  /* =========================
     ADD COMMENT
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to comment");
      return;
    }

    if (!text.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const res = await addComment(blogId, text);

    if (res?.success) {
      toast.success("Comment added");
      setText("");
    } else {
      toast.error("Failed to add comment");
    }
  };

  /* =========================
     DELETE COMMENT
  ========================== */
  const handleDelete = async (commentId) => {
    const res = await deleteComment(commentId);

    if (res?.success) {
      toast.success("Comment deleted");
    } else {
      toast.error("Delete failed");
    }
  };

  /* =========================
     EDIT COMMENT
  ========================== */
  const handleEdit = async (commentId) => {
    if (!editText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const res = await editComment(commentId, editText);

    if (res?.success) {
      toast.success("Comment updated");
      setEditingId(null);
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-10 text-blue-600">
        Comments ({comments.length})
      </h2>

      {/* COMMENTS LIST */}
      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-xl text-center text-gray-500">
          No comments yet. Be the first to comment 👇
        </div>
      ) : (
        <div className="space-y-8 mb-12">
          {comments.map((comment) => {
            const isCommentOwner =
              user?._id === comment.user?._id;

            const isBlogOwner =
              user?._id === blogAuthorId;

            return (
              <div
                key={comment._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-gray-800 text-lg">
                      {comment.user?.name || "Anonymous"}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500 text-right whitespace-nowrap">
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* COMMENT TEXT OR EDIT FIELD */}
                {editingId === comment._id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full border rounded-lg p-3 mb-3"
                      rows="3"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(comment._id)}
                        disabled={actionLoading}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {comment.text}
                  </p>
                )}

                {/* ACTION BUTTONS */}
                {(isCommentOwner || isBlogOwner) && (
                  <div className="flex gap-4 mt-4 text-sm">
                    {isCommentOwner && (
                      <button
                        onClick={() => {
                          setEditingId(comment._id);
                          setEditText(comment.text);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(comment._id)}
                      disabled={actionLoading}
                      className="text-red-600 hover:underline disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ADD COMMENT */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Leave a Comment
        </h3>

        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              user
                ? "Write your thoughts..."
                : "Login to write a comment..."
            }
            disabled={!user}
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none disabled:bg-gray-100"
            rows="4"
          />

          <button
            type="submit"
            disabled={actionLoading || !user}
            className={`mt-4 px-6 py-3 rounded-xl font-medium transition-all
              ${
                actionLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
            `}
          >
            {actionLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;