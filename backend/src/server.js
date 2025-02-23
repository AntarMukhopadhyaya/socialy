import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import morgan from "morgan";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // For logging into the terminal
// Connecting to MongoDB

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.err(err);
  });
app.use("/api/users", userRouter);
app.use("/api/posts",postRouter);
app.use("/api/comments",commentRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
