import express from 'express';
import { login, register, profile,updateProfile} from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';
import upload from '../config/multer.js';
const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/profile",authMiddleware,profile);
userRouter.put("/profile/update",authMiddleware,upload.fields([
    {name:'profileImage',maxCount:1},
    {name:'coverImage',maxCount:1}
]),updateProfile);
export default userRouter;

