import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Users } from "../../entities/User";
import bcrypt from "bcrypt";

export const CreateAdminController = async (req: Request, res: Response) => {
  try {
    const { email, name, password, picture } = req.body;
    const repo = getRepository(Users);
    if (await repo.findOne({ email })) {
      return res.status(409).json({ message: "Email already exists!" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = repo.create({
      name,
      email,
      password: hashPassword,
      picture,
      usertype: "A",
    });
    await repo.save(user);
    return res
      .status(201)
      .json({ id: user.id, name: user.name, email: user.email });
  } catch {
    return res.status(409).json({ message: "Error creating account!" });
  }
};
