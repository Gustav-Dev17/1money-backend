import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { getRepository } from "typeorm";
import { Users, UserType } from "../../../entities/User";

export const LoginAdminController = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Users);
    const user = await repo.findOne({
      where: { email: req.body.email, role: UserType.ADMIN },
    });
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        const token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          process.env.SECRET_ADMIN,
          { expiresIn: "15d" }
        );
        return res.status(200).json({
          token: token,
          id: user.id,
          name: user.name,
          email: user.email,
        });
      } else {
        return res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      return res.status(404).json({ message: "Email not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error when trying to login" });
  }
};
