import { getRepository } from "typeorm";
import { Users } from "../../entities/User";
import { Request, Response } from "express";
import {
  deletePhoto,
  uploadPhotoProfile,
} from "../../../utils/uploadPhotoProfile";

export const UpdateProfileController = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const repo = getRepository(Users);
    const photo = req.file;
    const user = await repo.findOne(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }
    const { buffer }: any = photo;
    if (photo) {
      const key = user.key ? user.key : "key-aleatorio";
      deletePhoto(key);
    }
    const file = await uploadPhotoProfile(buffer, photo);
    user.picture = photo ? file.Location : user.picture;
    user.key = photo ? file.Key : user.key;

    await repo.save(user);
    return res.json({ profile: user.picture });
  } catch {
    return res.status(500).json({ message: "Error" });
  }
};
