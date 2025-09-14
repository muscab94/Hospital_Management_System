import jwt from "jsonwebtoken";

// Middleware: verify JWT token
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) return res.status(401).json({ msg: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token,"my#secret");
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token", error: err.message });
  }
};

// Middleware: check role (Authorization)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "You are not allowed to access this resource" });
    }
    next();
  };
};
