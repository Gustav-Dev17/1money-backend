import { getRepository } from "typeorm";
import { Users } from "../../../entities/User";
import { Request, Response } from "express";

const GetUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const repo = getRepository(Users);
    const user = await repo.findOne(id);
    return res.json({
      name: user.name,
      email: user.email,
      picture: user.key,
    });
  } catch {
    return res.status(500).json({ message: "Error " });
  }
};

export default GetUserController;
