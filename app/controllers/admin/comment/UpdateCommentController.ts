import { getRepository } from "typeorm";
import { Comments } from "../../../entities/Comment";
import { Request, Response } from "express";

export const UpdateCommentController = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const repo = getRepository(Comments);
    const comment = await repo.findOne({ id: req.params.id });
    
    if (!comment) {
      return res.status(404).json({ message: "Comment does not exist!" });
    }

    comment.text = text ? text : comment.text;

    await repo.save(comment);
    return res.json(comment);
  } catch {
    return res.status(500).json({ message: "Error when updating comment!" });
  }
};