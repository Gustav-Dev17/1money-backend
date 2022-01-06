import { verify } from "jsonwebtoken";
import { Users, UserType } from "../entities/User";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
const secret = process.env.SECRET_ADMIN;

interface IDecoded {
  id: string;
  email: string;
}

export const verifyTokenAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ message: "Token not found" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = (await verify(token, secret)) as IDecoded;
    const { id } = decoded;
    const repo = getRepository(Users);
    const user = await repo.findOne(id);
    if (user.role != UserType.ADMIN) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return next();
  } catch {
    return res.status(400).json({ message: "Invalid Token" });
  }
};
