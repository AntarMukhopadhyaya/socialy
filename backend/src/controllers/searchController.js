import User from "../models/User.js";
import Post from "../models/Post.js";

export const searchUsersAndPosts = async (req, res) => {
    try {
      const { query } = req.query; // Get search query from request
  
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
  
      // Search for users (match username, email, bio)
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: "i" } }, // Case-insensitive match
          { email: { $regex: query, $options: "i" } },
          { bio: { $regex: query, $options: "i" } },
        ],
      }).select("-password"); // Exclude password from response
  
      // Search for posts (match content)
      const posts = await Post.find({
        content: { $regex: query, $options: "i" },
      }).populate("postedBy", "username profileImage"); // Populate user details
  
      res.json({ users, posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error while searching" });
    }
  };
  