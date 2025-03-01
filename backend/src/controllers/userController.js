import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      { id: user._id, username: user.username, profileImage: user.profileImage || ' ', coverImage: user.coverImage || ' ' },
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
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfile = async (req,res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    if(req.files && req.files.profileImage){
      user.profileImage = req.files.profileImage[0].filename;
    }
    if(req.files && req.files.coverImage){
      user.coverImage = req.files.coverImage[0].filename;
    }
    await user.save();  
    res.status(201).json(user);

  }catch(err){
    res.status(500).json({message:"Server error"});
  }
}