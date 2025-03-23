import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import morgan from "morgan";
import postRouter from "./routes/postRoute.js";
import commentRouter from "./routes/commentRoute.js";
import path from "path";
import searchRouter from "./routes/searchRoute.js";
import suggestionRouter from "./routes/suggestionRoute.js";
import http from "http";
import notificationRouter from "./routes/notificationRoute.js";
import { Server } from "socket.io";

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Connecting to MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

// Serving static files (images, etc.)
app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/search", searchRouter);
app.use("/api/suggestions", suggestionRouter);
app.use("/api/notifications", notificationRouter);

// Socket.io Setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
  },
});

// Handling Socket.io Connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("joinRoom", (userId) => {
    console.log(`User with ID ${userId} joined their room`);
    socket.join(userId); // Joining the room for the user
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Making Socket.io accessible to routes/controllers
app.set("io", io);

// Starting the server
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
