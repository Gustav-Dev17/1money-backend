"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminProfileController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../../../entities/User");
const uploadPhotoProfile_1 = require("../../../../utils/uploadPhotoProfile");
const UpdateAdminProfileController = async (req, res) => {
    try {
        const { id } = req;
        const repo = (0, typeorm_1.getRepository)(User_1.Users);
        const photo = req.file;
        const user = await repo.findOne(id);
        if (!user) {
            return res.status(404).json({ message: "Admin not found" });
        }
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        const { buffer } = photo;
        if (photo) {
            const key = user.key ? user.key : "key-aleatorio";
            await (0, uploadPhotoProfile_1.deletePhoto)(key);
        }
        const file = await (0, uploadPhotoProfile_1.uploadPhotoProfile)(buffer, photo);
        user.picture = photo ? file.Location : user.picture;
        user.key = photo ? file.Key : user.key;
        await repo.save(user);
        return res.json({ profile: user.picture });
    }
    catch {
        return res.status(500).json({ message: "Error" });
    }
};
exports.UpdateAdminProfileController = UpdateAdminProfileController;
