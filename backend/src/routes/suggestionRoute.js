import { getSuggestions } from "../controllers/suggestionController.js";
import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
const suggestionRouter = Router();

suggestionRouter.get("/",authMiddleware, getSuggestions);

export default suggestionRouter;