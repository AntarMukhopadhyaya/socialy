import Comment from "../models/Comment.js";
import Notification from "../models/Notification.js";
import Post from "../models/Post.js";
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;
  if (!text)
    return res.status(400).json({ message: "Comment text is required" });
  try {
    
    const comment = new Comment({ text, commentedBy: userId, post: postId });
    await comment.save();
    const post = await  Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    const postOwner = post.postedBy;
    const populatedComment = await Comment.findById(comment._id).populate("commentedBy", "username profileImage");
    const notification = new Notification({
      userId: postOwner,
      message: "Your post was commented on by the user " + req.user.username,
    });
    await notification.save();
    const io = req.app.get("io");
    io.to(postOwner).emit("notification", {
      message: `Your post was commented on by user ${req.user.username}`,
      postId,
    });
    res.status(201).json(populatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ post: postId }).populate(
      "commentedBy",
      "username profileImage"
    );
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateComment = async(req,res) => {
  const {commentId} = req.params;
  const {text} = req.body;
  if(!text)
    return res.status(400).json({message: "Comment text is required"});
  try {
    const comment = await Comment.findByIdAndUpdate(commentId, {text}, {new: true}).populate("commentedBy", "username profileImage");
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Server error"});
  }

}