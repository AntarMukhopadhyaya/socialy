import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
export const createPost = async (req, res) => {
  const { content, postedBy, image } = req.body;
  try {
    const post = new Post({ content, postedBy, image });
    await post.save();
    const populatedPost = await Post.findById(post._id).populate(
      "postedBy",
      "username"
    );
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "username")
      .populate("comments.commentedBy", "username")
      .populate("likes", "username");
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const getPost = async (req, res) => {
  try {
    id = req.body;
    const post = await Post.findById(id)
      .populate("postedBy", "username")
      .populate("comments.commentedBy", "username")
      .populate("likes", "username");
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const likePost = async(req,res) => {
  try {
    const {postId} = req.params;
    const userId = req.user.id;
    const post = await Post.findById(postId);
    if(!post) return res.status(404).json({message:"Post not found"});
    const hasLiked = post.likes.includes(userId);
    if(hasLiked){
      await Post.findByIdAndUpdate(postId,{$pull:{likes:userId}});
      return res.status(200).json({
        likesCount:post.likes.length-1,
        hasLiked:false,
      });
    }else {
      await Post.findByIdAndUpdate(postId,{$addToSet:{likes:userId}}); // We are using addtoSet to remove duplicate likes instead of push
      return res.status(200).json({
        likesCount:post.likes.length+1,
        hasLiked:true,
      });
    }

  }catch(error){
    console.error(error);
    res.status(500).json({message:"Server error"});
  }
}
