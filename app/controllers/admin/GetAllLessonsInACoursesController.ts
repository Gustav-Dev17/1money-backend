import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../entities/lesson";
import { Courses } from "../../entities/Course";

export const GetAllLessonsInACoursesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const repoLessons = getRepository(Lessons);
    const repoCourse = getRepository(Courses);
    const lessons = await repoLessons.find({ course_id: id });
    const course = await repoCourse.findOne({ id: id });

    return res.json({ course: course, lessons: lessons });
  } catch {
    return res.status(400).json({ message: "Error list lesson in courses" });
  }
};
