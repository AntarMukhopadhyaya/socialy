import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const CommentSection = ({ postId }) => {
  const { getUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/comments/${postId}`
        );
        console.log(response.data);

        setComments(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchComments();
  }, [postId]);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:3000/api/comments/${postId}`,
        {
          text: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment("");
    } catch (error) {
      console.log(error.message);
    }
  };
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
              <div key={comment._id} className="d-flex mb-2 border rounded">
                <div className="m-2">
                  <strong>{comment.commentedBy.username}</strong>{" "}
                  <small className="text-muted">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </small>
                  <p className="mb-1">{comment.text}</p>
                </div>
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
