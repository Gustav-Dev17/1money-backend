import { getRepository } from "typeorm";
import { Users } from "../../entities/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const UpdateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const repo = getRepository(Users);
    const { name, email, password, picture } = req.body;
    const userEmail = await repo.findOne({email: email});
    if (userEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repo.findOne(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? hashPassword : user.password;
    user.picture = picture ? picture : user.picture;

    await repo.save(user);
    return res.json({
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  } catch {
    return res.status(500).json({ message: "Error" });
  }
};

export default UpdateUserController;
