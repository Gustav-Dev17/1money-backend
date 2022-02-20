import { getRepository } from "typeorm";
import { Comments } from "../../../entities/Comment";
import { Request, Response } from "express";

export const UpdateCommentController = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    
    const repo = getRepository(Comments);
    
    const comment = repo.create({
      text
    });
    await repo.save(comment);
    return res.json(comment);
  } catch {
    return res.status(400).json({ message: "Error when posting comment" });
  }
};
