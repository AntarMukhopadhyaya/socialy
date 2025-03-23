/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaShareAlt,
  FaPenNib,
  FaTrash,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import CommentSection from "./CommentSection";
import { useDispatch } from "react-redux";
import {
  deletePost,
  fetchPosts,
  likePost,
  updatePost,
} from "../reducers/postReducer";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const { getUser } = useAuth();
  const dispatch = useDispatch();
  const handlEdit = () => {
    setShowEditModal(true);
    setEditedContent(post.content);
  };
  const handleUpdate = () => {
    dispatch(
      updatePost({ postId: post._id, postData: { content: editedContent } })
    ).then(() => dispatch(fetchPosts()));
    setShowEditModal(false);
  };
  console.log(post)

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between ">
          <div className="d-flex justify-content-start align-items-center gap-2">
            <div className="">
              <img
                src={
                  "http://localhost:3000/uploads/" + post.postedBy.profileImage
                }
                alt="profile"
                className="rounded-circle"
                style={{ width: "30px", height: "30px", objectFit: "cover" }}
              />
            </div>
            <div>
              <Link
                to={`/profile/${post.postedBy._id}`}
                className="cursor-pointer "
                style={{ textDecoration: "none" }}
              >
                <strong>{post.postedBy.username}</strong>{" "}
              </Link>

              <small>
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </small>
            </div>
          </div>
          {getUser().id === post.postedBy._id && (
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <button className="dropdown-item" onClick={handlEdit}>
                    <FaPenNib /> Edit
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => dispatch(deletePost(post._id))}
                  >
                    <FaTrash /> Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        {post.image && (
          <div className="text-center mb-3">

            <img
              src={`http://localhost:3000/uploads/${post.image}`}
              alt="post image"
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        )}
        <p>{post.content}</p>
        <div className="d-flex justify-content-start">
          <button
            className="btn btn-link btn-md"
            onClick={() => dispatch(likePost(post._id))}
          >
            <FaThumbsUp color={post.hasLiked ? "blue" : "black"} />{" "}
            {post.likesCount}
          </button>
          <button
            className="btn btn-md"
            onClick={() => setShowComments(!showComments)}
          >
            <FaComment color={showComments ? "blue" : "black"} />{" "}
            {post.comments.length}
          </button>
          <button className="btn btn-link btn-md">
            <FaShareAlt /> Share
          </button>{" "}
        </div>
        {showComments && <CommentSection postId={post._id} comments={post.comments} />}
      </div>

      <div
        className={`modal fade ${showEditModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Post</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                rows="3"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default PostCard;
