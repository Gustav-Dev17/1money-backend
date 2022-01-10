import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../../entities/Lesson";
import { Courses } from "../../../entities/Course";
import { uploadVideos } from "../../../../utils/uploadVideos";

export const CreateLessonController = async (req: Request, res: Response) => {
  try {
    const { name, sequence, duration, resource, course_id } = req.body;
    const lessonSearch = getRepository(Lessons);
    const courseSearch = getRepository(Courses);
    const video = req.file;

    if (!video) return res.status(404).json({ message: "Video not found" });
    if (!(await courseSearch.findOne(course_id)))
      return res.status(404).json({ message: "Course not found!" });
    const { buffer }: any = video;
    const file = await uploadVideos(buffer, video);

    const lesson = lessonSearch.create({
      name,
      sequence,
      duration,
      video: file.Location,
      key: file.Key,
      resource,
      course_id,
    });

    await lessonSearch.save(lesson);
    return res.json(lesson);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error when creating a lesson" });
  }
};
