"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../../entities/User");
const CreateAdminController = async (req, res) => {
    try {
        const { email, name, password, picture } = req.body;
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        if (await repo.findOne({ email })) {
            return res.status(409).json({ message: "Email already exists!" });
        }
        const user = repo.create({
            name,
            email,
            password,
            picture,
            role: User_1.UserType.ADMIN,
        });
        await repo.save(user);
        return res
            .status(201)
            .json({ id: user.id, name: user.name, email: user.email });
    }
    catch (e) {
        console.log(e);
        return res.status(409).json({ message: "Error when creating admin account!" });
    }
};
exports.CreateAdminController = CreateAdminController;
