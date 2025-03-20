import Follower from "../models/Follower.js";
import User from "../models/User.js";

export const getSuggestions = async (req, res) => {
  try {
    const allUsers = await User.find({ _id: { $ne: req.user.id } });
    const following = await Follower.find({ followerId: req.user.id }).select(
      "followingId"
    );
    const followingIds = following.map((follow) =>
      follow.followingId.toString()
    );
    const suggestions = allUsers.filter(
      (user) => !followingIds.includes(user._id.toString())
    );
    res.status(200).json(
      suggestions.map((user) => ({
        id: user._id,
        username: user.username,
        profileImage: user.profileImage || "default.jpg",
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
