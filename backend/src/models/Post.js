import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  image: { type: String, required: false },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User",default:[] }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment",default:[] }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model("Post", postSchema);
