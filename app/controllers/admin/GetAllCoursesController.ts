import { getRepository } from "typeorm";
import { Courses } from "../../entities/Course";
import { Request, Response } from "express";

export const GetAllCoursesController = async (req: Request, res: Response) => {
  const repo = getRepository(Courses);
  const courses = await repo.find({ order: { created_at: "ASC" } });

  return res.json(courses);
};