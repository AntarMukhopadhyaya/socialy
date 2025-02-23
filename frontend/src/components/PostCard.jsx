import React, { useState } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaShareAlt,
  FaPenNib,
  FaTrash,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns"; // For social icons
import useAuth from "../hooks/useAuth";
import axios from "axios";
import CommentSection from "./CommentSection";
const PostCard = ({ id, postedBy, date, content,likesCount}) => {
  const { getUser } = useAuth();
  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/posts/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.message === "Post deleted successfully") {
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
      return;
    }
  };
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(likesCount);
  const [likedByUser, setLikedByUser] = useState(false)
  const likePost = async (id) => {
    console.log("Hello World");
    
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/like/${id}`,
    
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLikes(response.data.likesCount);
      setLikedByUser(response.data.hasLiked);

      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <strong>{postedBy.username}</strong>{" "}
            <small>
              {formatDistanceToNow(new Date(date), { addSuffix: true })}
            </small>
          </div>
          {getUser().id === postedBy._id && (
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
                    onClick={() => deletePost(id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <p>{content}</p>
        <div className="d-flex justify-content-start">
          <button className="btn btn-link btn-sm" onClick={() => likePost(id)}>
            
            <FaThumbsUp color={likedByUser ? "blue" : "black"}  /> {likes}
          </button>
          <button className="btn btn-link btn-sm" onClick={() => setShowComments(!showComments)}>
            <FaComment /> Comment
          </button>
          <button className="btn btn-link btn-sm">
            <FaShareAlt /> Share
          </button>{" "}
        </div>
        {showComments && <CommentSection postId={id} />}
      </div>
    </div>
  );
};

export default PostCard;
