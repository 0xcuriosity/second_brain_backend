import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { object } from "zod";
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

interface AuthenticatedRequest extends Request {
  userId?: string;
}
export const userAuthMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.token;
  try {
    if (!accessToken || typeof accessToken !== "string") {
      throw new Error("unauthorized");
    }
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    if (typeof decoded === "object" && "id" in decoded) {
      req.userId = decoded.id as string;
    } else {
      throw new Error("invalid token payload");
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "you are not signed in",
      error,
    });
  }
};
