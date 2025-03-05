import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import { searchUsersAndPosts } from "../controllers/searchController.js";

const searchRouter = Router();

searchRouter.get("",authMiddleware,searchUsersAndPosts);

export default searchRouter;