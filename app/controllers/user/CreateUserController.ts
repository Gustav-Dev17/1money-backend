import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Users } from "../../entities/User";


export const CreateUserController = async (req: Request, res: Response) => {
  try {
    const { email, name, password, picture } = req.body;
    console.log(name)
    const repo = getRepository(Users);
    if (await repo.findOne({ email })) {
      return res.status(409).json({ message: "Email already exists!" });
    }
    const user = repo.create({
      name,
      email,
      password,
      picture,
      usertype: "U",
    });
    await repo.save(user);
    return res
      .status(201)
      .json({ id: user.id, name: user.name, email: user.email });
  } catch {
    return res.status(409).json({ message: "Error creating account!" });
  }
};
