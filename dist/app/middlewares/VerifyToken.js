"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const secret = process.env.SECRET;
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({ message: "Token not found" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (await (0, jsonwebtoken_1.verify)(token, secret));
        req.id = decoded.id;
        return next();
    }
    catch {
        return res.status(400).json({ message: "Invalid Token" });
    }
};
exports.default = verifyToken;
