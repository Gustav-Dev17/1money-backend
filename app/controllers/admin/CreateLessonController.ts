import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../entities/lesson";

export const CreateLessonController = async (req: Request, res: Response) => {
  try {
    const { name, sequence, duration, video, resource, course_id } = req.body;
    const repo = getRepository(Lessons);
    if (await repo.findOne(name)) {
      return res.status(409).json({ message: "Name exists!" });
    }
    const course = repo.create({
      name,
      sequence,
      duration,
      video,
      resource,
      course_id,
    });

    await repo.save(course);
    return res.json(course);
  } catch {
    return res.status(400).json({ message: "Error create lesson" });
  }
};
