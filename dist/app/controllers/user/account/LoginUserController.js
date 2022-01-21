"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../../entities/User");
const typeorm_1 = require("typeorm");
require("dotenv").config();
const LoginUserController = async (req, res) => {
    try {
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        const user = await repo.findOne({ email: req.body.email });
        if (user) {
            const password_valid = await bcrypt_1.default.compare(req.body.password, user.password);
            if (password_valid) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.SECRET, { expiresIn: "15d" });
                return res.status(200).json({
                    token: token,
                    id: user.id,
                    name: user.name,
                    email: user.email,
                });
            }
            else {
                return res.status(400).json({ message: "Incorrect password" });
            }
        }
        else {
            return res.status(404).json({ message: "Email not found" });
        }
    }
    catch {
        return res.status(500).json({ message: "Error when trying to login" });
    }
};
exports.default = LoginUserController;
