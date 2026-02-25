import React, { useContext, useEffect, useState } from "react";
import { useComment } from "../Context/CommentContext";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Comments = ({ itemId, itemAuthorId, model }) => {
  const {
    comments,
    fetchComments,
    addComment,
    deleteComment,
    editComment,
    loading,
  } = useComment();

  const { user } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  /* =========================
     FETCH COMMENTS
  ========================== */
  useEffect(() => {
    if (itemId && model) {
      fetchComments(itemId, model);
    }
  }, [itemId, model]);

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

    setActionLoading(true);

    const res = await addComment(itemId, model, text);

    if (res?.success) {
      setText("");
    }

    setActionLoading(false);
  };

  /* =========================
     DELETE COMMENT
  ========================== */
  const handleDelete = async (commentId) => {
    setActionLoading(true);
    await deleteComment(commentId);
    setActionLoading(false);
  };

  /* =========================
     EDIT COMMENT
  ========================== */
  const handleEdit = async (commentId) => {
    if (!editText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setActionLoading(true);

    const res = await editComment(commentId, editText);

    if (res?.success) {
      setEditingId(null);
    }

    setActionLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-10 text-blue-600">
        Comments ({comments.length})
      </h2>

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

            const isItemOwner =
              user?._id === itemAuthorId;

            return (
              <div
                key={comment._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="font-semibold text-gray-800 text-lg">
                    {comment.user?.name || "Anonymous"}
                  </p>

                  <div className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </div>
                </div>

                {editingId === comment._id ? (
                  <>
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
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
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
                  </>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {comment.text}
                  </p>
                )}

                {(isCommentOwner || isItemOwner) && (
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
                      className="text-red-600 hover:underline"
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
            disabled={!user}
            placeholder={
              user
                ? "Write your thoughts..."
                : "Login to write a comment..."
            }
            className="w-full border rounded-xl p-4 resize-none disabled:bg-gray-100"
            rows="4"
          />

          <button
            type="submit"
            disabled={actionLoading || !user}
            className="mt-4 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            {actionLoading ? "Posting..." : "Post Comment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;