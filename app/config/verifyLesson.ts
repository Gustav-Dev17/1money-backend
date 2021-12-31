import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Lessons } from "../entities/Lesson";
import { Courses } from "../entities/Course";

export const verifyLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, course_id } = req.body;
    const lessonSearch = getRepository(Lessons);
    const courseSearch = getRepository(Courses);
    if (await lessonSearch.findOne(name)) {
      return res.status(409).json({ message: "Name exists!" });
    }
    const course = await courseSearch.findOne(course_id);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Error create lesson" });
  }
};
