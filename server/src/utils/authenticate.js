import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const authenticate = (req, res, next) => {
  const token =
    req.cookies?.access_token || req.headers.authorization?.split(" ")[1];
  if (!token) return next(errorHandler("Unauthorized: No token provided", 401));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler("Invalid or expired token", 401));
    req.user = user;
    next();
  });
};
