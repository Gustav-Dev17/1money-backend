import { verify } from "jsonwebtoken";
import { Users } from "../entities/User";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
const secret = process.env.SECRET;

interface IDecoded {
  id: string;
  email: string;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ message: "Token not found" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = (await verify(token, secret)) as IDecoded;
    const { id } = req.params;
    const repo = getRepository(Users);
    const user = await repo.findOne(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (id != decoded.id) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    return next();
  } catch {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

export default verifyToken;
