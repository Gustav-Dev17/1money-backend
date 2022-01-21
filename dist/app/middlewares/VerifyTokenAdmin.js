"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAdmin = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const secret = process.env.SECRET_ADMIN;
const verifyTokenAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.json({ message: "Token not found" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (await (0, jsonwebtoken_1.verify)(token, secret));
        const { id } = decoded;
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        const user = await repo.findOne(id);
        if (user.role != User_1.UserType.ADMIN) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return next();
    }
    catch {
        return res.status(400).json({ message: "Invalid Token" });
    }
};
exports.verifyTokenAdmin = verifyTokenAdmin;
