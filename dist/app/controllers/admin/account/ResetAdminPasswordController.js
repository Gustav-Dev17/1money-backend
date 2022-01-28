"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../entities/User");
const typeorm_1 = require("typeorm");
const passwordReset_1 = require("../../../../utils/passwordReset");
const ResetAdminPasswordController = async (req, res) => {
    try {
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        const user = await repo.findOne({ email: req.body.email });
        const newPassword = Math.random().toString(36).slice(-10);
        if (!user) {
            return res.status(404).json({ message: "There is no admin account with such email address" });
        }
        user.password = newPassword ? newPassword : user.password;
        (0, passwordReset_1.resetPassword)(user.email, newPassword);
        await repo.save(user);
        return res.status(200).json({ message: "Your admin account password has been changed!" });
    }
    catch {
        return res.status(500).json({ message: "Error" });
    }
};
exports.default = ResetAdminPasswordController;
