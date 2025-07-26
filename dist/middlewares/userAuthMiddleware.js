"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
const userAuthMiddleware = (req, res, next) => {
    const accessToken = req.headers.token;
    try {
        if (!accessToken || typeof accessToken !== "string") {
            throw new Error("unauthorized");
        }
        const decoded = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
        if (typeof decoded === "object" && "id" in decoded) {
            req.userId = decoded.id;
        }
        else {
            throw new Error("invalid token payload");
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "you are not signed in",
            error,
        });
    }
};
exports.userAuthMiddleware = userAuthMiddleware;
