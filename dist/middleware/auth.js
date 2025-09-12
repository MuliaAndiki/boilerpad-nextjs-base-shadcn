"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        // Ambil token dari Authorization header format: "Bearer <token>"
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            res.status(401).json({
                status: 401,
                message: "Access denied. No token provided.",
            });
            return;
        }
        // Validasi JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            res.status(500).json({
                status: 500,
                message: "Server configuration error.",
            });
            return;
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Simpan payload ke dalam req.user
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({
                status: 401,
                message: "Token has expired.",
            });
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(403).json({
                status: 403,
                message: "Invalid token.",
            });
        }
        else {
            console.error("JWT verification error:", error);
            res.status(500).json({
                status: 500,
                message: "Token verification failed.",
            });
        }
    }
};
exports.verifyToken = verifyToken;
