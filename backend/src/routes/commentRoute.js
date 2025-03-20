import { Router } from "express";

import { getComments,addComment, deleteComment,updateComment } from "../controllers/commentController.js";
import authMiddleware from "../middlewares/auth.js";

const commentRouter = Router();

commentRouter.get("/:postId",getComments);
commentRouter.post("/:postId",authMiddleware,addComment);
commentRouter.delete("/delete/:commentId",authMiddleware,deleteComment);
commentRouter.put("/update/:commentId",authMiddleware,updateComment);

export default commentRouter;