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
import { deletePost, likePost } from "../reducers/postReducer";
import useAuth from "../hooks/useAuth";

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  console.log(post);

  const { getUser } = useAuth();

  const dispatch = useDispatch();
  console.log(post.postedBy);
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
              <strong>{post.postedBy.username}</strong>{" "}
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
                  <button className="dropdown-item">
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
        <p>{post.content}</p>
        <div className="d-flex justify-content-start">
          <button
            className="btn btn-link btn-sm"
            onClick={() => dispatch(likePost(post._id))}
          >
            <FaThumbsUp color={post.hasLiked ? "blue" : "black"} />{" "}
            {post.likesCount}
          </button>
          <button
            className="btn btn-sm"
            onClick={() => setShowComments(!showComments)}
          >
            <FaComment color={showComments ? "blue" : "black"} />{" "}
            {post.comments.length}
          </button>
          <button className="btn btn-link btn-sm">
            <FaShareAlt /> Share
          </button>{" "}
        </div>
        {showComments && <CommentSection postId={post._id} />}
      </div>
    </div>
  );
};

export default PostCard;
