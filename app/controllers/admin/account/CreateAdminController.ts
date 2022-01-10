import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Users, UserType } from "../../../entities/User";

export const CreateAdminController = async (req: Request, res: Response) => {
  try {
    const { email, name, password, picture } = req.body;
    const repo = getRepository(Users);
    if (await repo.findOne({ email })) {
      return res.status(409).json({ message: "Email already exists!" });
    }
    const user = repo.create({
      name,
      email,
      password,
      picture,
      role: UserType.ADMIN,
    });
    await repo.save(user);
    return res
      .status(201)
      .json({ id: user.id, name: user.name, email: user.email });
  } catch (e) {
    console.log(e);
    return res.status(409).json({ message: "Error when creating admin account!" });
  }
};
