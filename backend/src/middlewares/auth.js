import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Check if the Authorization header is present
  const header = req.headers["authorization"];

  if (!header || !header.startsWith("Bearer ")) {
    // If the header is not present return an error
    return res.status(401).json({
      message: "Unauthorize: Token not provided",
    });
  }
  // Extract the token from the header
  const token = header.split(" ")[1];

  //Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorized: Invalid token" });
  }
};
export default authMiddleware;
