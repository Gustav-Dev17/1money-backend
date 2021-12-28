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
    const repo = await getRepository(Users);
    const user = await repo.findOne({ email: decoded.email });
    console.log(user);
    next();
  } catch {
    return res.json({ message: "Invalid Token" });
  }
};

export default verifyToken;
