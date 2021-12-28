import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Users } from "../../entities/User";
import { getRepository } from "typeorm";
require("dotenv").config();

const LoginUserController = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Users);
    const user = await repo.findOne({ email: req.body.email });
    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        const token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          process.env.SECRET
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
  } catch {
    return res.status(500).json({ message: "Error login" });
  }
};

export default LoginUserController;
