import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Lessons } from "../../../entities/Lesson";
import { Courses } from "../../../entities/Course";

export const GetAllLessonsInACourseController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const repoCourse = getRepository(Courses);
    const course = await repoCourse.findOne({ id: id });
    const lessons = await getRepository(Lessons).createQueryBuilder('lessons')
    .where({ course_id: id })
    .select([
      'lessons.id', 
      'lessons.name', 
      'lessons.sequence',
      'lessons.duration',
      'lessons.key', 
      'lessons.course_id',
      'lessons.created_at',
      'lessons.updated_at'
    ])
    .getMany();
    return res.json({ course: course, lessons: lessons });
  } catch {
    return res.status(400).json({ message: "Error when listing lessons in the course" });
  }
};