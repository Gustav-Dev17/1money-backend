import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../../entities/Lesson";
import { deleteVideo } from "../../../../utils/uploadVideos";

export const DeleteLessonController = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Lessons);
    const lesson = await repo.findOne({ id: req.params.id });
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    await deleteVideo(lesson.key);
    await repo.delete(lesson);
    return res.status(200).json({ message: "Lesson deleted from the course!" });
  } catch {
    return res.status(500).json({ message: "Error" });
  }
};
