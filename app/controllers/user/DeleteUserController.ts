import { getRepository } from "typeorm";
import { Users } from "../../entities/User";
import { Request, Response } from "express";

const DeleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const repo = getRepository(Users);
    const user = await repo.findOne(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await repo.delete(id);
    return res.status(200).json({ message: "User account deleted!" });
  } catch {
    return res.status(500).json({ message: "Error delete account" });
  }
};

export default DeleteUserController;
