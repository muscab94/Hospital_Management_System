import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import { JWT_SECRET } from "../config/jwt.js";

dotenv.config();

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  // Check for token in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("🟢 Token from header:", token);
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
  console.log("Verifying token with secret:", JWT_SECRET);
  console.log();
  console.log("JWT_SECRET in middleware:", JWT_SECRET);
  console.log("Raw token:", token);
  console.log("Decoded (without verify):", jwt.decode(token));

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("🟡 Decoded JWT:", decoded);

    // Get user from database
    req.user = await User.findById(decoded.id).select("-password");
    console.log("🔵 User from DB:", req.user);
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "No user found with this token",
      });
    }

    // Check if user is active
    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User account is deactivated",
      });
    }

    next();
  } catch (error) {
    console.error("🔴 JWT Verify Error:", error.message);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
// export const protect = async (req, res, next) => {
//   try {
//     // Get token from header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Not authorized, no token" });
//     }

//     const token = authHeader.split(" ")[1];

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find user
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     if (!user.isActive) {
//       return res.status(401).json({ message: "User account is deactivated" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
// Grant access to specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};
