import { Router } from "express";
import { getNotifications, markAsRead,clearNotifications } from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/auth.js";

const notificationRouter = Router();
notificationRouter.get("/:userId", authMiddleware, getNotifications);
notificationRouter.put("/read/:notificationId", authMiddleware, markAsRead);
notificationRouter.delete("/clear", authMiddleware, clearNotifications);
export default notificationRouter;