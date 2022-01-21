"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../../../entities/User");
const DeleteUserController = async (req, res) => {
    try {
        const { id } = req;
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        const user = await repo.findOne(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await repo.delete(id);
        return res.status(200).json({ message: "User account deleted!" });
    }
    catch {
        return res.status(500).json({ message: "Error when deleting account" });
    }
};
exports.default = DeleteUserController;
