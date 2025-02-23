import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import Alert from "./Alert";
import EmojiPicker from "emoji-picker-react";
import {BsEmojiSmile} from "react-icons/bs";

const CreatePostForm = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuth();
  const [error, setError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const naviagte = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (getUser() === null) {
      naviagte("/login");
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts/create",
        {
          content: postContent,
          image: "http://placekitten.com/200/300",
          postedBy: {
            _id: getUser().id,
            username: getUser().username,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 201) {
        setError("Something went wrong");
        return;
      } else {
        onPostCreated(response.data);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
      setPostContent("");
    }
  };
  const handleEmojiClick = (emojiObject) => {
    setPostContent(prev => prev + emojiObject.emoji);
  }
  return (
    <div className="card mb-4">
      <div className="card-body">
        <Alert message={error} type="danger" onClose={() => setError("")} />
        <textarea
          className="form-control"
          rows="3"
          placeholder="Whats on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <div className="mt-2 d-flex align-items-center justify-content-end">
          <BsEmojiSmile  size={24} style={{cursor:"pointer"}} onClick={() => setShowEmojiPicker(!showEmojiPicker)}/>
        </div>
        {showEmojiPicker && (
          <div style={{position: 'relative'}}>
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={350}
            disableSkinTonePicker={true}
            disableSearchBar={true}
            pickerStyle={{ position: 'absolute', bottom: '50px', zIndex: 1000 }}
          />
          </div>
        )}
        <button
          className="btn btn-primary mt-3"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostForm;
