import { getRepository } from "typeorm";
import { Comments } from "../../../entities/Comment";
import { Request, Response } from "express";

export const DeleteCommentController = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Comments);
    const comment = await repo.findOne({ id: req.params.id });
    if (!comment) {
      return res.status(404).json({ message: "The comment has been deleted or no longer exists!" });
    }
    await repo.delete(comment);
    return res.status(200).json({ message: "The comment has been deleted!" });
  } catch {
    return res.status(500).json({ message: "Error when deleting comment!" });
  }
};