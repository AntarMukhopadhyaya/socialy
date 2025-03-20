import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Follower from "../models/Follower.js";
import Post from "../models/Post.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered succesfully" });
  } catch (err) {
    res.status(500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Getting the user from database
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // checking if the user exists if exists then is the password correct
      return res.json({ message: "Invalid Credentials" }); // If not then return invalid credentials error
    }
    // If the user exists and the password is correct then create a token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        profileImage: user.profileImage || " ",
        coverImage: user.coverImage || " ",
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    // return the json web token
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const verify = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const profile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user and populate "following" with only necessary fields
    const user = await User.findById(userId)
      .select("-password")
      .populate("following", "_id username profileImage");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch posts with necessary fields and populate related data
    const posts = await Post.find({ postedBy: userId })
      .populate("postedBy", "username profileImage")
      .populate("comments.commentedBy", "username")
      .populate("likes");

    // Transform posts to include likesCount and hasLiked
    const postsWithLikes = posts.map((post) => ({
      ...post.toObject(),
      likesCount: post.likes.length,
      hasLiked: req.user
        ? post.likes.some((like) => like.userId.toString() === req.user.id)
        : false,
    }));

    // Fix: Correct isFollowing logic
    const isFollowing = req.user
      ? user.following.some((followedUser) => followedUser._id.toString() === req.user.id)
      : false;

    res.status(200).json({
      ...user.toObject(),
      posts: postsWithLikes,
      isFollowing,
      isMe: req.user ? req.user.id === userId : false,
    });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    if (req.files && req.files.profileImage) {
      user.profileImage = req.files.profileImage[0].filename;
    }
    if (req.files && req.files.coverImage) {
      user.coverImage = req.files.coverImage[0].filename;
    }
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUser = req.user.id;
    if (userId === currentUser) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
    const existingFollow = await Follower.findOne({
      followerId: currentUser,
      followingId: userId,
    });
    if (existingFollow) {
      await Follower.findOneAndDelete({
        followerId: currentUser,
        followingId: userId,
      });
      await User.findByIdAndUpdate(currentUser, {
        $pull: { following: userId },
      });
      console.log("User unfollowed successfully");

      return res.status(200).json({
        message: "User unfollowed successfully",
      });
    } else {
      await Follower.create({
        followerId: currentUser,
        followingId: userId,
      });
      await User.findByIdAndUpdate(currentUser, {
        $push: { following: userId },
      });
      console.log("User followed successfully");
      return res.status(201).json({
        message: "User followed successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
