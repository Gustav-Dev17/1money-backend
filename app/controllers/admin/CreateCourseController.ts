import { getRepository } from "typeorm";
import { Courses } from "../../entities/Course";
import { Request, Response } from "express";

export const CreateCourseController = async (req: Request, res: Response) => {
  const { name, description, duration, price, cover, prevideo } = req.body;
  const repo = getRepository(Courses);
  if (await repo.findOne({name})) {
    return res.status(409).json({ message: "Name exists!" });
  }
  const course = repo.create({
    name,
    description,
    duration,
    price,
    cover,
    prevideo,
  });

  await repo.save(course);
  return res.json(course);
};

