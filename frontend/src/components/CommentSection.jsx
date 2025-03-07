/* eslint-disable react/prop-types */
import axios from "axios";
import { FaEdit, FaPaperPlane, FaTrash } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  fetchComments,
  postComment,
  updateComment,
} from "../reducers/commentReducer";
import useAuth from "../hooks/useAuth";

const CommentSection = ({ postId }) => {
  const { comments, loading } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const { getUser } = useAuth();
  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [postId, dispatch]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    console.log(postId, newComment);
    dispatch(postComment({ postId, text: newComment }));
    setNewComment("");
  };
  const handleEditComment = (commentId, text) => {
    console.log(commentId, text);
    
    setEditCommentId(commentId);
    setEditText(text);
  };
  const handleUpdateComment = () => {
    dispatch(updateComment({ commentId: editCommentId, text: editText }));
    setEditText("");
    setEditCommentId(null);
  };

  if (loading || !comments) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mt-3">
      <h6 className="text-muted">Comments</h6>
      <form onSubmit={handleCommentSubmit} className="d-flex mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="btn btn-primary ms-2" type="submit">
          <FaPaperPlane />
        </button>
      </form>
      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <div key={comment._id} className="d-flex mb-2 border rounded p-2">
                <img
                  src={`http://localhost:3000/uploads/${comment.commentedBy.profileImage}`}
                  alt="avatar"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <strong>{comment.commentedBy.username}</strong>{" "}
                  <small className="text-muted">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </small>
                  {editCommentId === comment._id ? (
                    <div className="form-group m-2">
                      <input
                        type="text"
                        className="form-control"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-outline-success mt-1 me-1"
                        onClick={handleUpdateComment}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger mt-1"
                        onClick={() => setEditCommentId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="mb-1">{comment.text}</p>
                  )}
                </div>
                {getUser().id === comment.commentedBy._id && (
                  <div>
                    <button className="btn btn-sm btn-warning me-1" onClick={() => handleEditComment(comment._id,comment.text)}>
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => dispatch(deleteComment(comment._id))}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-muted">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};
export default CommentSection;
