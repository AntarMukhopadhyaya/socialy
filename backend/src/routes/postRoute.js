import express from "express";

import { createPost, getPosts,deletePost,likePost,updatePost,rewritePost} from "../controllers/postController.js";
import authMiddleware from "../middlewares/auth.js";
import upload from "../config/multer.js";


const postRouter = express.Router();

postRouter.post("/create",authMiddleware, upload.single("image"), createPost);
postRouter.delete("/delete/:id",authMiddleware, deletePost);
postRouter.get("/",authMiddleware,getPosts);
postRouter.get("/like/:postId",authMiddleware,likePost);
postRouter.put("/edit/:id",authMiddleware,updatePost);
postRouter.post("/rewrite",authMiddleware,rewritePost);
export default postRouter;