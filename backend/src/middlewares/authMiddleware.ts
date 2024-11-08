import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Check if the user is authenticated
  if (!req.user) {
    console.error("Attempted to access protected route without authentication");
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If the user is authenticated, continue to the next middleware
  next();
};
