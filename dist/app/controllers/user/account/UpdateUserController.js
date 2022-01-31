"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../../../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UpdateUserController = async (req, res) => {
    try {
        const { id } = req;
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        const { name, email, password } = req.body;
        const userEmail = await repo.findOne({ email: email });
        if (userEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const user = await repo.findOne(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashPassword = await bcrypt_1.default.hashSync(password, 10);
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.password = password ? hashPassword : user.password;
        await repo.save(user);
        return res.json({
            name: user.name,
            email: user.email,
            picture: user.picture,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Error" });
    }
};
exports.default = UpdateUserController;
