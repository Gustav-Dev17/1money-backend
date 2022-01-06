import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../../entities/Lesson";
import { deleteVideo, uploadVideos } from "../../../../utils/uploadVideos";

export const UpdateLessonController = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Lessons);
    const { name, sequence, duration, resourse } = req.body;
    const lesson = await repo.findOne({ id: req.params.id });
    const video = req.file;
    if (video) {
      const { buffer }: any = video;
      const file = await uploadVideos(buffer, video);
      lesson.name = name ? name : lesson.name;
      lesson.sequence = sequence ? sequence : lesson.sequence;
      lesson.duration = duration ? duration : lesson.duration;
      lesson.resource = resourse ? resourse : lesson.resource;
      await deleteVideo(lesson.key);
      lesson.video = file.Location;
      lesson.key = file.Key;
    } else {
      lesson.name = name ? name : lesson.name;
      lesson.sequence = sequence ? sequence : lesson.sequence;
      lesson.duration = duration ? duration : lesson.duration;
      lesson.resource = resourse ? resourse : lesson.resource;
      lesson.video = lesson.video;
      lesson.key = lesson.key;
    }
    await repo.save(lesson);
    return res.json(lesson);
  } catch {
    return res.status(500).json({ message: "Error" });
  }
};
