import express from "express";

import { createPost, getPosts,deletePost,likePost} from "../controllers/postController.js";
import authMiddleware from "../middlewares/auth.js";


const postRouter = express.Router();

postRouter.post("/create",authMiddleware, createPost);
postRouter.delete("/delete/:id",authMiddleware, deletePost);
postRouter.get("/",getPosts);
postRouter.get("/like/:postId",authMiddleware,likePost);

export default postRouter;