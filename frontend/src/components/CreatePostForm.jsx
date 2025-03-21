import useAuth from "../hooks/useAuth";

import Alert from "./Alert";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../reducers/postReducer";
import { FaImages, FaMagic } from "react-icons/fa";
import axios from "axios";

const CreatePostForm = () => {
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuth();
  const [error, setError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [AiLoading, setAiLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   let imageUrl = null;




  //   try {
  //     await dispatch(
  //       addPost({
  //         content: postContent,
  //         image: imageUrl || "http://placekitten.com/200/300",
  //         postedBy: {
  //           _id: getUser().id,
  //           username: getUser().username,
  //         },
  //       })
  //     ).unwrap();
  //     console.log("Post created successfully");
  //     setPostContent("");
  //     setImage(null);
  //     setPreview(null);
  //   } catch (err) {
  //     console.log(err.message);
  //     setError("Failed to create post");
  //   } finally {
  //     setLoading(false);
  //     setPostContent("");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("content", postContent);
    if (image) formData.append("image", image);
    formData.append("username", getUser().username);
    formData.append("userId", getUser().id);
   

    try {
      await dispatch(addPost(formData)).unwrap();
      console.log("Post created successfully");
      setPostContent("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.log(err.message);
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setPostContent((prev) => prev + emojiObject.emoji);
  };

  const rewritePostWithAI = async (content) => {
    if (!content.trim()) return content;
    setAiLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts/rewrite",
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPostContent(response.data.rewrittenContent);
    } catch (error) {
      console.error("Ai error", error);
      setError("Failed to rewrite post");
      return content;
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Create a Post</h5>
        <Alert message={error} type="danger" onClose={() => setError("")} />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex align-items-center mb-2 gap-2">
            <button className="btn btn-outline-primary" type="button">
              <BsEmojiSmile
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled={AiLoading}
              onClick={() => rewritePostWithAI(postContent)}
            >
              {AiLoading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <FaMagic style={{ cursor: "pointer" }} size={24} />
              )}
            </button>

            <label className="btn btn-outline-warning">
              <FaImages size={24} style={{ cursor: "pointer" }} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}

          {showEmojiPicker && (
            <div className="emoji-picker position-absolute" style={{ zIndex: 1000 }}>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                height={350}
                disableSkinTonePicker={true}
                disableSearchBar={true}
              />
            </div>
          )}

          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
