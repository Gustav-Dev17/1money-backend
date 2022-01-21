"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../../../entities/User");
const GetAdminController = async (req, res) => {
    try {
        const { id } = req;
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        const user = await repo.findOne(id);
        return res.json({
            name: user.name,
            email: user.email,
            picture: user.picture,
        });
    }
    catch {
        return res.status(500).json({ message: "Error " });
    }
};
exports.default = GetAdminController;
