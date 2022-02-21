import { getRepository } from "typeorm";
import { Answers } from "../../../entities/Answer";
import { Request, Response } from "express";

export const CreateAnswerController = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    
    const repo = getRepository(Answers);
    
    const answer = repo.create({
      text
    });
    await repo.save(answer);
    return res.json(answer);
  } catch {
    return res.status(400).json({ message: "Error when posting answer" });
  }
};
