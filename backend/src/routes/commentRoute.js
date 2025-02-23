import { Router } from "express";

import { getComments,addComment, deleteComment } from "../controllers/commentController.js";
import authMiddleware from "../middlewares/auth.js";

const commentRouter = Router();

commentRouter.get("/:postId",getComments);
commentRouter.post("/:postId",authMiddleware,addComment);
commentRouter.delete("/:commentId",authMiddleware,deleteComment);


export default commentRouter;