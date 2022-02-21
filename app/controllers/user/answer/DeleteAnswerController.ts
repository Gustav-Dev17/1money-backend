import { getRepository } from "typeorm";
import { Answers } from "../../../entities/Answer";
import { Request, Response } from "express";

export const DeleteAnswerController = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Answers);
    const answer = await repo.findOne({ id: req.params.id });
    if (!answer) {
      return res.status(404).json({ message: "The answer has been deleted or no longer exists!" });
    }
    await repo.delete(answer);
    return res.status(200).json({ message: "The answer has been deleted!" });
  } catch {
    return res.status(500).json({ message: "Error when deleting answer!" });
  }
};