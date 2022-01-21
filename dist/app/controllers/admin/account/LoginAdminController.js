"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAdminController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("../../../entities/User");
const LoginAdminController = async (req, res) => {
    try {
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        const user = await repo.findOne({
            where: { email: req.body.email, role: User_1.UserType.ADMIN },
        });
        if (user) {
            const password_valid = await bcrypt_1.default.compare(req.body.password, user.password);
            if (password_valid) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.SECRET_ADMIN, { expiresIn: "15d" });
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
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Error when trying to login" });
    }
};
exports.LoginAdminController = LoginAdminController;
