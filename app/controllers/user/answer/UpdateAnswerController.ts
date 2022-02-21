import { getRepository } from "typeorm";
import { Answers } from "../../../entities/Answer";
import { Request, Response } from "express";

export const UpdateAnswerController = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const repo = getRepository(Answers);
    const answer = await repo.findOne({ id: req.params.id });
    
    if (!answer) {
      return res.status(404).json({ message: "answer does not exist!" });
    }

    answer.text = text ? text : answer.text;

    await repo.save(answer);
    return res.json(answer);
  } catch {
    return res.status(500).json({ message: "Error when updating answer!" });
  }
};