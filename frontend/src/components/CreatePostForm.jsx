
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import axios from "axios";
import Alert from "./Alert";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

const CreatePostForm = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuth();
  const [error, setError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (getUser() === null) {
      navigate("/login");
      return;
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
      setError("Failed to create post");
    } finally {
      setLoading(false);
      setPostContent("");
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setPostContent((prev) => prev + emojiObject.emoji);
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
          <div className="d-flex align-items-center mb-2">
            <BsEmojiSmile
              size={24}
              style={{ cursor: "pointer" }}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
          </div>
          <div className="position-relative">
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
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
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
