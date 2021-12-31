import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../../entities/Lesson";
import { Courses } from "../../../entities/Course";

export const CreateLessonController = async (req: Request, res: Response) => {
  try {
    const { name, sequence, duration, resource, course_id } = req.body;
    const lessonSearch = getRepository(Lessons);
    const courseSearch = getRepository(Courses);
    if (!(await courseSearch.findOne(course_id))) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const { originalname: size, key, location: url } = req.file;

    const lesson = lessonSearch.create({
      name,
      sequence,
      duration,
      video: url,
      key: key,
      resource,
      course_id,
    });

    await lessonSearch.save(lesson);
    return res.json(lesson);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error create lesson" });
  }
};
